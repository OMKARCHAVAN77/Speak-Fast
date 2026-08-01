import express from "express";

import whatsappController from "./whatsapp.controller.js";
import whatsappWebhook from "./whatsapp.webhook.js";


const router = express.Router();


// Send student WhatsApp message
router.post(
  "/student-message",
  whatsappController.sendStudentMessage
);


// Send teacher WhatsApp message
router.post(
  "/teacher-message",
  whatsappController.sendTeacherMessage
);


// Webhook verification (GET)
router.get(
  "/webhook",
  whatsappWebhook.verifyWebhook
);


// Receive webhook events (POST)
router.post(
  "/webhook",
  whatsappWebhook.receiveWebhook
);


export default router;