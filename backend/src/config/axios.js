import axios from "axios";
import env from "./env.js";

const whatsappApi = axios.create({
  baseURL: `https://graph.facebook.com/${env.WHATSAPP_API_VERSION}`,
  headers: {
    Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default whatsappApi;