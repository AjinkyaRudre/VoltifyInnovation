export type BusinessWorkType = "quotation" | "invoice";

export interface QuotationCustomer {
  customerName: string;
  companyName: string;
  address: string;
  mobile: string;
  email: string;
  gstin: string;
}

export interface QuotationTerms {
  deliveryTime: string;
  paymentTerms: string;
  notes: string;
}

export interface QuotationItemInput {
  description: string;
  hsnCode: string;
  qty: number;
  rate: number;
  // GST percent can vary per item (default is 18%).
  gstPercent: number;
}

export interface QuotationFormData {
  type: "quotation";
  quotationNumber: string;
  date: string; // keeps JSON key name "date"
  validityDays: number;
  customer: QuotationCustomer;
  items: QuotationItemInput[];
  gstPercent: number;
  terms: QuotationTerms;
  signatureName?: string;
}

export interface InvoiceParty {
  name: string;
  address: string;
  contactPerson: string;
  contactNumber: string;
  gstin: string;
  state: string;
}

export interface InvoiceItemInput {
  description: string;
  qty: number;
  hsn: string;
  rate: number;
  gstPercent: number;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface InvoiceFormData {
  type: "invoice";
  invoiceNumber: string;
  invoiceDate: string;
  poNumber: string;
  poDate: string;
  supplyDate: string;
  placeOfSupply: string;
  billTo: InvoiceParty;
  shipTo: InvoiceParty;
  items: InvoiceItemInput[];
  discount: number;
  bankDetails: BankDetails;
  signatureName?: string;
}

export type BusinessWorkJsonQuotation = Omit<
  QuotationFormData,
  "items"
> & {
  items: Array<
    QuotationItemInput & {
      amount: number;
    }
  >;
};

export type BusinessWorkJsonInvoice = Omit<InvoiceFormData, "items"> & {
  items: Array<
    InvoiceItemInput & {
      amount: number; // taxable row amount (qty * rate)
      total: number; // amount + row GST
    }
  >;
};

