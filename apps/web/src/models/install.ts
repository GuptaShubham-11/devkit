import mongoose, { model, models, Schema } from "mongoose";

import { Install as SharedInstall } from "@repo/shared";

export interface IInstall
  extends Document, Omit<SharedInstall, "_id" | "templateId"> {
  _id: mongoose.Types.ObjectId;
  templateId: mongoose.Types.ObjectId;
}

const installSchema = new Schema<IInstall>(
  {
    userId: {
      type: String,
      required: true,
    },
    templateId: {
      type: Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    failedReason: {
      type: String,
    },
    installedAt: {
      type: Date,
      default: Date.now,
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

export const Install =
  models.Install || model<IInstall>("Install", installSchema);
