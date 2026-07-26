import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    date: {
      type: String, // Example: "2026-07-25"
      required: true,
    },

    time: {
      type: String, // Example: "10:00 AM"
      required: true,
    },

    isBooked: {
      type: Boolean,
      default: false,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
  },
  {
    _id: true,
  }
);

const teacherSchema = new mongoose.Schema(
  {
    // Reference to User Collection
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    aadharNo: {
      type: String,
      required: true,
      unique: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    qualification: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
    },

    photo: {
      type: String,
      default: "",
    },

    googleMeetLink: {
      type: String,
      default: "",
    },

    slots: [slotSchema],
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;