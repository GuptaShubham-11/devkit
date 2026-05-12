import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { paginationQuerySchema } from "@repo/shared";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { serverEnv } from "@/lib/server-env";
import { Payment } from "@/models/payment";

// GET /api/payment/billing?limit=10&offset=0
// Returns payment history (invoice, amount, status, createdAt, creditsGranted)

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

    const [items, total] = await Promise.all([
      Payment.find({
        userId: session.user.id,
      })
        .sort({
          createdAt: -1,
        })
        .skip(offset)
        .limit(limit)
        .select(
          [
            "_id",
            "invoiceUrl",
            "amount",
            "currency",
            "status",
            "creditsGranted",
            "createdAt",
          ].join(" ")
        )
        .lean(),

      Payment.countDocuments({
        userId: session.user.id,
      }),
    ]);

    return NextResponse.json(
      {
        message: "Billing history fetched successfully",

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
        error: "Failed to fetch billing history",

        details:
          serverEnv.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
