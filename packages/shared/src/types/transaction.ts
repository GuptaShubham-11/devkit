export interface Transaction {
  _id: string;
  userId: string;

  amount: number;
  type: "debit" | "credit";
  reason: string;

  templateId: string;
  paymentId: string;
  createdAt: Date;
}
