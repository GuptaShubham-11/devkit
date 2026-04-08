import { NextRequest, NextResponse } from "next/server";

import { isValidObjectId } from "mongoose";

import { getTemplatesSchema } from "@repo/shared";

import { checkUserIsAdmin } from "@/lib/check-admin";
import { connectToDatabase } from "@/lib/db";
import { Template } from "@/models/template";

export async function GET(request: NextRequest) {
  try {
    const queryParams = Object.fromEntries(
      request.nextUrl.searchParams.entries()
    );

    const parsedQuery = {
      ...queryParams,
      limit: Number(queryParams.limit) || 10,
      offset: Number(queryParams.offset) || 0,
      order: queryParams.order === "asc" ? 1 : -1,

      isPro: queryParams.isPro === "true",
      isFeatured: queryParams.isFeatured === "true",
      isSponsored: queryParams.isSponsored === "true",
      isRepoTemplate: queryParams.isRepoTemplate === "true",

      isPublished: queryParams.isPublished,
      isDeleted: queryParams.isDeleted,

      userId: queryParams.userId,
    };

    const validated = getTemplatesSchema.safeParse(parsedQuery);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0].message },
        { status: 400 }
      );
    }

    const {
      limit,
      offset,
      search,
      sort,
      order,
      userId,
      isPro,
      isFeatured,
      isSponsored,
      isPublished,
      isDeleted,
      isRepoTemplate,
    } = validated.data;

    await connectToDatabase();

    let isAdmin = false;

    if (userId) {
      if (!isValidObjectId(userId)) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
      }

      isAdmin = await checkUserIsAdmin(userId);
      if (!isAdmin) {
        return NextResponse.json(
          { error: "Admin access required!" },
          { status: 403 }
        );
      }
    }

    const conditions: any = {};

    // Public filters
    if (isPro !== undefined) conditions.isPro = isPro;
    if (isFeatured !== undefined) conditions.isFeatured = isFeatured;
    if (isSponsored !== undefined) conditions.isSponsored = isSponsored;
    if (isRepoTemplate !== undefined)
      conditions.isRepoTemplate = isRepoTemplate;

    if (isAdmin) {
      if (isPublished !== undefined) conditions.isPublished = isPublished;
      if (isDeleted !== undefined) conditions.isDeleted = isDeleted;
    } else {
      // Public users only see published + not deleted
      conditions.isPublished = true;
      conditions.isDeleted = false;
    }

    // Search
    if (search) {
      conditions.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
        { stack: { $in: [new RegExp(search, "i")] } },
        { slug: { $regex: search, $options: "i" } },
      ];
    }

    let sortObject: any = {};

    switch (sort) {
      case "popular":
        sortObject = { downloads: -1, views: -1 };
        break;
      case "trending":
        sortObject = { views: -1, createdAt: -1 };
        break;
      case "downloads":
        sortObject = { downloads: order };
        break;
      case "views":
        sortObject = { views: order };
        break;
      case "createdAt":
        sortObject = { createdAt: order };
        break;
      case "updatedAt":
        sortObject = { updatedAt: order };
        break;

      default:
        sortObject[sort || "createdAt"] = order;
    }

    // Parallel queries
    const [templates, total] = await Promise.all([
      Template.find(conditions)
        .sort(sortObject)
        .skip(offset)
        .limit(limit)
        .lean(),

      Template.countDocuments(conditions),
    ]);

    return NextResponse.json({
      message: "Templates fetched successfully",
      templates,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
        page: Math.floor(offset / limit) + 1,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch templates",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
