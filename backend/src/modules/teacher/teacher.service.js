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

  const link = `http://localhost:4200/set-password?token=${token}&email=${email}`;

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


const filterTeacherService = async (date, time) => {

    const teachers = await Teacher.find({
        slots: {
            $elemMatch: {
                date: date,
                time: time
            }
        }
    });

    return teachers;

};


export {
  registerTeacherService,
  getAllTeachersService,
  filterTeacherService
};