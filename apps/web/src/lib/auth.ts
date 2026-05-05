import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { loginSchema } from "@repo/shared";

import { User } from "@/models/user";

import { connectToDatabase } from "./db";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set");
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET must be set");
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        // Validate
        const validatedData = loginSchema.safeParse(credentials);
        if (!validatedData.success) {
          throw new Error(validatedData.error.issues[0].message);
        }
        const { email, password } = validatedData.data;
        await connectToDatabase();

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Prevent login if account deleted
        if (user.isDeleted) {
          throw new Error("Account does not exist! Register first.");
        }

        if (!user.isVerified) {
          throw new Error("Please verify your email first! Register First.");
        }

        // Prevent login if account locked
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new Error(
            "Account temporarily locked due to multiple failed logins"
          );
        }

        // Check password
        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
          // Increment login attempts
          user.loginAttempts = (user.loginAttempts || 0) + 1;
          // Lock account after 5 failed attempts
          if (user.loginAttempts >= 5) {
            user.lockedUntil = new Date(Date.now() + 60 * 60 * 1000); // 60 min lock
          }
          await user.save({ validateBeforeSave: false });
          throw new Error("Invalid email or password");
        }

        // Reset login attempts on success
        if (user.loginAttempts) {
          user.loginAttempts = 0;
          user.lockedUntil = undefined;
        }
        user.lastLoginAt = new Date();
        await user.save({ validateBeforeSave: false });

        return {
          id: user._id.toString(),
          email: user.email,
          image: user.profileImage || null,
          isRole: user.isRole,
          currentPlan: user.currentPlan,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        // Normalize returned profile
        return {
          id: profile.sub,
          email: profile.email!,
          name: profile.name,
          image: profile.picture,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectToDatabase();
          const email = (user as any).email.toLowerCase().trim();
          let existing = await User.findOne({ email });

          if (!existing) {
            existing = await User.create({
              email,
              password: null,
              isVerified: true,
              oAuth: {
                google: { id: user.id, email },
                profile: { name: user.name, image: user.image },
              },
            });
          } else if (!existing.oAuth?.google) {
            // Prevent login if account deleted
            if (existing.isDeleted) {
              throw new Error("Account does not exist! Register first.");
            }

            existing.oAuth = {
              ...existing.oAuth,
              google: { id: user.id, email },
              profile: { name: user.name, image: user.image },
            };
            await existing.save({ validateBeforeSave: false });
          }

          // Attach DB id to session
          (user as any).id = existing._id.toString();
          (user as any).isRole = existing.isRole;
          (user as any).currentPlan = existing.currentPlan;
          return true;
        } catch (err) {
          // console.error("Google signIn error:", err);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || token.id;
        token.email = user.email;
        token.image = user.image;
        token.isRole = (user as any).isRole;
        token.currentPlan = (user as any).currentPlan;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.isRole = token.isRole as string;
        session.user.currentPlan = token.currentPlan as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60, // 10 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};
