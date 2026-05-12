export interface Payment {
  _id: string;
  userId: string;
  paymentId: string;
  checkoutSessionId?: string;
  planId: string;
  amount: number; // cents
  currency: string; // e.g., "USD"
  creditsGranted: number;
  status: string; // e.g., "succeeded", "failed"
  invoiceUrl?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
