import mongoose, { model, models, Schema } from "mongoose";

import { Payment as SharedPayment } from "@repo/shared";

export interface IPayment
  extends Document, Omit<SharedPayment, "_id" | "userId" | "templateId"> {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  templateId?: mongoose.Types.ObjectId;
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
    type: {
      type: String,
      required: true,
    },
    templateId: {
      type: Schema.Types.ObjectId,
      ref: "Template",
    },
    startAt: {
      type: Date,
    },
    endAt: {
      type: Date,
    },
    renewalAt: {
      type: Date,
    },
    renewedAt: {
      type: Date,
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
    status: {
      type: String,
      required: true,
    },
    invoiceUrl: {
      type: String,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ userId: 1, status: 1 });
paymentSchema.index({ paymentId: 1, status: 1 });

export const Payment =
  models.Payment || model<IPayment>("Payment", paymentSchema);
