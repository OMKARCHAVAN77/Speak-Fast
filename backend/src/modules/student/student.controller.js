import asyncHandler from "../../middlewares/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { registerStudent, loginStudentService ,forgotPasswordService,getAllStudentsService, resetPasswordService,bookSlotService ,getStudentProfileService  } from "../student/student.service.js";


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


// Reset Student Password Controller
const resetPassword = asyncHandler(async (req, res) => {
  const { email, token, newPassword } = req.body;
  await resetPasswordService(email, token, newPassword);
  return res.status(200).json(new ApiResponse(200, "Password reset successful."));
});
export {resetPassword}


// book slot teacher
// const bookSlot = async (req, res) => {
//     try {

//         const { teacherId, slotId, studentId } = req.body;

//         const booking = await bookSlotService(
//             teacherId,
//             slotId,
//             studentId
//         );

//         res.status(200).json({
//             success: true,
//             message: "Slot booked successfully",
//             data: booking
//         });

//     } catch (error) {

//         res.status(400).json({
//             success: false,
//             message: error.message
//         });

//     }
// };
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


// student profile controller
 const getStudentProfile = async (req, res) => {

    try {

        const { studentId } = req.params;

        const student = await getStudentProfileService(studentId);

        res.status(200).json({  
            success: true,
            data: student
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
export {getStudentProfile}
