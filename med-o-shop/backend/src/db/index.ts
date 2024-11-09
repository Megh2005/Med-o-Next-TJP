import mongoose from "mongoose";
import { MONGO_DB_NAME } from "../utils/constants";

async function connectDB(): Promise<void> {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${MONGO_DB_NAME}`
    );

    if (connectionInstance) {
      console.log("Connection to Database succeded");
    }
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error}`);
    process.exit(1);
  }
}

export default connectDB;
