import { User } from "@/models/user";

if (!process.env.ROLE) {
  throw new Error("ROLE must be set at apps/web/.env");
}

export async function checkUserIsAdmin(userId: string): Promise<boolean> {
  try {
    const user = await User.findById(userId);
    return user.isRole === process.env.ROLE || false;
  } catch {
    // console.error('Error checking admin status:', error);
    return false;
  }
}
