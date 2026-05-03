import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { createTemplateSchema } from "@repo/shared";

import { authOptions } from "@/lib/auth";
import { checkUserIsAdmin } from "@/lib/check-admin";
import { connectToDatabase } from "@/lib/db";
import { Template } from "@/models/template";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required!" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Check admin permissions
    const isAdmin = await checkUserIsAdmin(session.user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Admin access required!" },
        { status: 403 }
      );
    }

    const reqData = await request.json();
    const validatedData = createTemplateSchema.safeParse(reqData);
    if (!validatedData.success) {
      console.log(validatedData.error);
      return NextResponse.json(
        { error: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    const {
      name,
      slug,
      description,
      stack,
      repoUrl,
      creditCost,
      tags,
      version,
      isPro = false,
      isFeatured = false,
      isSponsored = false,
      isPublished = false,
      sponsoredBy,
      isDeleted = false,
      installer,
      imageUrl,
      codeUrl,
      withoutLogin = false,
      folderStructure,
      videoUrl,
      liveUrl,
      features,
      isRepoTemplate = false,
    } = validatedData.data;

    const existingTemplate = await Template.findOne({ slug });
    if (existingTemplate) {
      return NextResponse.json(
        { error: "Template with this slug already exists!" },
        { status: 400 }
      );
    }

    const newTemplate = await Template.create({
      name,
      slug,
      description,
      stack,
      repoUrl,
      tags,
      creditCost,
      version,
      isPro,
      isFeatured,
      isSponsored,
      isPublished,
      sponsoredBy,
      isDeleted,
      installer,
      imageUrl,
      codeUrl,
      withoutLogin,
      folderStructure,
      videoUrl,
      isRepoTemplate,
      liveUrl,
      features,
    });

    return NextResponse.json(
      {
        message: "Template created successfully",
        template: newTemplate,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating template:", error);
    return NextResponse.json(
      {
        error: "Failed to create template",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
