import mongoose, { model, models, Schema } from "mongoose";

import { CreditLedger as SharedCreditLedger } from "@repo/shared";

export interface ICreditLedger
  extends Document, Omit<SharedCreditLedger, "userId"> {
  userId: mongoose.Types.ObjectId;
}

const creditLedgerSchema = new Schema<ICreditLedger>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["purchase", "usage", "refund", "admin"],
      index: true,
    },
    credits: {
      type: Number,
      required: true,
    }, // allow negative for deductions
    referenceId: {
      type: String,
      default: null,
      index: true,
    },
    description: {
      type: String,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Unique per (type, referenceId) when referenceId exists to enforce idempotency for purchases
creditLedgerSchema.index(
  { type: 1, referenceId: 1 },
  {
    unique: true,
    partialFilterExpression: { referenceId: { $type: "string" } },
  }
);

// Fast pagination
creditLedgerSchema.index({ userId: 1, createdAt: -1 });

export const CreditLedger =
  models.CreditLedger ||
  model<ICreditLedger>("CreditLedger", creditLedgerSchema);
