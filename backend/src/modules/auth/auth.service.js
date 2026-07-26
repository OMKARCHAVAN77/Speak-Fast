
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import crypto from "crypto";
import { sendForgotPasswordMail} from '../../utils/studentSendForgotPassInvitation.js'

export const setPasswordService = async (token, password) => {

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Invalid or Expired Token");
  }

  user.password = await bcrypt.hash(password, 10);

  user.isPasswordSet = true;

  user.resetPasswordToken = null;

  user.resetPasswordExpires = null;

  await user.save();

  return {
    message: "Password Set Successfully",
  };
};

// student forgot password service
export const forgotPasswordService = async (email) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

    await user.save();

    await sendForgotPasswordMail(
        user.email,
        user.firstName,
        token
    );

    return {
        success: true,
        message: "Reset password link sent successfully."
    };
};


// student reset password service

export const resetPasswordService = async (token, password) => {

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error("Invalid or Expired Token");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.isPasswordSet = true;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();

  return {
    success: true,
    message: "Password reset successfully."
  };
};