import { Router } from "express";
import { register,loginStudent,forgotPassword,getAllStudents, resetPassword } from "../student/student.controller.js";

const router = Router();

/**
 * Student Registration
 * POST /api/students/register
 */
// student register API
router.post("/register", register);

// student login API
router.post("/login", loginStudent);

// student login API
router.post("/forgot-password", forgotPassword );

// get all student API
router.get("/getallstudent", getAllStudents );


// book slot



import { bookSlot } from "../student/student.controller.js";


router.post("/book-slot", bookSlot);

// reset student password
// router.patch("/reset-password/:token", resetPassword);
router.post("/reset-password", resetPassword);

export default router;

