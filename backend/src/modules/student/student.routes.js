import { Router } from "express";
import { register,loginStudent,forgotPassword,getAllStudents, resetPassword ,getStudentProfile } from "../student/student.controller.js";

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

//  book slot
router.post("/book-slot", bookSlot);

// get student profile
router.get("/profile/:studentId", getStudentProfile);



// reset student password
// router.patch("/reset-password/:token", resetPassword);
router.post("/reset-password", resetPassword);

export default router;

