import bcrypt from "bcryptjs";
import mongoose, { model, models, Schema } from "mongoose";

import { User as SharedUser } from "@repo/shared";

import { serverEnv } from "@/lib/server-env";

const oAuthSchema = new Schema(
  {
    google: {
      id: { type: String },
      email: { type: String, lowercase: true, trim: true },
    },
    profile: {
      name: { type: String },
      image: { type: String },
    },
  },
  { _id: false }
);

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
    role: {
      type: String,
      enum: ["superAdminUser", "normalUser", "earlyAccessUser"],
      default: "normalUser",
    },
    profileImage: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    oAuth: {
      type: oAuthSchema,
      default: {},
    },
    otp: {
      type: String,
    },
    otpExpiredAt: {
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
