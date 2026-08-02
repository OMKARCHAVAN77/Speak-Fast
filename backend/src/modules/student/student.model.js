import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
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

    district: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    occupation: {
      type: String,
      required: true,
      trim: true,
    },

    googleMeetLink: {
      type: String,
      default: "",
      trim: true,
    },

    assignedTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
studentSchema.virtual("bookings", {
    ref: "Booking",
    localField: "_id",
    foreignField: "studentId"
});

// Include virtuals in response
studentSchema.set("toJSON", {
    virtuals: true
});

studentSchema.set("toObject", {
    virtuals: true
});

// Indexes
// studentSchema.index({ userId: 1 });
// studentSchema.index({ contactNumber: 1 });

const Student = mongoose.model("Student", studentSchema);

export default Student;