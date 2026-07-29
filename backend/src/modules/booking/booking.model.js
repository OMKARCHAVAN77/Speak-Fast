import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    courseName: {
      type: String,
      required: true,
      trim: true,
    },

    coursePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Booked", "Completed", "Cancelled"],
      default: "Booked",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
bookingSchema.index({ studentId: 1 });
bookingSchema.index({ teacherId: 1 });
bookingSchema.index({ slotId: 1 });
bookingSchema.index({ status: 1 });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;