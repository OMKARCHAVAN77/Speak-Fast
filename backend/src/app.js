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


// ================= Middleware =================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ================= Security =================

// Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);


// ================= CORS =================

const allowedOrigins = [
  "http://localhost:4200",
  "https://speak-fast.vercel.app"
];


app.use(
  cors({
    origin: function (origin, callback) {

      // allow Postman / server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);


// ================= Logger =================

app.use(morgan("dev"));


// ================= Cookie =================

app.use(cookieParser());


// ================= Session =================

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none"
    }
  })
);


// ================= Routes =================

app.use("/api/auth", authRoutes);

app.use("/api/teacher", teacherRoutes);

app.use("/api/students", studentRoutes);

app.use("/uploads", express.static("uploads"));


// ================= Error Handler =================

app.use((err, req, res, next) => {

  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });

});


console.log("Server middleware loaded");


export default app;