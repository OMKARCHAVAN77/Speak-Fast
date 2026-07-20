// const mongoose = require('mongoose');
// require('dotenv').config();
// const Admin = require('./modules/admin/admin.model');

// mongoose.connect(process.env.MONGO_URI)
//   .then(async () => {
//     const result = await Admin.deleteMany({});
//     console.log('Deleted:', result);
//     mongoose.disconnect();
//   })
//   .catch((err) => console.log('Error:', err));

const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const mongoose = require("mongoose");
const Admin = require("./modules/admin/admin.model");

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const result = await Admin.deleteMany({});
    console.log("Deleted:", result);
    mongoose.disconnect();
  })
  .catch((err) => console.log("Error:", err));