import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type {
  BusinessWorkJsonQuotation,
  QuotationFormData,
} from "../types/businessWorkTypes";
import JSONUpload from "./JSONUpload";
import ItemTable from "./ItemTable";
import SummaryBox from "./SummaryBox";
import { computeQuotationTotals } from "../utils/businessWorkCalculations";
import { generateQuotationPDF } from "../utils/PDFGenerator";
import { toast } from "@/hooks/use-toast";

const getIsoDate = () => new Date().toISOString().slice(0, 10);

const buildDefaultQuotation = (): QuotationFormData => ({
  type: "quotation",
  quotationNumber: "",
  date: getIsoDate(),
  validityDays: 15,
  customer: {
    customerName: "",
    companyName: "",
    address: "",
    mobile: "",
    email: "",
    gstin: "",
  },
  items: [
    {
      description: "",
      hsnCode: "",
      qty: 1,
      rate: 0,
      gstPercent: 18,
    },
  ],
  gstPercent: 18,
  terms: {
    deliveryTime: "",
    paymentTerms: "",
    notes: "",
  },
  signatureName: "Akash Dudhe",
});

function validateQuotation(values: QuotationFormData) {
  if (!values.quotationNumber.trim()) return "Quotation number is required.";
  if (!values.date.trim()) return "Quotation date is required.";
  if (!values.customer.customerName.trim()) return "Customer name is required.";
  if (!values.customer.address.trim()) return "Customer address is required.";
  if (values.items.length === 0) return "At least one item is required.";

  const invalidItem = values.items.some((i) => {
    const qty = Number.isFinite(i.qty) ? i.qty : 0;
    const rate = Number.isFinite(i.rate) ? i.rate : 0;
    const gstPercent = Number.isFinite(i.gstPercent) ? i.gstPercent : 0;
    return (
      !i.description.trim() ||
      !i.hsnCode.trim() ||
      qty <= 0 ||
      rate <= 0 ||
      gstPercent < 0
    );
  });
  if (invalidItem) return "All items must have description, HSN, Qty and Rate (> 0).";
  if (!values.terms.paymentTerms.trim()) return "Payment terms are required.";
  return null;
}

