export interface Payment {
  _id: string;
  userId: string;
  templateId?: string;

  type: string;
  planId?: string;

  startAt?: Date;
  endAt?: Date;
  renewalAt?: Date;
  renewedAt?: Date;

  paymentId: string;
  checkoutSessionId?: string;

  amount: number;
  currency: string;
  status: string;

  invoiceUrl?: string;
  metadata?: Record<string, any>;

  createdAt: Date;
  updatedAt: Date;
}
