import express from "express";
import { setPassword ,forgotPasswordController , resetPasswordController } from "./auth.controller.js";

const router = express.Router();

//teacher set password
router.post("/setpassword/:token", setPassword);


//  student forgot password
router.post("/forgot-password", forgotPasswordController);

// student reset password
router.post("/reset-password/:token",resetPasswordController);

export default router;