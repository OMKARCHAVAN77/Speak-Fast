import bcrypt from "bcryptjs";

import User from "../user/user.model.js";
import Student from "../student/student.model.js";
import Teacher from "../teacher/teacher.model.js";
import Booking from "./booking.model.js";

import whatsappService from "../whatsapp/whatsapp.service.js";

export const registerAndBookService = async (body) => {

    const {

        courseName,
        coursePrice,

        teacherId,
        slotId,

        firstName,
        lastName,
        email,
        password,

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
    // Check Contact Number
    // ===============================

    const existingStudent = await Student.findOne({
        contactNumber: contactNumber.toString()
    });

    if (existingStudent) {
        throw new Error("Contact number already exists");
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
    // Create User
    // ===============================

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({

        firstName,

        lastName,

        email: email.toLowerCase(),

        password: hashedPassword,

        role: "student"

    });

    // ===============================
    // Create Student
    // ===============================

    const student = await Student.create({

        userId: user._id,

        contactNumber: contactNumber.toString(),

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
    // Send WhatsApp Notifications
    // ===============================

    try {

        await whatsappService.sendStudentMessage({
            name: `${firstName} ${lastName}`,
            phone: contactNumber,
            email
        });

        await whatsappService.sendTeacherMessage({
            name: `${firstName} ${lastName}`,
            phone: contactNumber,
            email
        });

    } catch (error) {

        console.error("❌ WhatsApp Notification Failed");
        console.error(error.response?.data || error.message);

    }

    // ===============================
    // Return Response
    // ===============================

    return {

        user,

        student,

        booking

    };

};