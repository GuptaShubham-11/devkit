import { User } from "@/models/user";

import { serverEnv } from "./server-env";

export async function checkUserIsAdmin(userId: string): Promise<boolean> {
  try {
    const user = await User.findById(userId);
    return user.isRole === serverEnv.ROLE || false;
  } catch {
    // console.error('Error checking admin status:', error);
    return false;
  }
}
