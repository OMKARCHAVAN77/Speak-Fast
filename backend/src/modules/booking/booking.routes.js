import express from "express";

import {
    registerAndBook
} from "./booking.controller.js";

const router = express.Router();

// ===================================
// Register Student + Book Slot
// ===================================

router.post(
    "/register-book",
    registerAndBook
);

export default router;