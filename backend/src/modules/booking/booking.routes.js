import express from "express";

import {

    registerAndBook

} from "./booking.controller.js";

const router = express.Router();



// Register + Booking

router.post(

    "/register-book",

    registerAndBook

);

export default router;