import {

    registerAndBookService

} from "./booking.service.js";



// ===================================
// Register Student + Booking
// ===================================

export const registerAndBook = async (

    req,

    res

) => {

    try {

        const booking = await registerAndBookService(

            req.body

        );

        return res.status(201).json({

            success: true,

            message: "Student Registered & Slot Booked Successfully",

            data: booking

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};