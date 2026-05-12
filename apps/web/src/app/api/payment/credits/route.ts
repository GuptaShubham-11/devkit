import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { serverEnv } from "@/lib/server-env";
import { CreditLedger } from "@/models/credit-ledger";
import { User } from "@/models/user";

// GET /api/payment/credits
// Response: { totalCredits, remainingCredits }

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Authentication required!",
        },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const [user, totals] = await Promise.all([
      User.findById(session.user.id).select("_id creditBalance").lean(),

      CreditLedger.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(session.user.id),
          },
        },

        {
          $group: {
            _id: null,

            positiveSum: {
              $sum: {
                $cond: [{ $gt: ["$credits", 0] }, "$credits", 0],
              },
            },
          },
        },
      ]),
    ]);

    const remainingCredits = Number(user?.creditBalance || 0);

    const totalCredits = totals?.[0]?.positiveSum
      ? Number(totals[0].positiveSum)
      : 0;

    return NextResponse.json(
      {
        totalCredits,
        remainingCredits,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch credits",

        details:
          serverEnv.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
