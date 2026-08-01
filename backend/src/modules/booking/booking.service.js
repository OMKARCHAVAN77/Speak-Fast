import bcrypt from "bcryptjs";
 import crypto from "crypto";
import User from "../user/user.model.js";
import Student from "../student/student.model.js";
import Teacher from "../teacher/teacher.model.js";
import Booking from "./booking.model.js";

import { sendStudentMail } from "../../utils/sendStudentInvitation.js";

export const registerAndBookService = async (body) => {

    try {

        const {

            courseName,
            coursePrice,

            teacherId,
            slotId,

            firstName,
            lastName,
            email,

            contactNumber,
            district,
            qualification,
            occupation

        } = body;

        // ===============================
        // Check Email
        // ===============================

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            throw new Error("Email already exists");
        }

        // ===============================
        // Find Teacher
        // ===============================

        const teacher = await Teacher.findById(teacherId);

        if (!teacher) {
            throw new Error("Teacher not found");
        }

        // ===============================
        // Find Slot
        // ===============================

        const slot = teacher.slots.id(slotId);

        if (!slot) {
            throw new Error("Slot not found");
        }

        if (slot.isBooked) {
            throw new Error("Slot already booked");
        }

        // ===============================
        // Generate Reset Token
        // ===============================

        const resetToken = crypto.randomBytes(32).toString("hex");

        const resetPasswordExpires = new Date(
            Date.now() + 60 * 60 * 1000
        );

        // ===============================
        // Create User
        // ===============================

        const user = await User.create({

            firstName,

            lastName,

            email: email.toLowerCase(),

            password: null,

            role: "student",

            resetPasswordToken: resetToken,

            resetPasswordExpires,

            isPasswordSet: false

        });

        // ===============================
        // Create Student
        // ===============================

        const student = await Student.create({

            userId: user._id,

            contactNumber,

            district,

            qualification,

            occupation,

            googleMeetLink: teacher.googleMeetLink,

            assignedTeacher: teacher._id

        });

        // ===============================
        // Create Booking
        // ===============================

        const booking = await Booking.create({

            studentId: student._id,

            teacherId: teacher._id,

            slotId: slot._id,

            slotTime: slot.time,

            courseName,

            coursePrice,

            status: "Booked"

        });

        // ===============================
        // Update Slot
        // ===============================

        slot.isBooked = true;
        slot.studentId = student._id;

        await teacher.save();

        // ===============================
        // Send Email
        // ===============================

        try {

            await sendStudentMail(
                user.email,
                `${firstName} ${lastName}`,
                resetToken
            );

        } catch (mailError) {

            console.error("Student mail error:", mailError.message);

            // Email fail झाली तरी registration fail करू नका
        }

        return {

            message: "Student registered successfully. Please check your email to set your password.",

            student,

            booking

        };

    } catch (error) {

        console.error("Register Student Error:", error);

        throw new Error(error.message || "Student registration failed");

    }

};