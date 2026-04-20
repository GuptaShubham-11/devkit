import mongoose, { model, models, Schema } from "mongoose";

import { Template as SharedTemplate } from "@repo/shared";

export interface ITemplate extends Document, Omit<SharedTemplate, "_id"> {
  _id: mongoose.Types.ObjectId;
}

const templateSchema = new Schema<ITemplate>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stack: {
      type: [String],
      required: true,
    },
    repoUrl: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    isPro: {
      type: Boolean,
      default: false,
    },
    creditCost: {
      type: Number,
      default: 0,
    },
    isRepoTemplate: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isSponsored: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    sponsoredBy: {
      type: Object,
      default: {},
    },
    videoUrl: {
      type: String,
    },
    folderStructureImage: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    copies: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    installer: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export const Template =
  models?.Template || model<ITemplate>("Template", templateSchema);
