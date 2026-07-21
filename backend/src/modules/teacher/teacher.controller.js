import {
  registerTeacherService,
  getAllTeachersService,
  setPasswordService,
  loginTeacherService,
  filterTeacherService,
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
      count: result.teachers.length,
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

const setPassword = async (req, res) => {
  try {
    const { email, token, newPassword, confirmPassword } = req.body;

    if (!email || !token || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "email, token, newPassword and confirmPassword are required",
      });
    }

    const result = await setPasswordService(
      email,
      token,
      newPassword,
      confirmPassword
    );

    if (result.error) {
      return res.status(result.status).json({ message: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (err) {
    console.error("SET PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await loginTeacherService(email, password);

    if (result.error) {
      return res.status(result.status).json({ message: result.message });
    }

    req.session.teacher = result.teacher;

    res.status(200).json({
      message: "Login successful",
      teacher: result.teacher,
    });
  } catch (err) {
    console.error("LOGIN TEACHER ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const filterTeachers = async (req, res) => {
  try {
    const { date, time } = req.query;

    const teachers = await filterTeacherService(date, time);

    res.status(200).json({
      count: teachers.length,
      teachers,
    });
  } catch (err) {
    console.error("FILTER TEACHERS ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export {
  registerTeacher,
  getAllTeachers,
  setPassword,
  loginTeacher,
  filterTeachers,
};