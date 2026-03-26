import * as React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const phoneText = "+91-9970189950";
const emailText = "akash.dudhe@voltifyinnovation.in";
const addressLines = [
  "SR No. 697, Flat No. B2, 1st Floor, Preetam Prakash Residency,",
  "Bhosari Gaonthan, Bhosari,",
  "Haveli, Pune - 411039",
];

export default function CompanyContactBlock() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-start gap-3">
        <Phone className="mt-1 h-5 w-5 shrink-0" />
        <div className="text-sm">{phoneText}</div>
      </div>

      <div className="mt-3 flex items-start gap-3">
        <Mail className="mt-1 h-5 w-5 shrink-0" />
        <div className="text-sm">{emailText}</div>
      </div>

      <div className="mt-3 flex items-start gap-3">
        <MapPin className="mt-1 h-5 w-5 shrink-0" />
        <div className="text-sm leading-6">
          {addressLines.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

