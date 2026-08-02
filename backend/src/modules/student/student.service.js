import bcrypt from "bcryptjs";

import User from "../user/user.model.js";
import Student from "./student.model.js";


// ==========================================
// Get All Students
// ==========================================
export const getAllStudentsService = async () => {

    const students = await Student.find()
        .populate({
            path: "userId",
            select: "-password"
        })
        .populate({
            path: "assignedTeacher",
            // select: "specialization experience googleMeetLink userId ",
            select: " googleMeetLink userId ",
             populate: {
                path: "userId",
                select: "firstName lastName email"
            }
        }).
        populate({
             path: "bookings"
        }). 
        sort({ createdAt: -1 });
    return students;
};


// ==========================================
// Get Student By ID
// ==========================================
export const getStudentByIdService = async (studentId) => {

    const student = await Student.findById(studentId)
        .populate({
            path: "userId",
            select: "-password"
        })
        .populate({
            path: "assignedTeacher",
            populate: {
                path: "userId",
                select: "firstName lastName email"
            }
        });

    if (!student) {
        throw new Error("Student not found");
    }

    return student;
};

// ==========================================
// Update Student By ID
// ==========================================
export const updateStudentService = async (studentId, body) => {

    const {
        firstName,
        lastName,
        email,
        contactNumber,
        district,
        qualification,
        occupation
    } = body;

    // Find Student
    const student = await Student.findById(studentId);

    if (!student) {
        throw new Error("Student not found");
    }

    // Find User
    const user = await User.findById(student.userId);

    if (!user) {
        throw new Error("User not found");
    }

    // Duplicate Email Check
    if (email && email !== user.email) {

        const existingEmail = await User.findOne({
            email: email.toLowerCase(),
            _id: { $ne: user._id }
        });

        if (existingEmail) {
            throw new Error("Email already exists");
        }

        user.email = email.toLowerCase();
    }

    // Update User
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    await user.save();

    // Update Student
    if (contactNumber) student.contactNumber = contactNumber;
    if (district) student.district = district;
    if (qualification) student.qualification = qualification;
    if (occupation) student.occupation = occupation;

    await student.save();

    return await Student.findById(student._id)
        .populate({
            path: "userId",
            select: "-password"
        })
        .populate({
            path: "assignedTeacher"
        });

};


// ==========================================
// Delete Student
// ==========================================
export const deleteStudentService = async (studentId) => {

    // Find Student
    const student = await Student.findById(studentId);

    if (!student) {
        throw new Error("Student not found");
    }

    // Delete User
    await User.findByIdAndDelete(student.userId);

    // Delete Student Profile
    await Student.findByIdAndDelete(studentId);

    return true;
};