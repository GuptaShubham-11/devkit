import { NextResponse } from "next/server";

import { slugSchema } from "@repo/shared";

import { connectToDatabase } from "@/lib/db";
import { Template } from "@/models/template";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const validatedData = slugSchema.safeParse(slug);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0].message },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const template = await Template.findOne({
      slug: validatedData.data,
    }).lean();

    if (!template) {
      return NextResponse.json(
        { error: "Template does not exist!" },
        { status: 404 }
      );
    }

    if (!template.isPublished) {
      return NextResponse.json(
        { error: "Template is not published!" },
        { status: 404 }
      );
    }

    if (template.isDeleted) {
      return NextResponse.json(
        { error: "Template is deleted!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Template fetched successfully",
        template,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error('Error fetching template:', error);
    return NextResponse.json(
      {
        error: "Failed to fetch template",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
