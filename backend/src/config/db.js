import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {

    try {

        const connection = await mongoose.connect(env.MONGODB_URI);

        console.log("==================================");
        console.log("✅ MongoDB Connected Successfully");
        console.log(`📍 Host : ${connection.connection.host}`);
        console.log(`📂 Database : ${connection.connection.name}`);
        console.log("==================================");

    } catch (error) {

        console.error("==================================");
        console.error("❌ MongoDB Connection Failed");
        console.error(error.message);
        console.error("==================================");

        process.exit(1);

    }

};

export default connectDB;