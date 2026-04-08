import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { isValidObjectId } from "mongoose";

import { getInstallsSchema } from "@repo/shared";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Install } from "@/models/install";

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

    const validated = getInstallsSchema.safeParse(parsedQuery);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0].message },
        { status: 400 }
      );
    }

    const { templateId, userId, limit, offset, search, sort, order } =
      validated.data;

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

    if (templateId) {
      if (!isValidObjectId(templateId)) {
        return NextResponse.json(
          { error: "Invalid template ID" },
          { status: 400 }
        );
      }
      conditions.templateId = templateId;
    }

    if (search) {
      conditions.failedReason = {
        $regex: search,
        $options: "i",
      };
    }

    const sortObject: any = {};

    switch (sort) {
      case "duration":
        sortObject.duration = order === "asc" ? 1 : -1;
        break;
      case "installedAt":
        sortObject.installedAt = order === "asc" ? 1 : -1;
        break;
      case "createdAt":
      default:
        sortObject.createdAt = order === "asc" ? 1 : -1;
    }

    const [installs, total] = await Promise.all([
      Install.find(conditions)
        .sort(sortObject)
        .skip(offset)
        .limit(limit)
        .lean(),

      Install.countDocuments(conditions),
    ]);

    return NextResponse.json(
      {
        message: "Installs fetched successfully",
        installs,
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
        error: "Error fetching installs",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
