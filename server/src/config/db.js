import { config } from "./config.js";
import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.connect(config.MONGO_URI);
  console.log("connected to database");
};
