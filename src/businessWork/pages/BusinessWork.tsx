import * as React from "react";
import { NavLink, Outlet } from "react-router-dom";

const tabBase =
  "inline-flex items-center justify-center rounded-t-md border border-b-0 px-4 py-2 text-sm font-medium";

export default function BusinessWork() {
  return (
    <div className="px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Business Work</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate Quotation and Tax Invoice PDFs.
          </p>
        </div>

        <div className="flex gap-2 border-b">
          <NavLink
            to="/BusinessWork/quotation"
            className={({ isActive }) =>
              `${tabBase} ${
                isActive
                  ? "bg-background text-foreground"
                  : "bg-muted/40 text-muted-foreground"
              }`
            }
          >
            Quotation
          </NavLink>
          <NavLink
            to="/BusinessWork/invoice"
            className={({ isActive }) =>
              `${tabBase} ${
                isActive
                  ? "bg-background text-foreground"
                  : "bg-muted/40 text-muted-foreground"
              }`
            }
          >
            Tax Invoice
          </NavLink>
        </div>

        <div className="pt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

