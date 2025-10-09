import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("MongoDB connection failed, running in demo mode");
    console.log("To connect to MongoDB, please install MongoDB locally or provide a valid cloud URI");
    // Don't exit the process, allow server to run without DB for demo purposes
  }
};