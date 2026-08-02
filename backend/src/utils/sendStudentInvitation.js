import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendStudentMail = async (
  studentEmail,
  studentName,
  token
) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL}/setpassword?token=${token}&email=${studentEmail}`;

    const html = `
        <!DOCTYPE html>
        <html lang="en">

        <head>
        <meta charset="UTF-8">
        <title>Welcome to Speak Fast</title>
        </head>

        <body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:30px 0;">

        <tr>
        <td align="center">

        <table
        width="650"
        cellpadding="0"
        cellspacing="0"
        style="
        background:#ffffff;
        border-radius:12px;
        overflow:hidden;
        box-shadow:0 8px 25px rgba(0,0,0,.08);
        ">

        <!-- HEADER -->

        <tr>

        <td
        style="
        background:linear-gradient(90deg,#2563eb,#4f7cff);
        padding:35px;
        text-align:center;
        color:white;
        ">

        <h1
        style="
        margin:0;
        font-size:34px;
        font-weight:bold;
        ">
        Speak Fast
        </h1>

        <p
        style="
        margin-top:10px;
        font-size:16px;
        opacity:.95;
        ">
        Welcome to Speak Fast
        </p>

        </td>

        </tr>

        <!-- BODY -->

        <tr>

        <td style="padding:45px;">

        <h2
        style="
        margin-top:0;
        color:#222;
        ">
        Hello ${studentName},
        </h2>

        <p
        style="
        font-size:16px;
        line-height:28px;
        color:#555;
        ">

        Congratulations! 🎉

        </p>

        <p
        style="
        font-size:16px;
        line-height:28px;
        color:#555;
        ">

        You have been successfully registered as a
        <b>Student</b> in the
        <b>Speak Fast English Academy</b>.

        </p>

        <p
        style="
        font-size:16px;
        line-height:28px;
        color:#555;
        ">

        To activate your account, please click the button below and create your password.

        </p>

        <table width="100%" cellpadding="0" cellspacing="0">

        <tr>

        <td align="center" style="padding:35px 0;">

        <a
        href="${resetLink}"

        style="
        background:#2563eb;
        color:white;
        text-decoration:none;
        padding:15px 45px;
        border-radius:40px;
        display:inline-block;
        font-size:17px;
        font-weight:bold;
        box-shadow:0 6px 18px rgba(37,99,235,.35);
        ">

        Set Password

        </a>

        </td>

        </tr>

        </table>

        <p
        style="
        font-size:15px;
        color:#666;
        line-height:26px;
        ">

        This invitation link will expire in
        <b>24 hours</b>.

        </p>

        <hr
        style="
        border:none;
        border-top:1px solid #ececec;
        margin:35px 0;
        ">

        <p
        style="
        font-size:15px;
        font-weight:bold;
        color:#333;
        margin-bottom:10px;
        ">

        Button not working?

        </p>

        <p
        style="
        font-size:14px;
        color:#666;
        line-height:24px;
        word-break:break-all;
        ">

        Copy and paste the following URL into your browser.

        </p>

        <p
        style="
        background:#f7f8fc;
        padding:15px;
        border-radius:8px;
        word-break:break-all;
        font-size:14px;
        ">

        <a
        href="${resetLink}"
        style="
        color:#2563eb;
        text-decoration:none;
        ">

        ${resetLink}

        </a>

        </p>

        <p
        style="
        margin-top:35px;
        font-size:15px;
        color:#666;
        line-height:26px;
        ">

        If you were not expecting this invitation, you can safely ignore this email.

        </p>

        <p
        style="
        font-size:15px;
        color:#666;
        line-height:26px;
        ">

        We look forward to having you as part of the
        <b>Speak Fast Team.</b>

        </p>

        </td>

        </tr>

        <!-- FOOTER -->

        <tr>

        <td
        style="
        background:#f7f8fb;
        padding:30px;
        text-align:center;
        border-top:1px solid #e8e8e8;
        ">

        <h3
        style="
        margin:0;
        color:#555;
        ">
        Need Help?
        </h3>

        <p style="margin:12px 0;">

        <a
        href="mailto:support@speakfast.com"
        style="
        color:#2563eb;
        text-decoration:none;
        ">

        support@speakfast.com

        </a>

        </p>

        <p
        style="
        margin:0;
        font-size:13px;
        color:#999;
        ">

        © ${new Date().getFullYear()} Speak Fast.
        All Rights Reserved.

        </p>

        </td>

        </tr>

        </table>

        </td>

        </tr>

        </table>

        </body>

        </html>
        `;

    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.SENDER_NAME,
          email: process.env.SENDER_EMAIL,
        },

        to: [
          {
            email: studentEmail,
            name:    studentName,
          },
        ],

        subject: "Welcome to Speak Fast",

        htmlContent: html,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("✅ Student Invitation Email Sent");
  } catch (error) {
    console.log("❌ Email Error");

    console.log(error.response?.data || error.message);

    throw error;
  }
};

