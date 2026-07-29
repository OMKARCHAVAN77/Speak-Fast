import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../user/user.model.js";
import Teacher from "./teacher.model.js";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";    
import crypto from "crypto";
import { sendTeacherMail } from "../../utils/sendTeacherInvitation.js";



// ===============================
//  Teachers regisration
// ===============================

export const registerTeacherService = async (body, file) => {


   try{
      let media = "";

 
  // Upload Image
  if (file) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "teachers",
      resource_type: "auto",
    });

    // fs.unlinkSync(file.path);

    media = result.secure_url;
  }

  const {
    firstName,
    lastName,
    email,
    password,
    contactNumber,
    aadharNo,
    
    googleMeetLink,
    slots
  } = body;

  let teacherSlots = [];

    if (slots) {
      teacherSlots = typeof slots === "string"
        ? JSON.parse(slots)
        : slots;
    }


  // Check User Email
  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Check Aadhaar
  const existingTeacher = await Teacher.findOne({
    aadharNo,
  });

  if (existingTeacher) {
    throw new Error("Aadhaar already registered");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);


  // Create User
  const user = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password: hashedPassword,
    role: "teacher",
    isActive: true
  });

  // Generate Reset Token
  const token = crypto.randomBytes(32).toString("hex");

  // roken valid for 1Day

  const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000;


  user.resetPasswordToken = token;
  user.resetPasswordExpires = tokenExpiry;

  await user.save();

  // Create Teacher
  const teacher = await Teacher.create({
    userId: user._id,
    contactNumber,
    aadharNo,
   
    googleMeetLink,
    photo: media,
     slots: teacherSlots
  });

  // Send Invitation Mail
  await sendTeacherMail(
    user.email,
    `${firstName} ${lastName}`,
    token
  );

  return {
    success: true,
    message: "Teacher Registered Successfully. Invitation email sent.",
    user,
    teacher,
  };
  }finally{
      // Delete temporary uploaded file
    if (file?.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  }

  
}



// ===============================
// Get All Teachers
// ===============================
export const getAllTeachersService = async () => {

  const teachers = await Teacher.find()

    .populate({
      path: "userId",
      select: "firstName lastName email role isActive"
    });

  return teachers;

};


// ========================================
// Get Teacher By Id
// ========================================
export const getTeacherByIdService = async (teacherId) => {

  const teacher = await Teacher.findById(teacherId)
    .populate({
      path: "userId",
      select: "firstName lastName email role isActive"
    });

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  return teacher;
};


// Update Teacher

export const updateTeacherService = async (teacherId, body) => {

  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    throw new Error("Invalid Teacher ID");
  }

  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  const {
    firstName,
    lastName,
    email,
    contactNumber,
    aadharNo,
   
    googleMeetLink,
    photo,
  } = body;

  // Check duplicate email
  if (email) {
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: teacher.userId },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }
  }

  // Update User Collection
  await User.findByIdAndUpdate(
    teacher.userId,
    {
      firstName,
      lastName,
      email: email?.toLowerCase(),
    },
    { new: true }
  );

  // Update Teacher Collection
  const updatedTeacher = await Teacher.findByIdAndUpdate(
    teacherId,
    {
      contactNumber,
      aadharNo,
      
      googleMeetLink,
      photo,
    },
    { new: true }
  ).populate({
    path: "userId",
    select: "firstName lastName email role isActive",
  });

  return updatedTeacher;
};


// Delete Teacher
export const deleteTeacherService = async (teacherId) => {
  // Check valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    throw new Error("Invalid Teacher ID");
  }

  // Find Teacher
  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  // Delete Teacher Profile
  await Teacher.findByIdAndDelete(teacherId);

  // Delete User Account
  await User.findByIdAndDelete(teacher.userId);

  return teacher;
};


// =============================================
// Add Multiple Teacher Slots
// =============================================
export const addTeacherSlotService = async (teacherId, body) => {

    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
        throw new Error("Teacher not found");
    }

    const { slots } = body;

    if (!slots || !Array.isArray(slots) || slots.length === 0) {
        throw new Error("Slots are required");
    }

    for (const newSlot of slots) {

        const alreadyExists = teacher.slots.find(
            (slot) =>
                slot.date === newSlot.date &&
                slot.time === newSlot.time
        );

        if (!alreadyExists) {

            teacher.slots.push({
                date: newSlot.date,
                time: newSlot.time,
                isBooked: false
            });

        }

    }

    await teacher.save();

    return teacher.slots;

};



