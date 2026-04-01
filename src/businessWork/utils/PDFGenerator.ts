import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

import letterheadPdfUrl from "../assets/letterhead01.pdf?url";
import letterhead02PdfUrl from "../assets/Letterhead02.pdf?url";
import contactIconUrl from "../assets/contact.svg?url";
import mailIconUrl from "../assets/mail.svg?url";
import addressIconUrl from "../assets/address.svg?url";

import type {
  InvoiceFormData,
  QuotationFormData,
} from "../types/businessWorkTypes";
import {
  computeInvoiceTotals,
  computeQuotationTotals,
  numberToWordsINR,
  formatINR,
} from "./businessWorkCalculations";

const PX_TO_MM = 0.264583; // 96dpi -> mm

// pdfjs needs a worker script URL in many bundlers (including Vite).
// This avoids: "NO globalworkeroptions.workerSrc specified".
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

const cachedLetterheadPngDataUrls: { [key: string]: string } = {};

type JsPDFWithAutoTable = jsPDF & {
  lastAutoTable?: {
    finalY?: number;
  };
};

const svgToPngCache = new Map<string, string>();

async function svgUrlToPngDataUrl(svgUrl: string, sizePx = 96): Promise<string> {
  const cached = svgToPngCache.get(svgUrl);
  if (cached) return cached;

  const res = await fetch(svgUrl);
  const svgText = await res.text();
  const blob = new Blob([svgText], { type: "image/svg+xml" });
  const blobUrl = URL.createObjectURL(blob);

  const img = new Image();
  img.decoding = "async";

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () =>
      reject(new Error("Unable to load SVG for rasterization."));
    img.src = blobUrl;
  });

  const canvas = document.createElement("canvas");
  canvas.width = sizePx;
  canvas.height = sizePx;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable.");

  // Draw the SVG to the canvas (scales to fit).
  ctx.clearRect(0, 0, sizePx, sizePx);
  ctx.drawImage(img, 0, 0, sizePx, sizePx);

  URL.revokeObjectURL(blobUrl);
  const pngDataUrl = canvas.toDataURL("image/png");
  svgToPngCache.set(svgUrl, pngDataUrl);
  return pngDataUrl;
}

async function renderLetterheadToPng(letterheadUrl: string): Promise<string> {
  const cacheKey = letterheadUrl;
  if (cachedLetterheadPngDataUrls[cacheKey]) return cachedLetterheadPngDataUrls[cacheKey];

  // Rasterize the first page so we can place it as a background image in jsPDF.
  const loadingTask = pdfjsLib.getDocument({
    url: letterheadUrl,
  });
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);

  // Scale impacts sharpness of the background.
  const scale = 2.2;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas context unavailable.");

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const renderParams = {
    canvasContext: context,
    canvas,
    viewport,
  } as unknown as Parameters<typeof page.render>[0];
  await page.render(renderParams).promise;
  cachedLetterheadPngDataUrls[cacheKey] = canvas.toDataURL("image/png");
  return cachedLetterheadPngDataUrls[cacheKey];
}

type PdfMeta = {
  left: number;
  right: number;
  top: number;
  usableWidth: number;
};

function getPdfMeta(doc: jsPDF): PdfMeta {
  const pageWidth = doc.internal.pageSize.getWidth();

  const left = 20 * PX_TO_MM;
  const right = 20 * PX_TO_MM;
  // Top padding to keep text safely BELOW the letterhead header/logo.
  // Requirement: top margin must be >= 60px. Using a larger value (100px)
  // to prevent overlap with the embedded logo design.
  const top = 260 * PX_TO_MM;
  const usableWidth = pageWidth - left - right;

  return { left, right, top, usableWidth };
}

function addBackgroundToDoc(doc: jsPDF, letterheadPngDataUrl: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.addImage(letterheadPngDataUrl, "PNG", 0, 0, pageWidth, pageHeight);
}

function setBold(doc: jsPDF, enabled: boolean) {
  doc.setFont("helvetica", enabled ? "bold" : "normal");
}

function safeSplitLines(doc: jsPDF, text: string, widthMm: number) {
  const t = (text || "").toString();
  if (!t.trim()) return [""];
  return doc.splitTextToSize(t, widthMm);
}

function formatMoneyPlain(value: number) {
  const safe = Number.isFinite(value) ? value : 0;
  const fixed2 = safe.toFixed(2);
  return fixed2.endsWith(".00") ? fixed2.slice(0, -3) : fixed2;
}

