import crypto from "crypto";
import Admin from "../admin/admin.model.js";
import sendMail from "../../utils/sendMail.js";

const loginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    return {
      error: true,
      status: 401,
      message: "Invalid email or password",
    };
  }

  if (admin.password !== password) {
    return {
      error: true,
      status: 401,
      message: "Invalid email or password",
    };
  }

  if (admin.isLoggedIn) {
    return {
      error: true,
      status: 403,
      message: "Admin already logged in from another session",
    };
  }

  admin.isLoggedIn = true;
  await admin.save();

  return {
    error: false,
    admin: {
      email: admin.email,
      role: admin.role,
    },
  };
};

const logoutAdmin = async (email) => {
  if (email) {
    const admin = await Admin.findOne({ email });

    if (admin) {
      admin.isLoggedIn = false;
      await admin.save();
    }
  }
};

const forgotPasswordService = async (email) => {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    return {
      error: true,
      status: 404,
      message: "No admin found with this email",
    };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour

  admin.resetToken = token;
  admin.resetTokenExpiry = tokenExpiry;

  await admin.save();

  const link = `http://localhost:5173/reset-password?token=${token}&email=${email}`;

  const html = `
    <h3>Password Reset Request</h3>
    <p>Click the link below to reset your password:</p>
    <a href="${link}">${link}</a>
    <p>This link is valid for 1 hour. If you did not request this, please ignore this email.</p>
  `;

  await sendMail(email, "Reset Your Password", html);

  return {
    error: false,
    message: "Password reset link sent to your email",
  };
};

const resetPasswordService = async (email, token, newPassword) => {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    return {
      error: true,
      status: 404,
      message: "Admin not found",
    };
  }

  if (admin.resetToken !== token) {
    return {
      error: true,
      status: 400,
      message: "Invalid or expired reset link",
    };
  }

  if (admin.resetTokenExpiry < Date.now()) {
    return {
      error: true,
      status: 400,
      message: "Reset link has expired",
    };
  }

  admin.password = newPassword;
  admin.resetToken = undefined;
  admin.resetTokenExpiry = undefined;

  await admin.save();

  return {
    error: false,
    message: "Password reset successful. Please login with your new password.",
  };
};

export {
  loginAdmin,
  logoutAdmin,
  forgotPasswordService,
  resetPasswordService,
};