// =============================================
// Get Teacher Slots
// =============================================
export const getTeacherSlotsService = async (
  teacherId,
  status
) => {

  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  let slots = teacher.slots;

  if (status === "available") {

    slots = slots.filter(
      slot => slot.isBooked === false
    );

  }

  if (status === "booked") {

    slots = slots.filter(
      slot => slot.isBooked === true
    );

  }

  return slots;

};

// =============================================
// Update Teacher Slot
// =============================================
export const updateTeacherSlotService = async (
    slotId,
    data
) => {

    const { date, time } = data;


    // Validate Slot Id
    if (!mongoose.Types.ObjectId.isValid(slotId)) {
        throw new Error("Invalid Slot ID");
    }


    // Find teacher having this slot
    const teacher = await Teacher.findOne({
        "slots._id": slotId
    });


    if (!teacher) {
        throw new Error("Slot not found");
    }


    // Find particular slot
    const slot = teacher.slots.id(slotId);


    if (!slot) {
        throw new Error("Slot not found");
    }


    // Cannot update booked slot
    if (slot.isBooked === true) {

        throw new Error(
            "Booked slot cannot be updated"
        );

    }



    // Duplicate slot checking

    const duplicateSlot = teacher.slots.find(
        (item)=>{

            return (
                item._id.toString() !== slotId &&
                item.date === date &&
                item.time === time
            );

        }
    );


    if(duplicateSlot){

        throw new Error(
            "Slot already exists"
        );

    }



    // Update slot

    if(date){
        slot.date = date;
    }


    if(time){
        slot.time = time;
    }



    await teacher.save();



    return slot;

};


// =============================================
// Delete Teacher Slot
// =============================================
export const deleteTeacherSlotService = async (slotId) => {

    // Find Teacher by Slot Id
    const teacher = await Teacher.findOne({
        "slots._id": slotId
    });

    if (!teacher) {
        throw new Error("Slot not found");
    }

    // Find Slot
    const slot = teacher.slots.id(slotId);

    if (!slot) {
        throw new Error("Slot not found");
    }

    // Do not delete booked slot
    if (slot.isBooked) {
        throw new Error("Booked slot cannot be deleted");
    }

    // Remove Slot
    teacher.slots.pull(slotId);

    await teacher.save();

    return teacher.slots;

};


// =====================================
// Filter Teacher By Date & Time
// =====================================

export const filterTeachersService = async (date, time) => {

  if (!date) {
    throw new Error("Date is required");
  }

  const slotFilter = {
    date,
    isBooked: false
  };

  if (time) {
    slotFilter.time = time;
  }

  // const teachers = await Teacher.find({
  //   slots: {
  //     $elemMatch: slotFilter
  //   }
  // }).populate({
  //   path: "userId",
  //   select: "firstName lastName email"
  // });

  const teachers = await Teacher.find()
  .populate({
    path: "userId",
    select: "firstName lastName email"
  });


  const result = teachers
    .filter((teacher) => teacher.userId) // null userId remove
    .map((teacher) => {

      let matchingSlots = teacher.slots.filter((slot) => {

        if (time) {
          return (
            slot.date === date &&
            slot.time === time &&
            // slot.isBooked === false
            !slot.isBooked
          );
        }

        return (
          slot.date === date &&
          // slot.isBooked === false
          !slot.isBooked 
        );

      });

      if(matchingSlots.length === 0){
         matchingSlots = teacher.slots.filter(slot => !slot.isBooked);
      }


      return {

        _id: teacher._id,

        firstName: teacher.userId?.firstName || "",

        lastName: teacher.userId?.lastName || "",

        email: teacher.userId?.email || "",

        photo: teacher.photo,

        slots: matchingSlots

      };

    });


  return result.filter(
    (teacher) => teacher.slots.length > 0
  );

};


