import bcrypt from "bcryptjs";
import mongoose, { model, models, Schema } from "mongoose";

import { User as SharedUser } from "@repo/shared";

import { serverEnv } from "@/lib/server-env";

export interface IUser extends Document, Omit<SharedUser, "_id"> {
  _id: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    isRole: {
      type: String,
      default: "user",
    },
    profileImage: {
      type: String,
    },

    currentPlan: {
      type: String,
      default: "free",
    },
    creditBalance: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    oAuth: {
      type: Schema.Types.Mixed,
      default: null,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    shortLivedToken: {
      type: String,
    },
    shortLivedTokenExpiry: {
      type: Date,
    },
    emailVerifiedAt: {
      type: Date,
    },
    lastLoginAt: {
      type: Date,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockedUntil: {
      type: Date,
    },
    bio: {
      type: String,
    },
    website: {
      type: String,
    },
    githubUsername: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, serverEnv.SALT_ROUNDS);
  }
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const User = models?.User || model<IUser>("User", userSchema);
