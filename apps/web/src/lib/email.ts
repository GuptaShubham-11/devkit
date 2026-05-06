import nodemailer from "nodemailer";

import { serverEnv } from "./server-env";

export function sendEmail({
  emailAddress,
  emailSubject,
  htmlText,
}: {
  emailAddress: string;
  emailSubject: string;
  htmlText: string;
}) {
  try {
    const mailConfig = {
      service: "gmail",
      auth: {
        user: serverEnv.EMAIL_USER,
        pass: serverEnv.APP_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(mailConfig);

    const mailDetails = {
      from: "Devkit",
      to: emailAddress,
      subject: emailSubject,
      html: htmlText,
    };

    transporter.sendMail(mailDetails);
  } catch (error) {
    // console.error('Nodemailer send mail error', error);
    return error;
  }
}
