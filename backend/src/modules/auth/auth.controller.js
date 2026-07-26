
import { setPasswordService, forgotPasswordService , resetPasswordService} from "./auth.service.js";



// teacher set password controller
export const setPassword = async (req, res) => {

  try {
    const token = req.params.token;
    const { password } = req.body;

    const result = await setPasswordService(token, password);

    return res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};


// student forgot password controller

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await forgotPasswordService(email);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// student reset password controller

export const resetPasswordController = async (req, res) => {
  try {

    const { token } = req.params;

    const { password } = req.body;

    const result = await resetPasswordService(
      token,
      password
    );

    return res.status(200).json(result);

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};



