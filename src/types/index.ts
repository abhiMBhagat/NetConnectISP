
export type User = {
  email?: string;
  role?: "customer" | "staff";
  _id?: string; // Make _id optional
};

export type Invoice = {
  customerName?: string;
  customerEmail?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  amount?: string;
  tax?: string;
  discount?: string;
  description?: string;
  notes?: string;
  status?: string;
  serviceType?: string;
  billingPeriod?: string;
  _id?: string; // Make _id optional
};
