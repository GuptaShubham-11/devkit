import mongoose from "mongoose";

import { connectToDatabase } from "@/lib/db";
import { CreditLedger } from "@/models/credit-ledger";
import { User } from "@/models/user";

/**
 * Add credits to a user's wallet with idempotency.
 * - Creates a CreditLedger entry (positive credits)
 * - Increments User.creditBalance cache
 * - Uses MongoDB transaction for atomicity
 * - Enforces idempotency via unique (type, referenceId) index in ledger
 *
 * Do not call this directly from controllers handling paid features; use consume-credits for deductions.
 */
export async function addCredits(params: {
  userId: string;
  credits: number;
  type: "purchase" | "refund" | "admin";
  referenceId?: string | null; // e.g., Dodo payment id for purchases
  description?: string;
  metadata?: Record<string, any>;
}) {
  const {
    userId,
    credits,
    type,
    referenceId = null,
    description,
    metadata,
  } = params;

  if (credits <= 0) {
    throw new Error("addCredits requires a positive credits value");
  }

  await connectToDatabase();

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      // Create ledger record (positive credits)
      await CreditLedger.create(
        [
          {
            userId,
            type,
            credits, // positive
            referenceId: referenceId ?? undefined,
            description,
            metadata,
          },
        ],
        { session }
      );

      // Update cached balance
      const updated = await User.findByIdAndUpdate(
        userId,
        { $inc: { creditBalance: credits }, $set: { currentPlan: "pro" } },
        { new: true, session }
      ).select("_id creditBalance, currentPlan");

      if (!updated) {
        throw new Error("User not found while adding credits");
      }
    });
  } catch (err: any) {
    // Duplicate key on (type, referenceId) idempotency guard
    if (err && err.code === 11000) {
      // Treat as success (already processed)
      return { ok: true, idempotent: true };
    }
    throw err;
  } finally {
    session.endSession();
  }

  return { ok: true, idempotent: false };
}
