import express from "express";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js";
import teacherRoutes from "./modules/teacher/teacher.routes.js";
import studentRoutes from "./modules/student/student.routes.js";

const app = express();

// Middleware
app.use(express.json());

// Security Middleware
app.use(helmet());

// Enable CORS
app.use( cors({
    origin: "http://localhost:4200",
    credentials: true,
  }));

// Logger
app.use(morgan("dev"));

// Parse JSON
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cookieParser());


app.use(
  session({
    secret: "mySecretKey123",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/teacher", teacherRoutes);

// student
app.use("/api/students", studentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

console.log("hello");

export default app;