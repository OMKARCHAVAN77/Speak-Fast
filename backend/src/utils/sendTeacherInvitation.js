import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendTeacherMail = async (
  teacherEmail,
  teacherName,
  token
) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL}/setpassword?token=${token}&email=${teacherEmail}`;

    const html = `
      <h2>Welcome to Speak Fast</h2>

      <p>Hello <b>${teacherName}</b>,</p>

      <p>You have been successfully registered as a Teacher.</p>

      <p>Please click the button below to create your password.</p>

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
        Set Password
      </a>

      <br><br>

      <p>This link is valid for 1 hour.</p>

      <p>Regards,</p>

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
            email: teacherEmail,
            name: teacherName,
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

    console.log("✅ Teacher Invitation Email Sent");
  } catch (error) {
    console.log("❌ Email Error");

    console.log(error.response?.data || error.message);

    throw error;
  }
};

