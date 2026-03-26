import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import JSONUpload from "./JSONUpload";
import ItemTable from "./ItemTable";
import SummaryBox from "./SummaryBox";
import type {
  BusinessWorkJsonInvoice,
  InvoiceFormData,
} from "../types/businessWorkTypes";
import {
  computeInvoiceTotals,
  numberToWordsINR,
} from "../utils/businessWorkCalculations";
import { generateInvoicePDF } from "../utils/PDFGenerator";
import { toast } from "@/hooks/use-toast";

const getIsoDate = () => new Date().toISOString().slice(0, 10);

const buildDefaultInvoice = (): InvoiceFormData => ({
  type: "invoice",
  invoiceNumber: "",
  invoiceDate: getIsoDate(),
  poNumber: "",
  poDate: "",
  supplyDate: "",
  placeOfSupply: "",
  billTo: {
    name: "",
    address: "",
    contactPerson: "",
    contactNumber: "",
    gstin: "",
    state: "",
  },
  shipTo: {
    name: "",
    address: "",
    contactPerson: "",
    contactNumber: "",
    gstin: "",
    state: "",
  },
  items: [
    {
      description: "",
      qty: 1,
      hsn: "",
      rate: 0,
      gstPercent: 18,
    },
  ],
  discount: 0,
  bankDetails: {
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  },
});

function validateInvoice(values: InvoiceFormData) {
  if (!values.invoiceNumber.trim()) return "Invoice number is required.";
  if (!values.invoiceDate.trim()) return "Invoice date is required.";
  if (!values.billTo.name.trim()) return "Bill To name is required.";
  if (!values.billTo.address.trim()) return "Bill To address is required.";
  if (!values.shipTo.name.trim()) return "Ship To name is required.";
  if (!values.shipTo.address.trim()) return "Ship To address is required.";

  if (values.items.length === 0) return "At least one item is required.";
  const invalidItem = values.items.some((i) => {
    const qty = Number.isFinite(i.qty) ? i.qty : 0;
    const rate = Number.isFinite(i.rate) ? i.rate : 0;
    const gstPercent = Number.isFinite(i.gstPercent) ? i.gstPercent : 0;
    return (
      !i.description.trim() ||
      !i.hsn.trim() ||
      qty <= 0 ||
      rate <= 0 ||
      gstPercent < 0
    );
  });
  if (invalidItem) return "All items must have description, HSN, Qty and Rate.";

  if (!values.bankDetails.bankName.trim())
    return "Bank details bankName is required.";
  if (!values.bankDetails.accountNumber.trim())
    return "Bank details accountNumber is required.";
  if (!values.bankDetails.ifscCode.trim())
    return "Bank details ifscCode is required.";
  return null;
}

