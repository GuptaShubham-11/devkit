import mongoose, { model, models, Schema } from "mongoose";

import {
  Installer as IInstaller,
  SponsoredBy as ISponsoredBy,
  Template as SharedTemplate,
} from "@repo/shared";

export interface ITemplate
  extends
    Omit<SharedTemplate, "_id" | "sponsoredBy" | "installer">,
    mongoose.Document {
  _id: mongoose.Types.ObjectId;
  sponsoredBy?: ISponsoredBy[];
  installer: IInstaller;
}

const sponsoredBySchema = new Schema<ISponsoredBy>(
  {
    name: { type: String },
    url: { type: String },
    logo: { type: String },
  },
  { _id: false }
);

const installerSchema = new Schema<IInstaller>(
  {
    name: { type: String, required: true },
    dependencies: { type: String, required: true },
    devDependencies: { type: String, required: true },
    installCommand: { type: String, required: true },
    addDependenciesCommand: { type: String, required: true },
    addDevDependenciesCommand: { type: String, required: true },
  },
  { _id: false }
);

const templateSchema = new Schema<ITemplate>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    stack: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    githubRepoUrl: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    liveUrl: {
      type: String,
    },
    folderStructure: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    cost: {
      type: Number,
      default: 0,
    },
    isPublished: {
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
    sponsoredBy: [sponsoredBySchema],
    isRepoTemplate: {
      type: Boolean,
      default: false,
    },
    installer: installerSchema,
    imageUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Template =
  models.Template || model<ITemplate>("Template", templateSchema);
