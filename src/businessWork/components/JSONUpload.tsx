import * as React from "react";
import { toast } from "@/hooks/use-toast";

import type {
  BusinessWorkJsonInvoice,
  BusinessWorkJsonQuotation,
  BusinessWorkType,
} from "../types/businessWorkTypes";

type AnyJson = BusinessWorkJsonQuotation | BusinessWorkJsonInvoice;

export interface JSONUploadProps<T extends AnyJson> {
  type: BusinessWorkType;
  getJson: () => T;
  onImport: (data: T) => void;
}

const getDefaultFileName = (type: BusinessWorkType, docNumber?: string) => {
  const nowSuffix = String(Math.floor(Date.now() / 1000)).slice(-3);
  if (type === "quotation") {
    const safe = (docNumber || `Q${nowSuffix}`).toString().trim();
    return `quotation_${safe}.json`;
  }
  const safe = (docNumber || `INV${nowSuffix}`).toString().trim();
  return `invoice_${safe}.json`;
};

export default function JSONUpload<T extends AnyJson>({
  type,
  getJson,
  onImport,
}: JSONUploadProps<T>) {
  const fileRef = React.useRef<HTMLInputElement | null>(null);

  const handleDownload = React.useCallback(() => {
    const json = getJson();
    const docNumber =
      type === "quotation"
        ? (json as BusinessWorkJsonQuotation).quotationNumber
        : (json as BusinessWorkJsonInvoice).invoiceNumber;
    const fileName = getDefaultFileName(type, docNumber);

    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }, [getJson, type]);

  const handleUploadFile = React.useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        const parsed = JSON.parse(text) as AnyJson;

        if (parsed?.type !== type) {
          toast({
            title: "Invalid JSON",
            description: `Expected type "${type}".`,
            variant: "destructive",
          });
          return;
        }

        onImport(parsed as T);
        toast({
          title: "JSON uploaded",
          description: "Form data has been updated.",
        });
      } catch (e) {
        toast({
          title: "Upload failed",
          description: e instanceof Error ? e.message : "Unable to parse JSON.",
          variant: "destructive",
        });
      }
    },
    [onImport, type]
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleDownload}
        className="rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
      >
        Download JSON
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleUploadFile(file);
        }}
      />

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
      >
        Upload JSON
      </button>
    </div>
  );
}

