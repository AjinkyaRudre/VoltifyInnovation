import type {
  InvoiceFormData,
  InvoiceItemInput,
  QuotationFormData,
} from "../types/businessWorkTypes";

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export const formatINR = (value: number) => {
  const num = Number.isFinite(value) ? value : 0;
  return num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const computeQuotationTotals = (data: QuotationFormData) => {
  const subtotal = round2(
    data.items.reduce((sum, item) => {
      const qty = Number.isFinite(item.qty) ? item.qty : 0;
      const rate = Number.isFinite(item.rate) ? item.rate : 0;
      return sum + round2(qty * rate);
    }, 0)
  );

  const gstAmount = round2(
    data.items.reduce((sum, item) => {
      const qty = Number.isFinite(item.qty) ? item.qty : 0;
      const rate = Number.isFinite(item.rate) ? item.rate : 0;
      const gstPercent = Number.isFinite(item.gstPercent)
        ? item.gstPercent
        : Number.isFinite(data.gstPercent)
          ? data.gstPercent
          : 0;
      const amount = qty * rate;
      return sum + round2(amount * gstPercent / 100);
    }, 0)
  );

  const grandTotal = round2(subtotal + gstAmount);
  return { subtotal, gstAmount, grandTotal };
};

export const computeInvoiceRow = (item: InvoiceItemInput) => {
  const qty = Number.isFinite(item.qty) ? item.qty : 0;
  const rate = Number.isFinite(item.rate) ? item.rate : 0;
  const gstPercent = Number.isFinite(item.gstPercent) ? item.gstPercent : 0;
  const amount = round2(qty * rate);
  const rowGst = round2(amount * gstPercent / 100);
  const total = round2(amount + rowGst);
  return { amount, rowGst, total };
};

export const computeInvoiceTotals = (data: InvoiceFormData) => {
  const taxableAmount = round2(
    data.items.reduce((sum, item) => sum + computeInvoiceRow(item).amount, 0)
  );
  const gstAmount = round2(
    data.items.reduce((sum, item) => sum + computeInvoiceRow(item).rowGst, 0)
  );
  const discount = round2(Number.isFinite(data.discount) ? data.discount : 0);
  const finalTotal = round2(taxableAmount + gstAmount - discount);
  return { taxableAmount, gstAmount, discount, finalTotal };
};

// Indian number-to-words (Rupees Only / and Paise).
const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];
const teens = [
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

const wordsUnder100 = (n: number) => {
  if (n < 10) return ones[n];
  if (n >= 10 && n < 20) return teens[n - 10];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return o === 0 ? tens[t] : `${tens[t]} ${ones[o]}`;
};

const wordsUnder1000 = (n: number) => {
  if (n < 100) return wordsUnder100(n);
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const hPart = h === 0 ? "" : `${ones[h]} Hundred`;
  return rest === 0 ? hPart : `${hPart} ${wordsUnder100(rest)}`.trim();
};

export const numberToWordsINR = (value: number) => {
  const safe = Number.isFinite(value) ? value : 0;
  const rupees = Math.floor(safe);
  const paise = Math.round((safe - rupees) * 100);

  const crore = Math.floor(rupees / 10000000);
  const lakh = Math.floor((rupees % 10000000) / 100000);
  const thousand = Math.floor((rupees % 100000) / 1000);
  const hundreds = rupees % 1000;

  const parts: string[] = [];
  if (crore) parts.push(`${wordsUnder1000(crore)} Crore`);
  if (lakh) parts.push(`${wordsUnder1000(lakh)} Lakh`);
  if (thousand) parts.push(`${wordsUnder1000(thousand)} Thousand`);
  if (hundreds) parts.push(wordsUnder1000(hundreds));

  const rupeeWords = parts.length ? parts.join(" ") : "Zero";
  if (paise <= 0) return `${rupeeWords} Rupees Only`;
  const paiseWords = wordsUnder100(paise);
  return `${rupeeWords} Rupees and ${paiseWords} Paise Only`;
};

