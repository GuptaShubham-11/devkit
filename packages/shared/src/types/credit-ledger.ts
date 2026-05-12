export type CreditLedgerType = "purchase" | "usage" | "refund" | "admin";

export interface CreditLedger {
  _id: string;
  userId: string;
  type: CreditLedgerType;
  // Signed delta in credits. Positive increases balance, negative decreases.
  credits: number;
  // External reference for idempotency (e.g., Dodo payment id)
  referenceId?: string | null;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
