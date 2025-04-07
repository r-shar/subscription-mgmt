import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../env.js";

if (!DB_URI) {
    throw new Error("DB_URI env is not defined");
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("MongoDB connected successfully in ", NODE_ENV, "mode");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
