import asyncHandler from "../../middlewares/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
<<<<<<< HEAD
import { registerStudent, loginStudentService ,forgotPasswordService,getAllStudentsService, resetPasswordStudentService   } from "../student/student.service.js";
=======
import { registerStudent, loginStudentService ,forgotPasswordService,getAllStudentsService,bookSlotService } from "../student/student.service.js";
>>>>>>> 637a9965a9b0942ec11d97dab263f74b38993b51




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


<<<<<<< HEAD
// Reset Student Password Controller
const resetPassword = async (req, res) => {

  console.log("Token :", req.params.token);
  console.log("Body :", req.body);
  try {
    const result = await resetPasswordStudentService(
      req.params.token,
      req.body
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { resetPassword };
=======


// book slot teacher

const bookSlot = async (req, res) => {
    try {

        const { teacherId, slotId, studentId } = req.body;

        const booking = await bookSlotService(
            teacherId,
            slotId,
            studentId
        );

        res.status(200).json({
            success: true,
            message: "Slot booked successfully",
            data: booking
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

export { bookSlot };
>>>>>>> 637a9965a9b0942ec11d97dab263f74b38993b51
