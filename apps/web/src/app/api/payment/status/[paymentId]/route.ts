import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { serverEnv } from "@/lib/server-env";
import { Payment } from "@/models/payment";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ paymentId: string }> }
) {
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
    await connectToDatabase();

    const userId = session.user.id;
    const { paymentId } = await context.params;

    console.log(request.nextUrl, request.nextUrl.searchParams);

    console.log(paymentId, "Payment Id");

    const payment = await Payment.findOne({
      paymentId,
      status: "succeeded",
    });

    console.log(paymentId, payment);

    return Response.json({
      paid: !!payment,
      payment,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          serverEnv.NODE_ENV === "development"
            ? error
            : "Failed to get payment status",
        success: false,
      },
      { status: 500 }
    );
  }
}
