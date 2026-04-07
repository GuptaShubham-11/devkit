import mongoose, { model, models, Schema } from "mongoose";

import { Transaction as SharedTransaction } from "@repo/shared";

export interface ITransaction
  extends
    Document,
    Omit<SharedTransaction, "_id" | "templateId" | "userId" | "paymentId"> {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  templateId: mongoose.Types.ObjectId;
  paymentId: mongoose.Types.ObjectId;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    templateId: {
      type: Schema.Types.ObjectId,
      ref: "Template",
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction =
  models.Transaction ||
  model<ITransaction>("Transaction", transactionSchema, "transactions");
