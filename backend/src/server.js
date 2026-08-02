import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
// import whatsappRoutes from "./modules/whatsapp/whatsapp.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// ===================================
// Connect Database
// ===================================

connectDB();

// ===================================
// Start Server
// ===================================

app.listen(PORT, () => {

  console.log("==================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment : ${process.env.NODE_ENV}`);
  console.log("==================================");

});