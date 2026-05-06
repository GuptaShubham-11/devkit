import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { isValidObjectId } from "mongoose";

import { getInstallsSchema } from "@repo/shared";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { serverEnv } from "@/lib/server-env";
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

    const sessionUserId = session.user.id;

    if (userId && userId !== sessionUserId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const conditions: any = {
      userId: sessionUserId, // enforce ownership
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

    const total = await Install.countDocuments(conditions);

    const installs = await Install.aggregate([
      { $match: conditions },
      { $sort: sortObject },
      { $skip: offset },
      { $limit: limit },
      {
        $lookup: {
          from: "templates",
          localField: "templateId",
          foreignField: "_id",
          as: "template",
        },
      },

      {
        $unwind: {
          path: "$template",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $project: {
          _id: 1,
          status: 1,
          duration: 1,
          installedAt: 1,
          createdAt: 1,
          templateId: 1,
          failedReason: 1,
          ipAddress: 1,

          templateName: "$template.name",
          templateSlug: "$template.slug",
        },
      },
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
          serverEnv.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
