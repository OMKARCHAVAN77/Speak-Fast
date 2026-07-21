import express from "express";
import upload from "../../config/multerConfig.js";
import isAdmin from "../../middlewares/auth.middleware.js";

import {
  registerTeacher,
  getAllTeachers,
  filterTeachers,
  
} from "./teacher.controller.js";

const router = express.Router();

// Register Teacher
router.post("/register", upload.any(), registerTeacher);

// Get All Teachers (Protected)
router.get("/all", isAdmin, getAllTeachers);

// Get All Teachers (Public)
// router.get("/all", getAllTeachers);

router.get("/filter",filterTeachers)

export default router;