import express from "express";
import isAdmin from "../../middlewares/auth.middleware.js";

import {
  login,
  logout,
  dashboard,
  forgotPassword,
  resetPassword,
} from "./auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/dashboard", isAdmin, dashboard);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;