export async function generateQuotationPDF(
  data: QuotationFormData
): Promise<Blob> {
  const [letterhead01PngDataUrl, letterhead02PngDataUrl] = await Promise.all([
    renderLetterheadToPng(letterheadPdfUrl),
    renderLetterheadToPng(letterhead02PdfUrl),
  ]);
  const [contactIconPng, mailIconPng, addressIconPng] = await Promise.all([
    svgUrlToPngDataUrl(contactIconUrl),
    svgUrlToPngDataUrl(mailIconUrl),
    svgUrlToPngDataUrl(addressIconUrl),
  ]);

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const { left, right, top, usableWidth } = getPdfMeta(doc);

  addBackgroundToDoc(doc, letterhead01PngDataUrl);

  // Keep background on additional pages created by autoTable.
  doc.internal.events.subscribe("addPage", () => {
    const currentPage = doc.getNumberOfPages();
    const letterheadToUse = currentPage === 1 ? letterhead01PngDataUrl : letterhead02PngDataUrl;
    addBackgroundToDoc(doc, letterheadToUse);
  });

  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const rightX = pageWidth - right;

  const titleY = top + 2;

  // Quotation heading centered, date on the right.
  doc.setFontSize(12);
  setBold(doc, true);
  doc.text("Quotation", pageWidth / 2, titleY, { align: "center" });
  setBold(doc, false);
  doc.setFontSize(10);
  doc.text(`Date: ${data.date}`, rightX, titleY + 6, { align: "right" });

  let y = titleY + 14;
  doc.setFontSize(10);
  doc.text("To,", left, y);
  y += 5;
  doc.text(data.customer.customerName || "-", left, y);
  y += 5;
  doc.text(data.customer.companyName || "-", left, y);
  y += 7;

  // Narrative lines (keeps spacing similar to your sample PDF)
  const defaultNarrative = "Thank you for your inquiry regarding electrical materials. Please find our most competitive quotation attached. We have ensured the best pricing while maintaining high quality and service standards.";
  const narrativeText = data.narrative || defaultNarrative;
  const narrative = narrativeText.split('\n').filter(line => line.trim());
  const narrativeLines = narrative.flatMap((line) =>
    safeSplitLines(doc, line, usableWidth * 0.82)
  );
  const lineHeight = 4.2;
  doc.text(narrativeLines, left, y, { align: "left" });
  y = y + narrativeLines.length * lineHeight + 3;

  // Items table (centered)
  const tableStartY = y + 2;
  const body = data.items.map((item, idx) => {
    const qty = Number.isFinite(item.qty) ? item.qty : 0;
    const rate = Number.isFinite(item.rate) ? item.rate : 0;
    const amount = qty * rate;
    return [
      String(idx + 1),
      item.description,
      item.hsnCode,
      String(qty),
      formatMoneyPlain(rate),
      formatMoneyPlain(amount),
    ];
  });

  doc.setFontSize(8.8);
  let firstPageEndY = 0;
  let tableLastPage = 1;

  autoTable(doc, {
    startY: tableStartY,
    head: [[
      "Sr.No",
      "Description",
      "HSN Code",
      "Qty",
      "Rate",
      "Total",
    ]],
    body,
    theme: "grid",
    styles: {
      fontSize: 8.2,
      cellPadding: 1.2,
      valign: "middle",
    },
    headStyles: {
      fillColor: [245, 245, 245],
      textColor: 0,
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 12 },
      1: { halign: "left" },
      2: { halign: "center", cellWidth: 22 },
      3: { halign: "center", cellWidth: 18 },
      4: { halign: "right", cellWidth: 22 },
      5: { halign: "right", cellWidth: 22 },
    },
    margin: { left, right, top: 10 },
    tableWidth: usableWidth,
    pageBreak: "auto",
    didDrawPage: (data) => {
      tableLastPage = data.pageNumber;
      if (data.pageNumber === 1) {
        firstPageEndY = data.cursor.y;
      }
    },
  });

  const lastAutoFinalY =
    (doc as JsPDFWithAutoTable).lastAutoTable?.finalY ?? tableStartY;
  const lastPage = doc.getNumberOfPages();

  // Calculate required space for totals and terms.
  const requiredSpaceForTotals = 18; // 3 rows + a small buffer
  const requiredSpaceForSummary = 70; // totals + terms + bottom margin
  const firstPageAvailable = pageHeight - firstPageEndY - 20;

  let summaryPage = lastPage;
  let summaryStartY = lastAutoFinalY + 4;

  // Prefer first page for the totals block when there is room.
  if (firstPageAvailable >= requiredSpaceForTotals) {
    summaryPage = 1;
    summaryStartY = firstPageEndY + 4;
    doc.setPage(1);
  } else {
    const availableSpace = pageHeight - lastAutoFinalY - 20; // 20 for bottom margin
    if (availableSpace < requiredSpaceForSummary) {
      doc.addPage();
      summaryPage = doc.getNumberOfPages();
      doc.setPage(summaryPage);
      const letterheadToUse = summaryPage === 1 ? letterhead01PngDataUrl : letterhead02PngDataUrl;
      addBackgroundToDoc(doc, letterheadToUse);
      summaryStartY = 18; // small margin for additional pages (no huge original letterhead top padding)
    } else {
      doc.setPage(lastPage);
    }
  }

  const summaryY = summaryStartY;
  const totals = computeQuotationTotals(data);
  doc.setFontSize(10);
  setBold(doc, true);
  doc.text(`Subtotal: ${formatINR(totals.subtotal)} Rs`, left, summaryY);
  doc.text(`GST Total: ${formatINR(totals.gstAmount)} Rs`, left, summaryY + 6);
  doc.text(`Grand Total: ${formatINR(totals.grandTotal)} Rs`, left, summaryY + 12);
  setBold(doc, false);

  // Company contact details (bottom block) - matching your screenshot.
  const phoneText = "+91-9970189950";
  const emailText = "akash.dudhe@voltifyinnovation.in";
  const addressLines = [
    "SR No. 697, Flat No. B2, 1st Floor, Preetam Prakash Residency,",
    "Bhosari Gaonthan, Bhosari, Haveli, Pune – 411039",
  ];

  // Spacing inside the contact block should be split:
  // - groupGap: extra vertical space between phone -> mail -> address sections
  // - addressLineHeight: spacing between address lines only
  const groupGap = 6.0;
  const addressLineHeight = 4.2;

  const contactBlockHeight =
    6 + // padding
    2 * groupGap +
    (addressLines.length - 1) * addressLineHeight;
  const contactTopY = pageHeight - contactBlockHeight - 6;

  // Terms & Conditions - prefer same page as totals, but move to next page if no room
  let termsPage = summaryPage;
  let termsStartY = summaryY + 18;

  const termsLines = [
    `1. Delivery within ${data.terms.deliveryTime} Day`,
    `2. Payment Terms: ${data.terms.paymentTerms}`,
    `3. Quotation valid for ${data.validityDays} days.`,
    `4. GST Apply ${data.gstPercent} %`,
  ];
  const termsLineCount = termsLines.reduce((count, ln) => count + safeSplitLines(doc, ln, usableWidth * 0.75).length, 0);
  const termsHeight = 6 + termsLineCount * 4.2;

  if (termsPage === 1 && termsStartY + termsHeight > pageHeight - 20) {
    doc.addPage();
    termsPage = doc.getNumberOfPages();
    const letterheadToUse = termsPage === 1 ? letterhead01PngDataUrl : letterhead02PngDataUrl;
    addBackgroundToDoc(doc, letterheadToUse);
    termsStartY = top + 2;
  }

  doc.setPage(termsPage);
  doc.setFontSize(9.6);
  doc.text("Terms & Conditions:", left, termsStartY);

  let termsY = termsStartY + 6;
  termsLines.forEach((ln) => {
    const lnLines = safeSplitLines(doc, ln, usableWidth * 0.75);
    doc.text(lnLines, left, termsY);
    termsY += lnLines.length * 4.2;
  });

  // Thanks & Regards (right side) below terms
  const thanksY = termsY + 4;
  doc.setFontSize(10);
  setBold(doc, false);
  doc.text("Thanks & Regards", rightX, thanksY, { align: "right" });
  doc.text("Akash Dudhe", rightX, thanksY + 6, { align: "right" });

  // Company contact details at the bottom - always on the last page
  const finalPage = doc.getNumberOfPages();
  doc.setPage(finalPage);
  const iconSizeMm = 4.6;
  const iconX = left + 0.9;
  const textX = left + 6.4;

  const phoneTextY = contactTopY + 3;
  const emailTextY = phoneTextY + groupGap;
  const addressTextY = emailTextY + groupGap;

  const iconTopPhoneY = phoneTextY - iconSizeMm / 2;
  const iconTopEmailY = emailTextY - iconSizeMm / 2;
  const iconTopAddressY = addressTextY - iconSizeMm / 2;

  doc.addImage(contactIconPng, "PNG", iconX, iconTopPhoneY, iconSizeMm, iconSizeMm);
  doc.addImage(mailIconPng, "PNG", iconX, iconTopEmailY, iconSizeMm, iconSizeMm);
  doc.addImage(addressIconPng, "PNG", iconX, iconTopAddressY, iconSizeMm, iconSizeMm);

  doc.setFontSize(9.2);
  doc.setTextColor(0, 0, 0);
  doc.text(phoneText, textX, phoneTextY);
  doc.text(emailText, textX, emailTextY);

  addressLines.forEach((line, idx) => {
    doc.text(line, textX, addressTextY + idx * addressLineHeight);
  });

  return doc.output("blob");
}

