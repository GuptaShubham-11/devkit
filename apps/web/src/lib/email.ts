import nodemailer from "nodemailer";

import { secretVariables } from "./secret-variables";

export function sendEmail({
  emailAddress,
  emailSubject,
  htmlText,
}: {
  emailAddress: string;
  emailSubject: string;
  htmlText: string;
}) {
  const { EMAIL_USER, APP_PASSWORD } = secretVariables();

  try {
    const mailConfig = {
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: APP_PASSWORD,
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
