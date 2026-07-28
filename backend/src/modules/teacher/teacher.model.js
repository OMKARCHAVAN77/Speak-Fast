import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0], // YYYY-MM-DD
    required: true
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