export async function generateInvoicePDF(
  data: InvoiceFormData
): Promise<Blob> {
  const [letterhead01PngDataUrl, letterhead02PngDataUrl] = await Promise.all([
    renderLetterheadToPng(letterheadPdfUrl),
    renderLetterheadToPng(letterhead02PdfUrl),
  ]);

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const { left, right, top, usableWidth } = getPdfMeta(doc);

  addBackgroundToDoc(doc, letterhead01PngDataUrl);
  doc.internal.events.subscribe("addPage", () => {
    const currentPage = doc.getNumberOfPages();
    const letterheadToUse = currentPage === 1 ? letterhead01PngDataUrl : letterhead02PngDataUrl;
    addBackgroundToDoc(doc, letterheadToUse);
  });

  const pageHeight = doc.internal.pageSize.getHeight();

  const titleY = top + 2;
  doc.setFontSize(16);
  setBold(doc, true);
  doc.text("TAX INVOICE", doc.internal.pageSize.getWidth() / 2, titleY, {
    align: "center",
  });
  setBold(doc, false);

  const rightX = doc.internal.pageSize.getWidth() - right;

  let y = titleY + 7;
  doc.setFontSize(9.5);

  // Invoice details right side
  const invoiceDetailsLines = [
    `Invoice No: ${data.invoiceNumber}`,
    `Invoice Date: ${data.invoiceDate}`,
    `PO No: ${data.poNumber}`,
    `PO Date: ${data.poDate}`,
    `Supply Date: ${data.supplyDate}`,
    `Place of Supply: ${data.placeOfSupply}`,
  ];
  doc.text(invoiceDetailsLines, rightX, y, { align: "right" });

  // Bill To / Ship To columns
  const colGap = 4;
  const colWidth = (usableWidth - colGap) / 2;
  const billX = left;
  const shipX = left + colWidth + colGap;

  const billHeaderY = y + 2;
  doc.setFontSize(9.5);
  setBold(doc, true);
  doc.text("Bill To", billX, billHeaderY);
  setBold(doc, false);
  const billLines: string[] = [
    data.billTo.name,
    data.billTo.address,
    `Contact: ${data.billTo.contactPerson} (${data.billTo.contactNumber})`,
    `GSTIN: ${data.billTo.gstin}`,
    `State: ${data.billTo.state}`,
  ];
  const billTextLines = billLines.flatMap((ln) =>
    safeSplitLines(doc, ln, colWidth)
  );
  doc.text(billTextLines, billX, billHeaderY + 4);

  const shipHeaderY = y + 2;
  setBold(doc, true);
  doc.text("Ship To", shipX, shipHeaderY);
  setBold(doc, false);
  const shipLines: string[] = [
    data.shipTo.name,
    data.shipTo.address,
    `Contact: ${data.shipTo.contactPerson} (${data.shipTo.contactNumber})`,
    `GSTIN: ${data.shipTo.gstin}`,
    `State: ${data.shipTo.state}`,
  ];
  const shipTextLines = shipLines.flatMap((ln) =>
    safeSplitLines(doc, ln, colWidth)
  );
  doc.text(shipTextLines, shipX, shipHeaderY + 4);
  const afterPartiesY = Math.max(
    billHeaderY + 4 + billTextLines.length * 4.2,
    shipHeaderY + 4 + shipTextLines.length * 4.2
  );
  y = afterPartiesY + 8;

  // Items table
  const body = data.items.map((item) => {
    const qty = Number.isFinite(item.qty) ? item.qty : 0;
    const rate = Number.isFinite(item.rate) ? item.rate : 0;
    const gstPercent = Number.isFinite(item.gstPercent) ? item.gstPercent : 0;
    const amount = qty * rate;
    const total = amount + (amount * gstPercent) / 100;
    return [
      item.description,
      String(qty),
      item.hsn,
      formatINR(rate),
      String(gstPercent),
      formatINR(amount),
      formatINR(total),
    ];
  });

  let firstPageEndY = 0;
  let tableLastPage = 1;

  doc.setFontSize(8.5);
  autoTable(doc, {
    startY: y,
    head: [[
      "Description",
      "Qty",
      "HSN",
      "Rate",
      "GST %",
      "Amount",
      "Total",
    ]],
    body,
    theme: "grid",
    styles: {
      fontSize: 8.2,
      cellPadding: 1.2,
      valign: "middle",
    },
    headStyles: {
      fillColor: [245, 245, 245],
      textColor: 0,
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "center", cellWidth: 18 },
      2: { halign: "center", cellWidth: 22 },
      3: { halign: "right", cellWidth: 22 },
      4: { halign: "center", cellWidth: 18 },
      5: { halign: "right" },
      6: { halign: "right" },
    },
    margin: { left, right, top: 10 },
    tableWidth: usableWidth,
    pageBreak: "auto",
    didDrawPage: (data) => {
      tableLastPage = data.pageNumber;
      if (data.pageNumber === 1) {
        firstPageEndY = data.cursor.y;
      }
    },
  });

  // We can’t access first page final Y from lastAutoFinalY when table spills to page 2.
  // Best effort: use didDrawPage in autotable to track first page cursor.
  // (Add this callback to the autoTable config above by editing it in your code if needed.)

  const lastAutoFinalY =
    (doc as JsPDFWithAutoTable).lastAutoTable?.finalY ?? y;
  const lastPage = doc.getNumberOfPages();

  // Calculate required space for totals and terms.
  const requiredSpaceForTotals = 18;
  const requiredSpaceForSummary = 70;
  const firstPageAvailable = pageHeight - firstPageEndY - 20;
  const availableSpace = pageHeight - lastAutoFinalY - 20; // 20 for bottom margin

  let summaryPage = lastPage;
  let summaryStartY = lastAutoFinalY + 6;

  if (firstPageAvailable >= requiredSpaceForTotals) {
    summaryPage = 1;
    summaryStartY = firstPageEndY + 4;
    doc.setPage(1);
  } else if (availableSpace < requiredSpaceForSummary) {
    doc.addPage();
    summaryPage = doc.getNumberOfPages();
    doc.setPage(summaryPage);
    const letterheadToUse = summaryPage === 1 ? letterhead01PngDataUrl : letterhead02PngDataUrl;
    addBackgroundToDoc(doc, letterheadToUse);
    summaryStartY = 18; // small margin for additional pages
  } else {
    doc.setPage(lastPage);
  }

  const totals = computeInvoiceTotals(data);
  const summaryY = summaryStartY;
  doc.setFontSize(10);
  setBold(doc, false);
  doc.text(`Taxable Amount: ${formatINR(totals.taxableAmount)} Rs`, rightX, summaryY, {
    align: "right",
  });
  doc.text(`GST Amount: ${formatINR(totals.gstAmount)} Rs`, rightX, summaryY + 5, {
    align: "right",
  });
  doc.text(`Discount: ${formatINR(totals.discount)} Rs`, rightX, summaryY + 10, {
    align: "right",
  });
  setBold(doc, true);
  doc.text(`Final Total: ${formatINR(totals.finalTotal)} Rs`, rightX, summaryY + 15, {
    align: "right",
  });
  setBold(doc, false);

  const wordsY = summaryY + 20;
  doc.setFontSize(9);
  const inWords = numberToWordsINR(totals.finalTotal);
  const wordsLines = safeSplitLines(doc, `Total in words: ${inWords}`, usableWidth);
  doc.text(wordsLines, left, wordsY);

  // Bank details and signature - always on the final page
  const finalPage = doc.getNumberOfPages();
  doc.setPage(finalPage);
  const bankStartY = pageHeight - 45;
  doc.setFontSize(9);
  doc.text(`Bank Name: ${data.bankDetails.bankName}`, left, bankStartY);
  doc.text(`Account No: ${data.bankDetails.accountNumber}`, left, bankStartY + 5);
  doc.text(`IFSC: ${data.bankDetails.ifscCode}`, left, bankStartY + 10);

  // Signature bottom-right
  const signatureY = pageHeight - 15;
  const sigRight = rightX;
  const lineX1 = sigRight - 55;
  const lineX2 = sigRight;
  doc.setDrawColor(0);
  doc.setLineWidth(0.2);
  doc.line(lineX1, signatureY - 3, lineX2, signatureY - 3);
  const signer = data.signatureName?.trim() ? data.signatureName : "Authorized Signatory";
  doc.setFontSize(9);
  doc.text(signer, sigRight, signatureY, { align: "right" });

  return doc.output("blob");
}

