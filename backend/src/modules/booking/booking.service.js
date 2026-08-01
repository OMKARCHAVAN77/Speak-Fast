// console.log("BOOKING SERVICE FILE LOADED");
// import bcrypt from "bcryptjs";

// import User from "../user/user.model.js";
// import Student from "../student/student.model.js";
// import Teacher from "../teacher/teacher.model.js";
// import Booking from "./booking.model.js";

// import whatsappService from "../whatsapp/whatsapp.service.js";

// export const registerAndBookService = async (body) => {
//        console.log("✅ registerAndBookService called");
//     console.log(body);


//     const {

//         courseName,
//         coursePrice,

//         teacherId,
//         slotId,

//         firstName,
//         lastName,
//         email,
//         password,

//         contactNumber,
//         district,
//         qualification,
//         occupation

//     } = body;
//      console.log("REGISTER AND BOOK SERVICE CALLED");

//     // ===============================
//     // Check Email
//     // ===============================

//     const existingUser = await User.findOne({
//         email: email.toLowerCase()
//     });

//     if (existingUser) {
//         throw new Error("Email already exists");
//     }

//     // ===============================
//     // Check Contact Number
//     // ===============================

//     const existingStudent = await Student.findOne({
//         contactNumber: contactNumber.toString()
//     });

//     if (existingStudent) {
//         throw new Error("Contact number already exists");
//     }

//     // ===============================
//     // Find Teacher
//     // ===============================

//     const teacher = await Teacher.findById(teacherId);

//     if (!teacher) {
//         throw new Error("Teacher not found");
//     }

//     // ===============================
//     // Find Slot
//     // ===============================

//     const slot = teacher.slots.id(slotId);

//     if (!slot) {
//         throw new Error("Slot not found");
//     }

//     if (slot.isBooked) {
//         throw new Error("Slot already booked");
//     }