export default function QuotationForm() {
  const defaultValues = React.useMemo(() => buildDefaultQuotation(), []);

  const form = useForm<QuotationFormData>({
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

  const totals = computeQuotationTotals(values);

  const getJsonForExport = React.useCallback((): BusinessWorkJsonQuotation => {
    return {
      type: "quotation",
      quotationNumber: values.quotationNumber,
      date: values.date,
      validityDays: values.validityDays,
      customer: values.customer,
      gstPercent: values.gstPercent,
      terms: values.terms,
      signatureName: values.signatureName,
      items: values.items.map((it) => ({
        ...it,
        amount: Number.isFinite(it.qty) && Number.isFinite(it.rate) ? it.qty * it.rate : 0,
      })),
    };
  }, [values]);

  const onImport = React.useCallback(
    (json: BusinessWorkJsonQuotation) => {
      // Ignore derived "amount" fields from JSON import.
      const defaultGstPercent = json.gstPercent ?? 18;
      reset({
        ...json,
        items: json.items.map((i) => ({
          description: i.description,
          hsnCode: i.hsnCode,
          qty: i.qty,
          rate: i.rate,
          gstPercent: Number.isFinite(i.gstPercent) ? Math.round(i.gstPercent * 100) / 100 : defaultGstPercent,
        })),
      });
    },
    [reset]
  );

  const onGeneratePdf = handleSubmit(async (v) => {
    const validationError = validateQuotation(v);
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
      const blob = await generateQuotationPDF(v);
      const docNo = v.quotationNumber.trim() || "Q001";
      const url = URL.createObjectURL(blob);
      // Double-buffer: keep current preview until new iframe finishes loading.
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
      a.download = `quotation_${docNo}.pdf`;
      a.click();
      toast({ title: "PDF generated", description: "Quotation PDF is ready." });
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
      const hasBasicData = values.customer.customerName.trim() && values.items.length > 0 && values.items.some(item => item.description.trim());
      if (!hasBasicData) return;

      // Check if values have actually changed
      const currentValuesKey = JSON.stringify(values);
      if (lastGeneratedValuesRef.current === currentValuesKey) return;
      lastGeneratedValuesRef.current = currentValuesKey;

      const reqId = ++liveReqIdRef.current;
      setIsGenerating(true);
      try {
        const blob = await generateQuotationPDF(values);
        if (reqId !== liveReqIdRef.current) return;
        const url = URL.createObjectURL(blob);
        // Double-buffer: keep current preview until the new one loads.
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
        // Keep the last preview if live generation fails.
        console.warn("Live preview generation failed:", e);
      } finally {
        if (reqId === liveReqIdRef.current) setIsGenerating(false);
      }
    }, 1500); // Increased debounce time from 700ms to 1500ms to reduce blinking

    return () => {
      if (liveTimerRef.current) window.clearTimeout(liveTimerRef.current);
    };
  }, [values]);

  // Ensure gstPercent always stays a finite number.
  const prevDefaultGstRef = React.useRef<number>(defaultValues.gstPercent);
  React.useEffect(() => {
    const num = Number(values.gstPercent);
    if (!Number.isFinite(num)) setValue("gstPercent", 18);
  }, [setValue, values.gstPercent]);

  // When default GST changes, update rows that still match the previous default.
  React.useEffect(() => {
    const nextDefault = Number(values.gstPercent);
    if (!Number.isFinite(nextDefault)) return;
    const prev = prevDefaultGstRef.current;

    if (nextDefault === prev) return;

    values.items.forEach((item, idx) => {
      const itemGst = Number.isFinite(item.gstPercent) ? item.gstPercent : 0;
      if (itemGst === prev) {
        setValue(`items.${idx}.gstPercent`, nextDefault, { shouldDirty: true });
      }
    });

    prevDefaultGstRef.current = nextDefault;
  }, [setValue, values.gstPercent, values.items]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 lg:grid-cols-1">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="mb-4 text-sm font-semibold text-foreground">
            Quotation Details
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                quotationNumber
              </label>
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("quotationNumber")}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                quotationDate
              </label>
              <input
                type="date"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("date")}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                validityDays
              </label>
              <input
                type="number"
                step="1"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("validityDays", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              GST % (default 18)
            </label>
            <input
              type="number"
              step="0.01"
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              {...register("gstPercent", { valueAsNumber: true })}
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-4 text-sm font-semibold text-foreground">
            Customer Details
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                customerName
              </label>
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("customer.customerName")}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                companyName
              </label>
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("customer.companyName")}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                mobile
              </label>
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("customer.mobile")}
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                email
              </label>
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("customer.email")}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                address
              </label>
              <textarea
                className="min-h-[88px] w-full rounded-md border bg-background px-3 py-2 text-sm"
                {...register("customer.address")}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                gstin
              </label>
              <input
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                {...register("customer.gstin")}
              />
            </div>
          </div>
        </Card>
      </div>

      <ItemTable
        mode="quotation"
        control={control}
        register={register}
        defaultGstPercent={values.gstPercent}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-4">
            <div className="mb-4 text-sm font-semibold text-foreground">
              Summary
            </div>
            <SummaryBox
              rows={[
                { label: "Subtotal", value: totals.subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { label: "Total GST", value: totals.gstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
                { label: "Grand Total", value: totals.grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), highlight: true },
              ]}
            />
          </Card>
        </div>

        <div>
          <Card className="p-4">
            <div className="mb-4 text-sm font-semibold text-foreground">
              Terms
            </div>
            <div className="grid gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  deliveryTime
                </label>
                <input
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                  {...register("terms.deliveryTime")}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  paymentTerms
                </label>
                <input
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                  {...register("terms.paymentTerms")}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  notes
                </label>
                <textarea
                  className="min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm"
                  {...register("terms.notes")}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-col items-end justify-end gap-3 sm:flex-row">
        <JSONUpload
          type="quotation"
          getJson={getJsonForExport}
          onImport={onImport}
        />
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="button" onClick={() => void onGeneratePdf()} disabled={isGenerating}>
            Generate PDF
          </Button>
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
                title="Quotation PDF Preview"
                className="h-[520px] w-full rounded-md"
              />
            ) : pendingPreviewUrl ? (
              <iframe
                src={pendingPreviewUrl}
                title="Quotation PDF Preview"
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
                title="Pending Quotation PDF Preview"
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

