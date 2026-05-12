import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { checkoutBodySchema } from "@repo/shared";

import { authOptions } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/payments/create-checkout";
import { serverEnv } from "@/lib/server-env";

// POST /api/payment/checkout
// Body: { plan: "pro_50_credits" }
// Response: { success: true, checkoutUrl }

export async function POST(request: NextRequest) {
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

    const reqData = await request.json();
    const validatedData = checkoutBodySchema.safeParse(reqData);
    if (!validatedData.success) {
      return NextResponse.json(
        {
          error: validatedData.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const { plan = "pro_50_credits" } = validatedData.data;

    const result = await createCheckoutSession({
      userId: session.user.id,
      planId: plan,
    });

    if (!result.checkoutUrl) {
      return NextResponse.json(
        {
          error: "Invalid response from payment provider",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        checkoutUrl: result.checkoutUrl,
        sessionId: result.sessionId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating checkout", error);
    return NextResponse.json(
      {
        error:
          serverEnv.NODE_ENV === "development"
            ? (error as Error).message
            : "Failed to create checkout",
      },
      { status: 500 }
    );
  }
}
