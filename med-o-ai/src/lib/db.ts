import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function connectDB() {
  if (connection.isConnected) return;

  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI!);
    connection.isConnected = connectionInstance.connections[0].readyState;
  } catch (error) {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  }
}