export default function InvoiceForm() {
  const defaultValues = React.useMemo(() => buildDefaultInvoice(), []);

  const form = useForm<InvoiceFormData>({
    defaultValues,
  });

  const { control, register, watch, reset, handleSubmit, setValue } = form;
  const values = watch();
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [pendingPreviewUrl, setPendingPreviewUrl] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const manualGeneratingRef = React.useRef(false);
  const liveReqIdRef = React.useRef(0);
  const liveTimerRef = React.useRef<number | undefined>(undefined);
  const pendingPreviewUrlRef = React.useRef<string | null>(null);
  const lastGeneratedValuesRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    pendingPreviewUrlRef.current = pendingPreviewUrl;
  }, [pendingPreviewUrl]);

  const handlePendingLoad = React.useCallback(
    (e: React.SyntheticEvent<HTMLIFrameElement>) => {
      const next = (e.currentTarget as HTMLIFrameElement).src;
      if (!next) return;
      if (pendingPreviewUrlRef.current !== next) return;

      setPreviewUrl((prev) => {
        if (prev && prev !== next) {
          window.setTimeout(() => {
            try {
              URL.revokeObjectURL(prev);
            } catch {
              // ignore
            }
          }, 2000);
        }
        return next;
      });

      setPendingPreviewUrl(null);
      setIsGenerating(false);
    },
    []
  );

  // Keep discount finite.
  React.useEffect(() => {
    const num = Number(values.discount);
    if (!Number.isFinite(num)) setValue("discount", 0);
  }, [setValue, values.discount]);

  const totals = computeInvoiceTotals(values);
  const inWords = numberToWordsINR(totals.finalTotal);

  const getJsonForExport = React.useCallback((): BusinessWorkJsonInvoice => {
    return {
      type: "invoice",
      invoiceNumber: values.invoiceNumber,
      invoiceDate: values.invoiceDate,
      poNumber: values.poNumber,
      poDate: values.poDate,
      supplyDate: values.supplyDate,
      placeOfSupply: values.placeOfSupply,
      billTo: values.billTo,
      shipTo: values.shipTo,
      discount: values.discount,
      bankDetails: values.bankDetails,
      signatureName: values.signatureName,
      items: values.items.map((it) => {
        const qty = Number.isFinite(it.qty) ? it.qty : 0;
        const rate = Number.isFinite(it.rate) ? it.rate : 0;
        const amount = qty * rate;
        const gst = Number.isFinite(it.gstPercent) ? it.gstPercent : 0;
        const total = amount + (amount * gst) / 100;
        return {
          ...it,
          amount,
          total,
        };
      }),
    };
  }, [values]);

  const onImport = React.useCallback(
    (json: BusinessWorkJsonInvoice) => {
      reset({
        ...json,
        items: json.items.map((i) => ({
          description: i.description,
          qty: i.qty,
          hsn: i.hsn,
          rate: i.rate,
          gstPercent: Number.isFinite(i.gstPercent) ? Math.round(i.gstPercent * 100) / 100 : 18,
        })),
      });
    },
    [reset]
  );

  const onGeneratePdf = handleSubmit(async (v) => {
    const validationError = validateInvoice(v);
    if (validationError) {
      toast({
        title: "Fix form errors",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    try {
      manualGeneratingRef.current = true;
      setIsGenerating(true);
      const blob = await generateInvoicePDF(v);
      const docNo = v.invoiceNumber.trim() || "INV001";
      const url = URL.createObjectURL(blob);
      setPendingPreviewUrl((prev) => {
        if (prev) {
          window.setTimeout(() => {
            try {
              URL.revokeObjectURL(prev);
            } catch {
              // ignore
            }
          }, 2000);
        }
        return url;
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${docNo}.pdf`;
      a.click();
      toast({ title: "PDF generated", description: "Tax Invoice PDF is ready." });
    } catch (e) {
      toast({
        title: "PDF generation failed",
        description: e instanceof Error ? e.message : "Unknown error.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
      manualGeneratingRef.current = false;
    }
  });

  const handleReset = () => {
    setIsGenerating(false);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setPendingPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    manualGeneratingRef.current = false;
    liveReqIdRef.current += 1;
    lastGeneratedValuesRef.current = null;
    reset(defaultValues);
  };

  React.useEffect(() => {
    return () => {
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      setPendingPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      if (liveTimerRef.current) window.clearTimeout(liveTimerRef.current);
    };
  }, []);

  // Live preview: regenerate preview after user stops typing.
  React.useEffect(() => {
    if (liveTimerRef.current) window.clearTimeout(liveTimerRef.current);
    liveTimerRef.current = window.setTimeout(async () => {
      if (manualGeneratingRef.current) return;

      // Only generate preview if form has minimum required data
      const hasBasicData = values.billTo.name.trim() && values.shipTo.name.trim() && values.items.length > 0 && values.items.some(item => item.description.trim());
      if (!hasBasicData) return;

      // Check if values have actually changed
      const currentValuesKey = JSON.stringify(values);
      if (lastGeneratedValuesRef.current === currentValuesKey) return;
      lastGeneratedValuesRef.current = currentValuesKey;

      const reqId = ++liveReqIdRef.current;
      setIsGenerating(true);
      try {
        const blob = await generateInvoicePDF(values);
        if (reqId !== liveReqIdRef.current) return;
        const url = URL.createObjectURL(blob);
        setPendingPreviewUrl((prev) => {
          if (prev) {
            window.setTimeout(() => {
              try {
                URL.revokeObjectURL(prev);
              } catch {
                // ignore
              }
            }, 2000);
          }
          return url;
        });
      } catch (e) {
        // Keep last preview.
        console.warn("Live preview generation failed:", e);
      } finally {
        if (reqId === liveReqIdRef.current) setIsGenerating(false);
      }
    }, 1500); // Increased debounce time from 700ms to 1500ms to reduce blinking

    return () => {
      if (liveTimerRef.current) window.clearTimeout(liveTimerRef.current);
    };
  }, [values]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid gap-4"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="mb-4 text-sm font-semibold">Invoice Details</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                invoiceNumber
              </label>
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("invoiceNumber")}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                invoiceDate
              </label>
              <input
                type="date"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("invoiceDate")}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                poNumber
              </label>
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("poNumber")}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                poDate
              </label>
              <input
                type="date"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("poDate")}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                supplyDate
              </label>
              <input
                type="date"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("supplyDate")}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                placeOfSupply
              </label>
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("placeOfSupply")}
              />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-4 text-sm font-semibold">Bank Details</div>
          <div className="grid gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                bankName
              </label>
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("bankDetails.bankName")}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                accountNumber
              </label>
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("bankDetails.accountNumber")}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                ifscCode
              </label>
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("bankDetails.ifscCode")}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="mb-4 text-sm font-semibold">Bill To</div>
          <div className="grid gap-3">
            <input
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              placeholder="name"
              {...register("billTo.name")}
            />
            <textarea
              className="min-h-[88px] w-full rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="address"
              {...register("billTo.address")}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                placeholder="contactPerson"
                {...register("billTo.contactPerson")}
              />
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                placeholder="contactNumber"
                {...register("billTo.contactNumber")}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                placeholder="gstin"
                {...register("billTo.gstin")}
              />
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                placeholder="state"
                {...register("billTo.state")}
              />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-4 text-sm font-semibold">Ship To</div>
          <div className="grid gap-3">
            <input
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              placeholder="name"
              {...register("shipTo.name")}
            />
            <textarea
              className="min-h-[88px] w-full rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="address"
              {...register("shipTo.address")}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                placeholder="contactPerson"
                {...register("shipTo.contactPerson")}
              />
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                placeholder="contactNumber"
                {...register("shipTo.contactNumber")}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                placeholder="gstin"
                {...register("shipTo.gstin")}
              />
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                placeholder="state"
                {...register("shipTo.state")}
              />
            </div>
          </div>
        </Card>
      </div>

      <ItemTable mode="invoice" control={control} register={register} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-4">
            <div className="mb-4 text-sm font-semibold">Summary</div>
            <SummaryBox
              rows={[
                { label: "Taxable Amount", value: totals.taxableAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { label: "GST Amount", value: totals.gstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { label: "Discount", value: totals.discount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { label: "Final Total", value: totals.finalTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), highlight: true },
              ]}
            />
            <div className="mt-4 grid gap-2">
              <label className="text-xs font-medium text-muted-foreground">discount</label>
              <input
                type="number"
                step="0.01"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("discount", { valueAsNumber: true })}
              />
            </div>

            <div className="mt-4">
              <div className="text-xs font-medium text-muted-foreground">totalInWords</div>
              <div className="mt-1 rounded-md border bg-background p-3 text-sm whitespace-pre-wrap">
                {inWords}
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-4">
            <div className="mb-3 text-sm font-semibold">Actions</div>
            <div className="grid gap-3">
              <JSONUpload
                type="invoice"
                getJson={getJsonForExport}
                onImport={onImport}
              />
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleReset}>
                  Reset
                </Button>
                <Button type="button" onClick={() => void onGeneratePdf()} disabled={isGenerating}>
                  Generate PDF
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {previewUrl || pendingPreviewUrl || isGenerating ? (
        <div className="rounded-lg border bg-card p-4">
          <div className="mb-2 text-sm font-semibold text-foreground">
            PDF Preview
          </div>
          <div className="relative">
            {previewUrl ? (
              <iframe
                src={previewUrl}
                title="Tax Invoice PDF Preview"
                className="h-[520px] w-full rounded-md"
              />
            ) : pendingPreviewUrl ? (
              <iframe
                src={pendingPreviewUrl}
                title="Tax Invoice PDF Preview"
                className="h-[520px] w-full rounded-md"
                onLoad={handlePendingLoad}
              />
            ) : (
              <div className="flex items-center justify-center rounded-md border bg-background/60 p-6 text-sm text-muted-foreground">
                Generating PDF preview...
              </div>
            )}

            {previewUrl && pendingPreviewUrl ? (
              <iframe
                src={pendingPreviewUrl}
                title="Pending Tax Invoice PDF Preview"
                className="absolute inset-0 h-[520px] w-full rounded-md opacity-0"
                onLoad={handlePendingLoad}
              />
            ) : null}

            {pendingPreviewUrl ? (
              <div className="absolute inset-0 flex items-center justify-center rounded-md bg-background/70 text-sm text-muted-foreground">
                Generating PDF preview...
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </form>
  );
}

