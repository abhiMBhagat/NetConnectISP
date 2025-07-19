
export type User = {
  email: string;
  role: "customer" | "staff";
};

export type Invoice = {
  _id?: string;
  customerName: string;
  customerEmail: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: string;
  tax: string;
  discount: string;
  description: string;
  notes: string;
  status: string;
  serviceType: string;
  billingPeriod: string;
};
