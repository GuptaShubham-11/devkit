import { User } from "@/models/user";

export async function checkUserIsAdmin(userId: string): Promise<boolean> {
  if (!process.env.ROLE) {
    throw new Error("ROLE must be set at apps/web/.env");
  }

  try {
    const user = await User.findById(userId);
    return user.isRole === process.env.ROLE || false;
  } catch {
    // console.error('Error checking admin status:', error);
    return false;
  }
}
