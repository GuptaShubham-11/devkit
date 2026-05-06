import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import mongoose from "mongoose";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { serverEnv } from "@/lib/server-env";
import { Install } from "@/models/install";
import { Template } from "@/models/template";
import { Transaction } from "@/models/transaction";
import { User } from "@/models/user";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required!" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    await connectToDatabase();

    const [
      user,
      installStats,
      installsLast10Days,
      creditUsageLast10Days,
      suggestions,
    ] = await Promise.all([
      User.findById(userId).select("creditBalance lastLoginAt").lean(),

      Install.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: null,
            avgDuration: { $avg: "$duration" },
            total: { $sum: 1 },
            success: {
              $sum: {
                $cond: [{ $eq: ["$status", "success"] }, 1, 0],
              },
            },
          },
        },
      ]),

      Install.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
        { $limit: 10 },
        { $sort: { _id: 1 } },
      ]),

      Transaction.aggregate([
        {
          $match: {
            userId: userObjectId,
            type: "debit",
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            total: { $sum: "$amount" },
          },
        },
        { $sort: { _id: -1 } },
        { $limit: 10 },
        { $sort: { _id: 1 } },
      ]),

      Template.aggregate([
        {
          $match: {
            isPublished: true,
            isDeleted: false,
          },
        },
        {
          $addFields: {
            weight: {
              $add: [
                { $cond: ["$isSponsored", 2, 0] },
                { $cond: ["$isPro", 1, 0] },
                { $rand: {} },
              ],
            },
          },
        },
        { $sort: { weight: -1 } },
        { $limit: 5 },
      ]),
    ]);

    const stats = installStats[0] || {
      avgDuration: 0,
      total: 0,
      success: 0,
    };

    const successRate =
      stats.total > 0 ? Math.round((stats.success / stats.total) * 100) : 0;

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          creditBalance: user?.creditBalance ?? 0,
          avgDuration: Number(stats.avgDuration?.toFixed(2) || 0),
          successRate,
          totalInstalls: stats.total,
          lastLoginAt: user?.lastLoginAt ?? null,
        },

        charts: {
          installsLast10Days,
          creditUsageLast10Days,
        },

        suggestions,
      },
    });
  } catch (error) {
    // console.log("Failed to get dashboard:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch dashboard",
        details:
          serverEnv.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
