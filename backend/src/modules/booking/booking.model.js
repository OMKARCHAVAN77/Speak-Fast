import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(

    {

        studentId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Student",

            required: true

        },

        teacherId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Teacher",

            required: true

        },

        slotId: {

            type: mongoose.Schema.Types.ObjectId,

            required: true

        },

        courseName: {

            type: String,

            required: true

        },

        coursePrice: {

            type: Number,

            required: true

        },

        status: {

            type: String,

            enum: ["Booked", "Completed", "Cancelled"],

            default: "Booked"

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model("Booking", bookingSchema);