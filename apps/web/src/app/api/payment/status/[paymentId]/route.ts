import { NextRequest, NextResponse } from "next/server";

import { Payment } from "@/models/payment";

export async function GET(request: NextRequest) {
  try {
    const paymentId = request.nextUrl.searchParams.get("paymentId");

    const payment = await Payment.findOne({
      paymentId,
      status: "paid",
    });

    return NextResponse.json(
      {
        paid: payment.status === "succeeded",
        payment,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Payment not found!",
        paid: false,
      },
      { status: 500 }
    );
  }
}
