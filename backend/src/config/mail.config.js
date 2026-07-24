import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  // Render IPv6 connection issue fix
  family: 4,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,

  tls: {
    rejectUnauthorized: false,
  },
});


transporter.verify((error) => {

  if (error) {
    console.error("❌ SMTP Error:", error.message);
  } else {
    console.log("✅ SMTP Connected Successfully");
  }

});


export default transporter;