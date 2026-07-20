import asyncHandler from "../../middlewares/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { registerStudent, loginStudentService ,forgotPasswordService,getAllStudentsService } from "../student/student.service.js";




//student registration controller 

const register = asyncHandler(async (req, res) => {
  const student = await registerStudent(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Student Registered Successfully",
      student
    )
  );
});

export { register };


// student login controller
const loginStudent = asyncHandler(async (req, res) => {

    const result = await loginStudentService(req.body);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Login Successful",
            result
        )
    );

});

export { loginStudent };


// student forgot password controller
const forgotPassword = asyncHandler( async (req, res) => {

    const { email } = req.body;

    await forgotPasswordService(email);

    return res.status(200).json(

      new ApiResponse(
        200,
        "Password reset link sent successfully."
      )
    );
  }
);
export { forgotPassword };


// get all student controller
const getAllStudents = asyncHandler(async (req, res) => {

    const students = await getAllStudentsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Students fetched successfully.",
            students
        )
    );
});
export { getAllStudents };