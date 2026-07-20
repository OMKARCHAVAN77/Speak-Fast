import {
  loginAdmin,
  logoutAdmin,
  forgotPasswordService,
  resetPasswordService,
} from "../auth/auth.service.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginAdmin(email, password);

    if (result.error) {
      return res.status(result.status).json({
        message: result.message,
      });
    }

    req.session.admin = result.admin;

    res.status(200).json({
      message: "Login successful",
      admin: req.session.admin,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const email = req.session.admin
      ? req.session.admin.email
      : null;

    await logoutAdmin(email);

    req.session.destroy(() => {
      res.status(200).json({
        message: "Logout successful",
      });
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const dashboard = (req, res) => {
  res.status(200).json({
    message: "Welcome to admin dashboard",
    admin: req.session.admin,
  });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await forgotPasswordService(email);

    if (result.error) {
      return res.status(result.status).json({
        message: result.message,
      });
    }

    res.status(200).json({
      message: result.message,
    });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const result = await resetPasswordService(
      email,
      token,
      newPassword
    );

    if (result.error) {
      return res.status(result.status).json({
        message: result.message,
      });
    }

    res.status(200).json({
      message: result.message,
    });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

export {
  login,
  logout,
  dashboard,
  forgotPassword,
  resetPassword,
};