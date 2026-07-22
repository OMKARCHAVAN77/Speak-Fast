import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Student from "../student/student.model.js";
import ApiError from "../../utils/ApiError.js";
import sendEmail from "../../utils/studentSendMail.js";
import { validateStudentRegistration,validateStudentLogin } from "../student/student.validation.js";
import Teacher from "../teacher/teacher.model.js";


// student registration service
const registerStudent = async (studentData) => {

  const validation = validateStudentRegistration(studentData);

  if (!validation.isValid) {
    throw new ApiError(400, validation.message);
  }

  const {
    firstName,
    lastName,
    contactNumber,
    email,
    password,
    district,
    qualification,
    occupation,
  } = studentData;

  // Check Email Exists
  const existingEmail = await Student.findOne({ email });

  if (existingEmail) {
    throw new ApiError(409, "Email already registered.");
  }

  // Check Contact Number Exists
  const existingContact = await Student.findOne({ contactNumber });

  if (existingContact) {
    throw new ApiError(409, "Contact Number already registered.");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create Student
  const student = await Student.create({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    contactNumber: contactNumber.trim(),
    email: email.trim().toLowerCase(),
    password: hashedPassword,
    district: district.trim(),
    qualification: qualification.trim(),
    occupation: occupation.trim(),
  });

  // Remove Password from Response
  const studentResponse = student.toObject();
  delete studentResponse.password;

  return studentResponse;
};

export { registerStudent };





// student login servive
const loginStudentService = async (loginData) => {

    const validation = validateStudentLogin(loginData);

    if (!validation.isValid) {
        throw new ApiError(400, validation.message);
    }

    const { email, password } = loginData;

    const student = await Student
        .findOne({ email: email.toLowerCase() })
        .select("+password");

    if (!student) {
        throw new ApiError(401, "Invalid Email or Password.");
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        student.password
    );

    if (!isPasswordMatched) {
        throw new ApiError(401, "Invalid Email or Password.");
    }

    const token = jwt.sign(
        {
            id: student._id,
            email: student.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    const studentData = student.toObject();

    delete studentData.password;

    return {
        student: studentData,
        token
    };

};

export { loginStudentService };



// const resetURL =`${process.env.CLIENT_URL}/forgotPassword/confirmPassword/${resetToken}`;

// student forgot password service
// Student Forgot Password Service
const forgotPasswordService = async (email) => {
  const student = await Student.findOne({
    email: email.toLowerCase(),
  });

  if (!student) {
    throw new ApiError(404, "Student not found.");
  }

  // Generate Random Token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash Token
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save Token in Database
  student.passwordResetToken = hashedToken;

  // Expiry Time - 15 Minutes
  student.passwordResetTokenExpiry = Date.now() + 15 * 60 * 1000;

  await student.save();

  // Reset URL
  const resetURL = `${process.env.CLIENT_URL}/forgotPassword/confirmPassword?token=${resetToken}&email=${student.email}`;

    // Email HTML
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
        </head>
        <body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 0;">
        <tr>
        <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
        style="background:#ffffff;border-radius:10px;overflow:hidden;">
        <tr>

        <td style="background:#2563eb;padding:25px;text-align:center;color:#ffffff;">
        <h1 style="margin:0;">
        SpeakFast
        </h1>
        <p style="margin-top:10px;">
        Student Management System
        </p>

        </td>
        </tr>
        <tr>
        <td style="padding:40px;">
        <h2>Hello ${student.firstName},</h2>
        <p>We received a request to reset your password.</p>
        <p>If you requested this password reset, click the button below.</p>
        <div style="text-align:center;margin:40px 0;">
        <a href="${resetURL}"
        style="
        background:#2563eb;
        color:white;
        padding:15px 35px;
        text-decoration:none;
        border-radius:6px;
        font-size:16px;
        display:inline-block;
        ">
        Reset Password
        </a>
        </div>
        <p>This password reset link will expire in
        <b>15 minutes</b>.
        </p>
        <p>If the button above doesn't work, copy and paste the following URL into your browser.</p>
        <p style="word-break:break-all;color:#2563eb;">
        ${resetURL}
        </p>
        <hr>
        <p>If you did not request a password reset, please ignore this email.Your password will remain unchanged.</p>
        </td>
        </tr>
        <tr>
        <td style="background:#f1f5f9;padding:20px;text-align:center;font-size:13px;">
        <p>
        Need Help?
        </p>
        <p>
        Email:
        support@speakfast.com
        </p>
        <p>
        © ${new Date().getFullYear()} SpeakFast
        All Rights Reserved.
        </p>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        </body>
        </html>
        `;

    await sendEmail(
        student.email,
        "Reset Password",
        html
    );

    return {
    success: true,
    message: "Password reset link sent successfully.",
  };
};

export { forgotPasswordService };



// get all students service
const getAllStudentsService = async () => {

    const students = await Student
        .find({})
        .select("-password -passwordResetToken -passwordResetTokenExpiry")
        .sort({ createdAt: -1 });

    if (!students.length) {
        throw new ApiError(
            404,
            "No students found."
        );
    }
    return students;
};
export { getAllStudentsService };



 // Student Reset Password student Service
const resetPasswordStudentService = async (
    token,
    body
) => {

    const { password, confirmPassword } = body;

    // Required Fields
    if (!password || !confirmPassword) {
        throw new ApiError(
            400,
            "All fields are required."
        );
    }

    // Password Match
    if (password !== confirmPassword) {
        throw new ApiError(
            400,
            "Passwords do not match."
        );
    }

    // Hash URL Token
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // Find Student
    const student = await Student.findOne({

        passwordResetToken: hashedToken,

        passwordResetTokenExpiry: {
            $gt: Date.now()
        }

    }).select("+password");

    if (!student) {

        throw new ApiError(
            400,
            "Reset password link is invalid or expired."
        );

    }

    // Hash Password
    const hashedPassword =
        await bcrypt.hash(password, 10);

    // Update Password
    student.password = hashedPassword;

    // Remove Token
    student.passwordResetToken = null;
    student.passwordResetTokenExpiry = null;

    await student.save();

    return {

        success: true,

        message:
            "Password changed successfully."

    };

};

export { resetPasswordStudentService };


/// book slot service code


 const bookSlotService = async (
    teacherId,
    slotId,
    studentId
) => {

    // Find teacher
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
        throw new Error("Teacher not found");
    }

    // Find slot
    const slot = teacher.slots.id(slotId);

    if (!slot) {
        throw new Error("Slot not found");
    }

    // Check if already booked
    if (slot.isBooked) {
        throw new Error("Slot already booked");
    }

    // Example:
    // Save teacherId & slotId in student record
    // (Modify according to your Student schema)

    await Student.findByIdAndUpdate(
        studentId,
        {
            teacherId,
            slotId
        }
    );

    // Update slot
    slot.isBooked = true;

    await teacher.save();

    return teacher;
};
export {bookSlotService };
