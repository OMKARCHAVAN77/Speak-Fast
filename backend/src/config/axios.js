import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const whatsappApi = axios.create({
  baseURL: `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}`,
  headers: {
    Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default whatsappApi;