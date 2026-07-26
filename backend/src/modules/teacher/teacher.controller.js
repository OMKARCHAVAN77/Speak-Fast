import {
  registerTeacherService,getAllTeachersService,getTeacherByIdService,updateTeacherService,deleteTeacherService,
addTeacherSlotService,getTeacherSlotsService ,deleteTeacherSlotService,updateTeacherSlotService ,filterTeachersService} from "./teacher.service.js";


// Register Teacher
export const registerTeacher = async (req, res) => {
  try {

    const result = await registerTeacherService(req.body, req.file);

    return res.status(201).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
        teacher: result.teacher,
      },
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};


// ===================================
// Get All Teachers
// ===================================
export const getAllTeachers = async (req, res) => {

  try {

    const teachers = await getAllTeachersService();

    return res.status(200).json({

      success: true,

      message: "Teachers fetched successfully.",

      total: teachers.length,

      data: teachers

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ========================================
// Get Teacher By Id
// ========================================
export const getTeacherById = async (req, res) => {

  try {

    const { id } = req.params;

    const teacher = await getTeacherByIdService(id);

    return res.status(200).json({
      success: true,
      message: "Teacher fetched successfully.",
      data: teacher,
    });

  } catch (error) {

    return res.status(404).json({
      success: false,
      message: error.message,
    });

  }
};


// Update Teacher

export const updateTeacher = async (req, res) => {

  try {

    const { id } = req.params;

    const teacher = await updateTeacherService(
      id,
      req.body,
      {
            returnDocument: "after"
        }
    );

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully.",
      data: teacher,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};


// Delete Teacher
// ========================================
export const deleteTeacher = async (req, res) => {
  try {

    const { id } = req.params;

    await deleteTeacherService(id);

    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfully."
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};

// =============================================
// Add Multiple Teacher Slots
// =============================================
export const addTeacherSlot = async (req, res) => {

    try {

        const { id } = req.params;

        const slots = await addTeacherSlotService(
            id,
            req.body
        );

        return res.status(201).json({

            success: true,

            message: "Slots added successfully.",

            total: slots.length,

            data: slots

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};


// =============================================
// Get Teacher Slots
// =============================================
export const getTeacherSlots = async (
    req,
    res
) => {

    try {

        const { id } = req.params;

        const { status } = req.query;

        const slots =
            await getTeacherSlotsService(
                id,
                status
            );

        res.status(200).json({

            success: true,

            total: slots.length,

            data: slots

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};


// =============================================
// Delete Teacher Slot
// =============================================
export const deleteTeacherSlot = async (req, res) => {

    try {

        const { slotId } = req.params;

        const slots = await deleteTeacherSlotService(slotId);

        return res.status(200).json({

            success: true,

            message: "Slot deleted successfully.",

            total: slots.length,

            data: slots

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};


// =============================================
// Update Teacher Slot
// =============================================

export const updateTeacherSlot = async (
    req,
    res
)=>{


    try{


        const {
            slotId
        } = req.params;



        const updatedSlot =
        await updateTeacherSlotService(
            slotId,
            req.body,
            {
            returnDocument: "after"
        }
        );



        return res.status(200).json({

            success:true,

            message:
            "Slot updated successfully",

            data:updatedSlot

        });



    }
    catch(error){


        return res.status(400).json({

            success:false,

            message:error.message

        });


    }


};


// =====================================
// Filter Teacher By Date & Time
// =====================================
export const filterTeachers = async (req, res) => {

    try {

        const { date, time } = req.query;

        const teachers = await filterTeachersService(date, time);

        return res.status(200).json({

            success: true,

            total: teachers.length,

            data: teachers

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};
