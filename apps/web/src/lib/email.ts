import nodemailer from "nodemailer";

import { serverEnv } from "./server-env";

export async function sendEmail({
  emailAddress,
  emailSubject,
  htmlText,
  fromMail = "hello@developerkit.pro",
}: {
  emailAddress: string;
  emailSubject: string;
  htmlText: string;
  fromMail?: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: serverEnv.EMAIL_USER,
        pass: serverEnv.APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `Devkit <${fromMail}>`,
      to: emailAddress,
      subject: emailSubject,
      html: htmlText,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Send email error:", error);

    return {
      success: false,
      error,
    };
  }
}
