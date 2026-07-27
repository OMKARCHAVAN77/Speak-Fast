import {
  registerService,
  loginService,
} from "./user.service.js";

export const register = async (req, res) => {
  try {
    const user = await registerService(req.body);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const data = await loginService(
            email,
            password
        );

        res.status(200).json({
            success: true,
            message: "Login Successfully",
            data
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};