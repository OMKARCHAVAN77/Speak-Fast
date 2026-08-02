import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0], // YYYY-MM-DD
    required: true
  },

    time: {
      type: String,
      required: true,
      trim: true,
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
      unique: true,
      trim: true,
    },

    aadharNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // specialization: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    // qualification: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    // bio: {
    //   type: String,
    //   default: "",
    //   trim: true,
    // },

    photo: {
      type: String,
      default: "",
      trim: true,
    },

    googleMeetLink: {
      type: String,
      default: "",
      trim: true,
    },

    slots: [slotSchema],
  },
  {
    timestamps: true,
  }
);

// Indexes
// teacherSchema.index({ userId: 1 });
// teacherSchema.index({ contactNumber: 1 });
// teacherSchema.index({ aadharNo: 1 });

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;