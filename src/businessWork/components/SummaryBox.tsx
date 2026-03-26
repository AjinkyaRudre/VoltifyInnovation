import * as React from "react";

export interface SummaryRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface SummaryBoxProps {
  rows: SummaryRow[];
}

export default function SummaryBox({ rows }: SummaryBoxProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="grid gap-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between gap-3"
          >
            <div className="text-sm text-muted-foreground">{r.label}</div>
            <div className={r.highlight ? "font-semibold" : "text-sm"}>
              {r.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

