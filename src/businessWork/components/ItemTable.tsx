import * as React from "react";
import {
  useFieldArray,
  useWatch,
  type Control,
  type UseFormRegister,
} from "react-hook-form";

import type {
  InvoiceFormData,
  QuotationFormData,
} from "../types/businessWorkTypes";

type Mode = "quotation" | "invoice";

type QuotationItem = QuotationFormData["items"][number];
type InvoiceItem = InvoiceFormData["items"][number];
type WatchedItem = QuotationItem | InvoiceItem;

type ItemTableProps =
  | {
      mode: "quotation";
      control: Control<QuotationFormData>;
      register: UseFormRegister<QuotationFormData>;
      removeHeaderSpacing?: boolean;
      defaultGstPercent: number;
    }
  | {
      mode: "invoice";
      control: Control<InvoiceFormData>;
      register: UseFormRegister<InvoiceFormData>;
    };

const toNum = (value: unknown) => {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
};

export default function ItemTable(props: ItemTableProps) {
  const { mode } = props;
  const defaultGstPercent =
    mode === "quotation" ? props.defaultGstPercent : 18;

  const { control } = props;
  const { fields, append, remove } = useFieldArray({
    control: control as unknown as Control<QuotationFormData | InvoiceFormData>,
    name: "items",
  });

  const watchedItems = useWatch({
    control: control as unknown as Control<QuotationFormData | InvoiceFormData>,
    name: "items",
  }) as WatchedItem[];

  const handleAdd = React.useCallback(() => {
    if (mode === "quotation") {
      append({
        description: "",
        hsnCode: "",
        qty: 1,
        rate: 0,
        gstPercent: defaultGstPercent,
      } as unknown as QuotationItem);
    } else {
      append({
        description: "",
        qty: 1,
        hsn: "",
        rate: 0,
        gstPercent: 18,
      } as unknown as InvoiceItem);
    }
  }, [append, defaultGstPercent, mode]);

  const registerQuotation = props.register as unknown as UseFormRegister<QuotationFormData>;
  const registerInvoice = props.register as unknown as UseFormRegister<InvoiceFormData>;

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">
            {mode === "quotation" ? "Items" : "Items"}
          </div>
          <div className="text-xs text-muted-foreground">
            {mode === "quotation"
              ? "Add line items for the quotation."
              : "Add line items for the tax invoice."}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          Add Row
        </button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            {mode === "quotation" ? (
              <tr className="bg-muted/40 text-left text-xs text-muted-foreground">
                <th className="w-14 p-2">Sr No</th>
                <th className="p-2">Description</th>
                <th className="w-24 p-2">HSN Code</th>
                <th className="w-24 p-2">Qty</th>
                <th className="w-28 p-2">Rate</th>
                <th className="w-24 p-2">GST %</th>
                <th className="w-30 p-2">Amount</th>
                <th className="w-28 p-2" />
              </tr>
            ) : (
              <tr className="bg-muted/40 text-left text-xs text-muted-foreground">
                <th className="p-2">Description</th>
                <th className="w-20 p-2">Qty</th>
                <th className="w-24 p-2">HSN</th>
                <th className="w-20 p-2">Rate</th>
                <th className="w-20 p-2">GST %</th>
                <th className="w-28 p-2">Amount</th>
                <th className="w-28 p-2">Total</th>
                <th className="w-28 p-2" />
              </tr>
            )}
          </thead>

          <tbody>
            {fields.length === 0 ? (
              <tr>
                <td
                  colSpan={mode === "quotation" ? 8 : 8}
                  className="p-4 text-sm text-muted-foreground"
                >
                  No items yet. Add a row to start.
                </td>
              </tr>
            ) : (
              fields.map((field, index) => {
                const row = watchedItems?.[index] ?? {};
                if (mode === "quotation") {
                  const qRow = row as QuotationItem;
                  const qty = toNum(qRow.qty);
                  const rate = toNum(qRow.rate);
                  const amount = round2(qty * rate);
                  return (
                    <tr key={field.id} className="border-t">
                      <td className="p-2 text-xs text-muted-foreground">
                        {index + 1}
                      </td>
                      <td className="p-2">
                        <input
                          className="h-9 w-full rounded-md border bg-background px-3 py-2 text-sm"
                          {...registerQuotation(`items.${index}.description`)}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          className="h-9 w-full rounded-md border bg-background px-3 py-2 text-sm"
                          {...registerQuotation(`items.${index}.hsnCode`)}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          step="0.01"
                          className="h-9 w-full rounded-md border bg-background px-3 py-2 text-sm"
                          {...registerQuotation(`items.${index}.qty`, {
                            valueAsNumber: true,
                          })}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          step="0.01"
                          className="h-9 w-full min-w-[120px] rounded-md border bg-background px-3 py-2 text-sm"
                          style={{ minWidth: '120px' }}
                          {...registerQuotation(`items.${index}.rate`, {
                            valueAsNumber: true,
                          })}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          step="0.01"
                          className="h-9 w-full rounded-md border bg-background px-3 py-2 text-sm"
                          {...registerQuotation(`items.${index}.gstPercent`, {
                            valueAsNumber: true,
                          })}
                        />
                      </td>
                      <td className="p-2 text-sm font-medium">
                        {format2(amount)}
                      </td>
                      <td className="p-2">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="rounded-md border bg-background px-2 py-2 text-sm font-medium hover:bg-muted"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }

                const iRow = row as InvoiceItem;
                const qty = toNum(iRow.qty);
                const rate = toNum(iRow.rate);
                const gstPercent = toNum(iRow.gstPercent);
                const amount = round2(qty * rate);
                const rowGst = round2((amount * gstPercent) / 100);
                const total = round2(amount + rowGst);

                return (
                  <tr key={field.id} className="border-t">
                    <td className="p-2">
                      <input
                        className="h-9 w-full rounded-md border bg-background px-3 py-2 text-sm"
                        {...registerInvoice(`items.${index}.description`)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        className="h-9 w-full rounded-md border bg-background px-3 py-2 text-sm"
                        {...registerInvoice(`items.${index}.qty`, {
                          valueAsNumber: true,
                        })}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        className="h-9 w-full rounded-md border bg-background px-3 py-2 text-sm"
                        {...registerInvoice(`items.${index}.hsn`)}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        className="h-9 w-full min-w-[120px] rounded-md border bg-background px-3 py-2 text-sm"
                        style={{ minWidth: '120px' }}
                        {...registerInvoice(`items.${index}.rate`, {
                          valueAsNumber: true,
                        })}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        className="h-9 w-full rounded-md border bg-background px-3 py-2 text-sm"
                        {...registerInvoice(`items.${index}.gstPercent`, {
                          valueAsNumber: true,
                        })}
                      />
                    </td>
                    <td className="p-2 text-sm font-medium">
                      {format2(amount)}
                    </td>
                    <td className="p-2 text-sm font-medium">
                      {format2(total)}
                    </td>
                    <td className="p-2">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="rounded-md border bg-background px-2 py-2 text-sm font-medium hover:bg-muted"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
const format2 = (n: number) =>
  (Number.isFinite(n) ? n : 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

