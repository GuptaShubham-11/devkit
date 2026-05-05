import { User } from "@/models/user";

import { secretVariables } from "./secret-variables";

export async function checkUserIsAdmin(userId: string): Promise<boolean> {
  const { ROLE } = secretVariables();

  try {
    const user = await User.findById(userId);
    return user.isRole === ROLE || false;
  } catch {
    // console.error('Error checking admin status:', error);
    return false;
  }
}
