import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./user.model.js";

export const registerService = async (body) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
  } = body;

  const user = await User.findOne({
    email: email.toLowerCase(),
  });

  if (user) {
    throw new Error("User already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password: hashPassword,
    role,
  });

  return newUser;
};

export const loginService = async (email, password) => {

    const user = await User.findOne({
        email: email.toLowerCase()
    });

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new Error("Invalid password");
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    return {
        token,
        user
    };
};