import express from 'express';
import cors from 'cors';
import userRoutes from "./modules/user/user.routes.js";
import teacherRoutes from "./modules/teacher/teacher.routes.js";
import bookingRoutes from "./modules/booking/booking.routes.js";
import studentRoutes from "./modules/student/student.routes.js";
import { register } from 'node:module';
import authRoutes from "./modules/auth/auth.routes.js";
import errorHandler from './middlewares/error.middleware.js';








const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));
app.use(express.json());

// user login and register
app.use("/api/user", userRoutes);


// Auth Routes set teacher password ,forgot student pass , reset student pass
app.use("/api/auth", authRoutes);

// student api
app.use("/api/student", studentRoutes);

// Teacher Routes
app.use("/api/teacher", teacherRoutes);

// Booking routes
app.use("/api/booking",bookingRoutes);



// global error handler (Alway last )
app.use(errorHandler);




export default app;