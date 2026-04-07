export interface User {
  _id: string;
  email: string;
  password: string;
  privateKey: string;

  isRole: string;
  profileImage?: string;
  bio?: string;
  website?: string;
  githubUsername?: string;

  currentPlan: string;
  creditBalance: number;

  oAuth?: {
    google?: {
      id: string;
      email: string;
    };
    profile?: {
      name: string;
      image: string;
    };
  };

  isVerified: boolean;
  otp?: string;
  otpExpiry?: string;
  emailVerifiedAt: Date;

  lastLoginAt?: string;
  loginAttempts?: number;
  lockedUntil?: string;

  shortLivedToken?: string;
  shortLivedTokenExpiry?: string;

  isDeleted?: boolean;
  deletedAt?: string;

  createdAt: string;
  updatedAt: string;
}
