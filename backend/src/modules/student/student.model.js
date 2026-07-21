import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      minlength: [3, "First Name must be at least 3 characters"],
      maxlength: [50, "First Name cannot exceed 50 characters"],
    },

    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
      minlength: [2, "Last Name must be at least 2 characters"],
      maxlength: [50, "Last Name cannot exceed 50 characters"],
    },

    contactNumber: {
      type: String,
      required: [true, "Contact Number is required"],
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid Contact Number"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid Email Address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false
    },

    district: {
      type: String,
      required: [true, "District is required"],
      trim: true,
    },

    qualification: {
      type: String,
      required: [true, "Qualification is required"],
      trim: true,
    },

    occupation: {
      type: String,
      required: [true, "Occupation is required"],
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    // forgot password
    passwordResetToken: {
      type: String,
      default: null
    },

    passwordResetTokenExpiry: {
      type: Date,
      default: null
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher"
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;