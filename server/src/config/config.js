import dontenv from "dotenv";

dontenv.config();

export const config = {
  MONGO_URI: process.env.MONGO_URI,
};
