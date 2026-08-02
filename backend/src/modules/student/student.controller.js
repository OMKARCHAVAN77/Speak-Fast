import {
    // registerStudentService,
    getAllStudentsService,
    getStudentByIdService,
    updateStudentService,
    deleteStudentService
} from "./student.service.js";


// ==========================================
// Get All Students
// ==========================================
export const getAllStudents = async (req, res) => {

    try {

        const students = await getAllStudentsService();

        return res.status(200).json({

            success: true,

            total: students.length,

            data: students

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================================
// Get Student By ID
// ==========================================
export const getStudentById = async (req, res) => {

    try {

        const { id } = req.params;

        const student = await getStudentByIdService(id);

        return res.status(200).json({

            success: true,

            data: student

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};



// ==========================================
// Update Student
// ==========================================
export const updateStudent = async (req, res) => {

    try {

        const { id } = req.params;

        const student = await updateStudentService(
            id,
            req.body,
            {
              returnDocument: "after"
             }
        );

        return res.status(200).json({

            success: true,

            message: "Student updated successfully.",

            data: student

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};



// ==========================================
// Delete Student
// ==========================================
export const deleteStudent = async (req, res) => {

    try {

        const { id } = req.params;

        await deleteStudentService(id);

        return res.status(200).json({

            success: true,

            message: "Student deleted successfully."

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};