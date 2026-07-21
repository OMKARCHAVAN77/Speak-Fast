import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./modules/admin/admin.model.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    // Check if an admin already exists
    const existingAdmin = await Admin.findOne();

    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      await mongoose.disconnect();
      return;
    }

    // Create the admin
    const admin = new Admin({
      email: "morbalegajanan6990@gmail.com",
      password: "admin123",
    });

    await admin.save();

    console.log("Admin created successfully:", admin.email);

    await mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error:", err);
  });