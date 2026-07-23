import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    // service: "gmail",
     host: "smtp.gmail.com",
  port: 465,
  secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
     connectionTimeout: 60000,
  greetingTimeout: 60000,
  socketTimeout: 60000,
});

transporter.verify((error) => {
    if (error) {
        console.error("SMTP Error:", error);
    } else {
        console.log("✅ SMTP Connected Successfully");
    }
});

export default transporter;