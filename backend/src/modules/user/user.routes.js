import express from "express";

import {
  register,
  login,
  checkUserEmailContactExits
} from "./user.controller.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

// check email or contact number is exist or not

router.post("/check-userMailContactExits", checkUserEmailContactExits);

export default router;