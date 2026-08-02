import express from "express";
import cors from "cors";

import userRoutes from "./modules/user/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import studentRoutes from "./modules/student/student.routes.js";
import teacherRoutes from "./modules/teacher/teacher.routes.js";
import bookingRoutes from "./modules/booking/booking.routes.js";

import errorHandler from "./middlewares/error.middleware.js";


const app = express();

// ===================================
// Middlewares
// ===================================

// app.use(cors());
const allowedOrigins = [
  "http://localhost:4200",
  "https://speak-fast.vercel.app",
  process.env.FRONTEND_URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ===================================
// Routes
// ===================================

// User Routes
app.use("/api/user", userRoutes);

// Authentication Routes
app.use("/api/auth", authRoutes);

// Student Routes
app.use("/api/student", studentRoutes);

// Teacher Routes
app.use("/api/teacher", teacherRoutes);

// Booking Routes
app.use("/api/booking", bookingRoutes);

// ===================================
// Global Error Handler (Always Last)
// ===================================

app.use(errorHandler);

export default app;