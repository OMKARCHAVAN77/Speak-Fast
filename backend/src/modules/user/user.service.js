import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./user.model.js";
import Student from "../student/student.model.js";
import Teacher from "../teacher/teacher.model.js"

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

export const checkUserEmailContactService = async (email,contactNumber) => {

     const response = {
         emailExists: false,
        contactNumberExists: false
         };

    // check email

    if(email){
        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if(user){
               response.emailExists = true;
        }
    }

    // check contact

    if(contactNumber) {
        const studentNum = await Student.findOne({
             contactNumber: contactNumber.trim()
        })

       if(studentNum) {
            response.contactNumberExists = true
       } 


       if(!studentNum) {
        const teacherNum = await Teacher.findOne({
            contactNumber:contactNumber.trim()
        });

        if(teacherNum) {
             response.contactNumberExists = true
        }
       }
    }
    return response
}