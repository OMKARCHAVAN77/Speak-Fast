import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";

import {
    // registerStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} from "./student.controller.js";

const router = express.Router();

// get all student
router.get("/",authenticate,authorize("admin"), getAllStudents);

// get single student
router.get("/:id",authenticate,authorize("student"), getStudentById);

// update single student
router.put("/:id", updateStudent);

// Delete single student
router.delete("/:id", deleteStudent);

export default router;