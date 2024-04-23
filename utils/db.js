import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME,
    });
    isConnected = true;
    console.log("connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
