import mongoose, { model, models, Schema } from "mongoose";

import { Payment as SharedPayment } from "@repo/shared";

export interface IPayment
  extends Document, Omit<SharedPayment, "_id" | "userId" | "paymentId"> {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  paymentId: string;
}

const paymentSchema = new Schema<IPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    checkoutSessionId: {
      type: String,
      index: true,
      sparse: true,
      unique: true,
    },
    planId: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    creditsGranted: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      index: true,
    },
    invoiceUrl: {
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

// Additional compound indexes if needed in the future
// paymentSchema.index({ userId: 1, createdAt: -1 });

export const Payment =
  models.Payment || model<IPayment>("Payment", paymentSchema);
