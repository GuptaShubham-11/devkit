import mongoose, { Document, model, models, Schema } from "mongoose";

import { Install as SharedInstall } from "@repo/shared";

export interface IInstall
  extends Document, Omit<SharedInstall, "_id" | "userId" | "templateId"> {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  templateId: mongoose.Types.ObjectId;
}

const installSchema = new Schema<IInstall>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    templateId: {
      type: Schema.Types.ObjectId,
      ref: "Template",
      required: true,
      index: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    failedReason: {
      type: String,
    },
    ipAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

installSchema.index({ templateId: 1, status: 1, createdAt: -1 });
installSchema.index({ ipAddress: 1, createdAt: -1 });

export const Install =
  models?.Install || model<IInstall>("Install", installSchema);
