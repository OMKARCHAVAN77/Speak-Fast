import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendForgotPasswordMail = async (
  studentEmail,
  studentName,
  token
) => {
  try {

    const resetLink =
      `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const html = `
      <h2>Reset Your Password</h2>

      <p>Hello <b>${studentName}</b>,</p>

      <p>We received a request to reset your password.</p>

      <p>Click the button below to create a new password.</p>

      <br>

      <a
        href="${resetLink}"
        style="
          background:#2563eb;
          color:white;
          padding:12px 25px;
          text-decoration:none;
          border-radius:5px;
        "
      >
        Reset Password
      </a>

      <br><br>

      <p>This link will expire in 1 hour.</p>

      <p>If you didn't request this, you can safely ignore this email.</p>

      <h3>Speak Fast Team</h3>
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
            name: studentName,
          },
        ],

        subject: "Reset Password",

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

    console.log("Reset Password Email Sent");

  } catch (error) {

    console.log(error.response?.data || error.message);

    throw error;
  }
};