//     // ===============================
//     // Create User
//     // ===============================

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({

//         firstName,

//         lastName,

//         email: email.toLowerCase(),

//         password: hashedPassword,

//         role: "student"

//     });

//     // ===============================
//     // Create Student
//     // ===============================

//     const student = await Student.create({

//         userId: user._id,

//         contactNumber: contactNumber.toString(),

//         district,

//         qualification,

//         occupation,

//         googleMeetLink: teacher.googleMeetLink,

//         assignedTeacher: teacher._id

//     });

//     // ===============================
//     // Create Booking
//     // ===============================

//     const booking = await Booking.create({

//         studentId: student._id,

//         teacherId: teacher._id,

//         slotId: slot._id,

//         slotTime: slot.time,

//         courseName,

//         coursePrice,

//         status: "Booked"

//     });

//     // ===============================
//     // Update Slot
//     // ===============================

//     slot.isBooked = true;
//     slot.studentId = student._id;

//     await teacher.save();

//     // ===============================
//     // Send WhatsApp Notifications
//     // ===============================

//     try {

//         await whatsappService.sendStudentMessage({
//             name: `${firstName} ${lastName}`,
//             phone: contactNumber,
//             email
//         });

//         await whatsappService.sendTeacherMessage({
//             name: `${firstName} ${lastName}`,
//             phone: contactNumber,
//             email
//         });

//     } catch (error) {

//         console.error("❌ WhatsApp Notification Failed");
//         console.error(error.response?.data || error.message);

//     }

//     // ===============================
//     // Return Response
//     // ===============================

//     return {

//         user,

//         student,

//         booking

//     };

// };

console.log("BOOKING SERVICE FILE LOADED");

import bcrypt from "bcryptjs";

import User from "../user/user.model.js";
import Student from "../student/student.model.js";
import Teacher from "../teacher/teacher.model.js";
import Booking from "./booking.model.js";

import whatsappService from "../whatsapp/whatsapp.service.js";

export const registerAndBookService = async (body) => {

    console.log("✅ registerAndBookService called");
    console.log(body);

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

    console.log("1️⃣ Checking Email...");

    // ===============================
    // Check Email
    // ===============================

    const existingUser = await User.findOne({
        email: email.toLowerCase()
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    console.log("✅ Email Check Completed");


    // ===============================
    // Check Contact Number
    // ===============================

    console.log("2️⃣ Checking Contact Number...");

    const existingStudent = await Student.findOne({
        contactNumber: contactNumber.toString()
    });

    if (existingStudent) {
        throw new Error("Contact number already exists");
    }

    console.log("✅ Contact Number Check Completed");


    // ===============================
    // Find Teacher
    // ===============================

    console.log("3️⃣ Finding Teacher...");

    const teacher = await Teacher.findById(teacherId).populate({
        path: "userId",
        select: "firstName lastName email"
    });

    if (!teacher) {
        throw new Error("Teacher not found");
    }

    console.log("✅ Teacher Found");
    console.log("Teacher User:", teacher.userId);
    console.log("Teacher First Name:", teacher.userId.firstName);
    console.log("Teacher Last Name:", teacher.userId.lastName);
    console.log("Google Meet Link:", teacher.googleMeetLink);


    // ===============================
    // Find Slot
    // ===============================

    console.log("4️⃣ Finding Slot...");

    const slot = teacher.slots.id(slotId);

    if (!slot) {
        throw new Error("Slot not found");
    }

    if (slot.isBooked) {
        throw new Error("Slot already booked");
    }

    console.log("✅ Slot Found");


    // ===============================
    // Create User
    // ===============================

    console.log("5️⃣ Creating User...");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({

        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "student"

    });

    console.log("✅ User Created");


    // ===============================
    // Create Student
    // ===============================

    console.log("6️⃣ Creating Student...");

    const student = await Student.create({

        userId: user._id,
        contactNumber: contactNumber.toString(),
        district,
        qualification,
        occupation,
        googleMeetLink: teacher.googleMeetLink,
        assignedTeacher: teacher._id

    });

    console.log("✅ Student Created");


    // ===============================
    // Create Booking
    // ===============================

    console.log("7️⃣ Creating Booking...");

    const booking = await Booking.create({

        studentId: student._id,
        teacherId: teacher._id,
        slotId: slot._id,
        slotTime: slot.time,
        courseName,
        coursePrice,
        status: "Booked"

    });

    console.log("✅ Booking Created");


    // ===============================
    // Update Slot
    // ===============================

    console.log("8️⃣ Updating Slot...");

    await Teacher.updateOne(
        {
            _id: teacherId,
            "slots._id": slotId
        },
        {
            $set: {
                "slots.$.isBooked": true,
                "slots.$.studentId": student._id
            }
        }
    );

    console.log("✅ Slot Updated");

    // ===============================
    // Send WhatsApp Notifications
    // ===============================

    try {

        console.log("9️⃣ Sending Student WhatsApp...");

        await whatsappService.sendStudentMessage({
            name: `${firstName} ${lastName}`,
            phone: contactNumber,
            email,
            district,
            qualification,
            occupation,
            courseName,
            coursePrice,
            teacherName: `${teacher.userId.firstName} ${teacher.userId.lastName}`,
            slotDate: slot.date,
            slotTime: slot.time,
            googleMeetLink: teacher.googleMeetLink
        });

        console.log("✅ Student WhatsApp Sent");


        console.log("🔟 Sending Teacher WhatsApp...");

        await whatsappService.sendTeacherMessage({
            name: `${firstName} ${lastName}`,
            phone: contactNumber,
            email,
            district,
            qualification,
            occupation,
            courseName,
            coursePrice,
            teacherName: `${teacher.userId.firstName} ${teacher.userId.lastName}`,

            slotDate: slot.date,
            slotTime: slot.time,

            googleMeetLink: teacher.googleMeetLink

        });


        console.log("✅ Teacher WhatsApp Sent");

    } catch (error) {

        console.error("❌ WhatsApp Notification Failed");
        console.error(error.response?.data || error.message);

    }

    console.log("✅ registerAndBookService Completed");

    return {

        user,
        student,
        booking

    };

};