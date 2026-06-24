export interface User {
  _id: string;
  email: string;
  password: string;

  role: string;
  profileImage: string;

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
  emailVerifiedAt?: Date;

  otp?: string;
  otpExpiredAt?: Date;

  lastLoginAt?: Date;
  loginAttempts: number;
  lockedUntil?: Date;

  isDeleted: boolean;
  deletedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}
