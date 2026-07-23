import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
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
  },
  photo: {
    type: String,
  },
  googleMeetLink: {
    type: String,
  },
  slots: [
    {
      date: {
        type: String,
        default: () => new Date().toISOString().split("T")[0]
      },
      time: {
        type: String,
        required: true
      },
      isBooked: {
        type: Boolean,
        default: false
      },
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        default: null
      }
    }
  ],
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "teacher",
  },
  isPasswordSet: {
    type: Boolean,
    default: false,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiry: {
    type: Date,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;