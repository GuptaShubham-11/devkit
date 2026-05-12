import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";

import { paginationQuerySchema } from "@repo/shared";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { serverEnv } from "@/lib/server-env";
import { CreditLedger } from "@/models/credit-ledger";

// GET /api/payment/ledger?limit=10&offset=0
// Returns ledger history:
// - purchases
// - usages
// - refunds
// - admin changes

export async function GET(request: NextRequest) {
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

    const query = Object.fromEntries(request.nextUrl.searchParams.entries());

    const parsed = paginationQuerySchema.safeParse(query);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues?.[0]?.message || "Invalid query",
        },
        { status: 400 }
      );
    }

    const { limit, offset } = parsed.data;

    await connectToDatabase();

    const conditions = {
      userId: new mongoose.Types.ObjectId(session.user.id),
    };

    const [items, total] = await Promise.all([
      CreditLedger.find(conditions)
        .sort({
          createdAt: -1,
        })
        .skip(offset)
        .limit(limit)
        .select(
          [
            "_id",
            "type",
            "credits",
            "referenceId",
            "description",
            "metadata",
            "createdAt",
          ].join(" ")
        )
        .lean(),

      CreditLedger.countDocuments(conditions),
    ]);

    return NextResponse.json(
      {
        message: "Ledger history fetched successfully",

        items,

        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
          page: Math.floor(offset / limit) + 1,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch transactions",

        details:
          serverEnv.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
