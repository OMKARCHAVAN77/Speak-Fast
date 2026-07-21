import {
  registerTeacherService,
  getAllTeachersService,
} from "./teacher.service.js";

const registerTeacher = async (req, res) => {
  try {
    const photoFile =
      req.files && req.files.length > 0 ? req.files[0] : null;

    const result = await registerTeacherService(req.body, photoFile);

    if (result.error) {
      return res.status(result.status).json({
        message: result.message,
      });
    }

    res.status(201).json({
      message: result.message,
    });
  } catch (err) {
    console.error("REGISTER TEACHER ERROR:", err);

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const result = await getAllTeachersService();

    res.status(200).json({
      teachers: result.teachers,
    });
  } catch (err) {
    console.error("GET ALL TEACHERS ERROR:", err);

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

export {
  registerTeacher,
  getAllTeachers,
};