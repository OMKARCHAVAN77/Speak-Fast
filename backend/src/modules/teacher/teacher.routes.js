import express from "express";
import { upload } from '../../middlewares/upload.js';
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";

import {
  registerTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  addTeacherSlot,
  getTeacherSlots,
  updateTeacherSlot,
  deleteTeacherSlot,
  filterTeachers,
} from "./teacher.controller.js";

const router = express.Router();

/*
=========================================
Teacher CRUD
=========================================
*/

// Register Teacher
router.post("/register",upload.single("photo"), registerTeacher);

// Get All Teachers
router.get("/",authenticate,authorize("admin"), getAllTeachers);

// Filter Teachers by date/time
router.get("/filter", filterTeachers);

// // Get Teacher By Id
router.get("/:id", getTeacherById);

// // Update Teacher
router.put("/:id", updateTeacher);

// // Delete Teacher
router.delete("/:id", deleteTeacher);




/*
=========================================
Teacher Slot APIs
=========================================
*/

// Add Slot
router.post("/:id/slots", addTeacherSlot);


//  Get Teacher Slots
router.get("/:id/slots", getTeacherSlots);

// // Update Slot
 router.put("/slot/:slotId", updateTeacherSlot);

// // Delete Slot
router.delete("/slot/:slotId", deleteTeacherSlot);




export default router;