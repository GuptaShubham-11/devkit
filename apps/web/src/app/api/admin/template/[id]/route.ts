import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { isValidObjectId } from "mongoose";

import { updateTemplateSchema } from "@repo/shared";

import { authOptions } from "@/lib/auth";
import { checkUserIsAdmin } from "@/lib/check-admin";
import { connectToDatabase } from "@/lib/db";
import { ITemplate, Template } from "@/models/template";

type Prams = {
  id: string;
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Prams }
) {
  try {
    const { id } = params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid template ID" },
        { status: 400 }
      );
    }

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
    const validatedData = updateTemplateSchema.safeParse(reqData);
    if (!validatedData.success) {
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
      tags,
      version,
      isPro,
      isFeatured,
      isSponsored,
      isPublished,
      isRepoTemplate,
      installer,
      creditCost,
      folderStructureImage,
      videoUrl,
      sponsoredBy,
      isDeleted,
    } = validatedData.data;

    const updatedTemplate = await Template.findOneAndUpdate(
      { _id: id },
      {
        name,
        slug,
        description,
        stack,
        repoUrl,
        tags,
        version,
        isPro,
        isFeatured,
        isSponsored,
        isPublished,
        sponsoredBy,
        isDeleted,
        isRepoTemplate,
        installer,
        creditCost,
        folderStructureImage,
        videoUrl,
      },
      {
        new: true,
      }
    );

    return NextResponse.json(
      { message: "Template updated successfully", template: updatedTemplate },
      { status: 200 }
    );
  } catch (error) {
    // console.log('Error updating template:', error);
    return NextResponse.json(
      {
        error: "Error updating template",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Prams }
) {
  try {
    const { id } = params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid template ID" },
        { status: 400 }
      );
    }

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

    const deletedTemplate: ITemplate | null = await Template.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true }
    );

    if (!deletedTemplate) {
      return NextResponse.json(
        { error: "Template not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Template deleted successfully",
        templateId: deletedTemplate._id,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.log('Error deleting template:', error);
    return NextResponse.json(
      {
        error: "Error deleting template",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
