import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { getTransactionsSchema } from "@repo/shared";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Transaction } from "@/models/transaction";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required!" },
        { status: 401 }
      );
    }

    const queryParams = Object.fromEntries(
      request.nextUrl.searchParams.entries()
    );

    const parsedQuery = {
      ...queryParams,
      limit: Number(queryParams.limit) || 10,
      offset: Number(queryParams.offset) || 0,
      order: queryParams.order === "asc" ? "asc" : "desc",
    };

    const validated = getTransactionsSchema.safeParse(parsedQuery);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0].message },
        { status: 400 }
      );
    }

    const { userId, limit, offset, search, sort, order } = validated.data;

    await connectToDatabase();

    // Enforce ownership
    const sessionUserId = session.user.id;

    if (userId && userId !== sessionUserId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const conditions: any = {
      userId: sessionUserId, // enforce user scope
    };

    if (search) {
      conditions.failedReason = {
        $regex: search,
        $options: "i",
      };
    }

    const sortObject: any = {};

    switch (sort) {
      case "amount":
        sortObject.duration = order === "asc" ? 1 : -1;
        break;
      case "type":
        sortObject.transactionedAt = order === "asc" ? 1 : -1;
        break;
      case "createdAt":
      default:
        sortObject.createdAt = order === "asc" ? 1 : -1;
    }

    const [transactions, total] = await Promise.all([
      Transaction.find(conditions)
        .sort(sortObject)
        .skip(offset)
        .limit(limit)
        .lean(),

      Transaction.countDocuments(conditions),
    ]);

    return NextResponse.json(
      {
        message: "Transactions fetched successfully",
        transactions,
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
        error: "Error fetching transactions",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
