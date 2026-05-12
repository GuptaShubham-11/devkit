import mongoose from "mongoose";

import { connectToDatabase } from "@/lib/db";
import { CreditLedger } from "@/models/credit-ledger";
import { User } from "@/models/user";

/**
 * Centralized credit deduction logic.
 * - Validates sufficient balance (prevents negative)
 * - Creates ledger entry (negative credits)
 * - Updates cached user balance atomically
 *
 * ALWAYS use this service for premium feature usage.
 */

export class InsufficientCreditsError extends Error {
  constructor(
    public required: number,
    public available: number
  ) {
    super(
      `Insufficient credits. Required: ${required}, Available: ${available}`
    );
    this.name = "InsufficientCreditsError";
  }
}

export async function consumeCredits(params: {
  userId: string;
  credits: number; // number of credits to deduct (positive integer)
  referenceId?: string | null; // attach a usage reference (e.g., install id)
  description?: string;
  metadata?: Record<string, any>;
}) {
  const { userId, credits, referenceId = null, description, metadata } = params;

  if (!Number.isFinite(credits) || credits <= 0) {
    throw new Error("consumeCredits requires a positive credits value");
  }

  await connectToDatabase();

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      // Fetch current balance (for strong validation)
      const user = await User.findById(userId, null, { session }).select(
        "_id creditBalance"
      );
      if (!user) {
        throw new Error("User not found while consuming credits");
      }

      const available = Number(user.creditBalance || 0);
      if (available < credits) {
        throw new InsufficientCreditsError(credits, available);
      }

      // Create ledger entry (negative credits)
      await CreditLedger.create(
        [
          {
            userId,
            type: "usage",
            credits: -Math.abs(credits),
            referenceId: referenceId ?? undefined,
            description,
            metadata,
          },
        ],
        { session }
      );

      // Decrement balance
      const updated = await User.findByIdAndUpdate(
        userId,
        { $inc: { creditBalance: -Math.abs(credits) } },
        { new: true, session }
      ).select("_id creditBalance");

      if (!updated) {
        throw new Error("Failed to update user balance during consumeCredits");
      }

      if (updated.creditBalance < 0) {
        // Strong guard - should never happen due to check above
        throw new Error(
          "Invariant violation: negative credit balance detected"
        );
      }
    });
  } finally {
    session.endSession();
  }

  return { ok: true };
}
