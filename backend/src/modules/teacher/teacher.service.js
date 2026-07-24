import crypto from "crypto";
import Teacher from "./teacher.model.js";
import sendMail from "../../utils/sendMail.js";

const registerTeacherService = async (data, photoFile) => {
  const {
    firstName,
    lastName,
    email,
    contactNumber,
    aadharNo,
    slots,
    googleMeetLink,
  } = data;

  const existingTeacher = await Teacher.findOne({ email });

  if (existingTeacher) {
    return {
      error: true,
      status: 400,
      message: "Teacher already exists with this email",
    };
  }

  let parsedSlots = [];

  if (slots) {
    try {
      parsedSlots = JSON.parse(slots);
    } catch (err) {
      return {
        error: true,
        status: 400,
        message: "Invalid slots format",
      };
    }
  }

  const photoPath = photoFile ? photoFile.filename : null;

  const token = crypto.randomBytes(32).toString("hex");
  const tokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour

  const teacher = new Teacher({
    firstName,
    lastName,
    email,
    contactNumber,
    aadharNo,
    photo: photoPath,
    googleMeetLink,
    slots: parsedSlots,
    resetToken: token,
    resetTokenExpiry: tokenExpiry,
  });

  await teacher.save();

const link = `https://speak-fast.vercel.app/setpassword?token=${token}&email=${email}`;

  const html = `
    <h3>Welcome ${firstName} ${lastName}</h3>
    <p>You have been registered as a teacher. Click the link below to set your password:</p>
    <a href="${link}">${link}</a>
    <p>This link is valid for 1 hour.</p>
  `;

  await sendMail(email, "Set Your Password", html);

  return {
    error: false,
    message: "Teacher registered successfully. Email sent.",
  };
};

const getAllTeachersService = async () => {
  const teachers = await Teacher.find().select(
    "-password -resetToken -resetTokenExpiry"
  );

  return {
    error: false,
    teachers,
  };
};

const setPasswordService = async (email, token, newPassword, confirmPassword) => {
  if (newPassword !== confirmPassword) {
    return { error: true, status: 400, message: "Passwords do not match" };
  }

  const teacher = await Teacher.findOne({ email });

  if (!teacher) {
    return { error: true, status: 404, message: "Teacher not found" };
  }

  if (teacher.resetToken !== token) {
    return { error: true, status: 400, message: "Invalid or expired link" };
  }

  if (teacher.resetTokenExpiry < Date.now()) {
    return { error: true, status: 400, message: "Link has expired" };
  }

  teacher.password = newPassword;
  teacher.isPasswordSet = true;
  teacher.resetToken = undefined;
  teacher.resetTokenExpiry = undefined;
  await teacher.save();

  return { error: false, message: "Password set successfully. You can now login." };
};

const loginTeacherService = async (email, password) => {
  const teacher = await Teacher.findOne({ email });

  if (!teacher) {
    return { error: true, status: 401, message: "Invalid email or password" };
  }

  if (!teacher.isPasswordSet) {
    return {
      error: true,
      status: 400,
      message: "Please set your password first using the link sent to your email",
    };
  }

  if (teacher.password !== password) {
    return { error: true, status: 401, message: "Invalid email or password" };
  }

  return {
    error: false,
    teacher: {
      id: teacher._id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      role: teacher.role,
    },
  };
};

// date/time नुसार available teachers शोधण्यासाठी
const filterTeacherService = async (date, time) => {
  const query = {};

  // slots array मध्ये आत date/time साठी match शोधतोय
  if (date || time) {
    query.slots = {
      $elemMatch: {
        ...(date && { date }),
        ...(time && { time }),
      },
    };
  }



  const teachers = await Teacher.find(query).select(
    "-password -resetToken -resetTokenExpiry"
  );

  return teachers;
};

export {
  registerTeacherService,
  getAllTeachersService,
  setPasswordService,
  loginTeacherService,
  filterTeacherService,
};