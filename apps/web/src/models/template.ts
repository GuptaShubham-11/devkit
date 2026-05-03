import mongoose, { model, models, Schema } from "mongoose";

import { Template as SharedTemplate } from "@repo/shared";

export interface ITemplate
  extends Omit<SharedTemplate, "_id">, mongoose.Document {
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
    repoUrl: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    codeUrl: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    folderStructure: {
      type: String,
      required: true,
    },
    withoutLogin: {
      type: Boolean,
      default: false,
    },
    isPro: {
      type: Boolean,
      default: false,
    },
    creditCost: {
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
    sponsoredBy: {
      name: {
        type: String,
      },
      url: {
        type: String,
      },
      logo: {
        type: String,
      },
    },
    isRepoTemplate: {
      type: Boolean,
      default: false,
    },
    installer: {
      name: {
        type: String,
        required: true,
      },
      dependencies: {
        type: String,
        default: "",
      },
      devDependencies: {
        type: String,
        default: "",
      },
      installCommand: {
        type: String,
        required: true,
      },
      addDependenciesCommand: {
        type: String,
        required: true,
      },
      addDevDependenciesCommand: {
        type: String,
        required: true,
      },
    },
    imageUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
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
  },
  { timestamps: true }
);

export const Template =
  models.Template || model<ITemplate>("Template", templateSchema);
