
import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,

  // WhatsApp
  WHATSAPP_API_VERSION: process.env.WHATSAPP_API_VERSION,
  WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
  WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID,
  WHATSAPP_BUSINESS_ACCOUNT_ID: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
  WHATSAPP_VERIFY_TOKEN: process.env.WHATSAPP_VERIFY_TOKEN,
  TEACHER_WHATSAPP_NUMBER: process.env.TEACHER_WHATSAPP_NUMBER,

  // Database
  MONGODB_URI: process.env.MONGODB_URI,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,

  // Cloudinary
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,

  // Brevo
  BREVO_API_KEY: process.env.BREVO_API_KEY,
  SENDER_EMAIL: process.env.SENDER_EMAIL,
  SENDER_NAME: process.env.SENDER_NAME,

  // Frontend
  FRONTEND_URL: process.env.FRONTEND_URL,
};

export default env;