import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      isRole: string;
      currentPlan: string;
    } & DefaultSession["user"];
  }
}
