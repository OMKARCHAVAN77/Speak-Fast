import express from "express";
import upload from "../../config/multerConfig.js";
import isAdmin from "../../middlewares/auth.middleware.js";

import {
  registerTeacher,
  getAllTeachers,
  setPassword,
  loginTeacher,
  filterTeachers,
} from "./teacher.controller.js";

const router = express.Router();

// Register Teacher
router.post("/register", upload.any(), registerTeacher);

// Get All Teachers (Protected)
router.get("/all", isAdmin, getAllTeachers);

// Set Password (after registration, via emailed link)
router.post("/reset-password", setPassword);

// Teacher Login
router.post("/login", loginTeacher);

// Filter Teachers by date/time
router.get("/filter", filterTeachers);

export default router;