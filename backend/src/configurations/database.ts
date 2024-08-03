import mongoose from "mongoose";
import { config } from "./envConfig";

class DB {
  public async connect(): Promise<void> {
    try {
      console.log("MongoDB database connecting...");
      await mongoose.connect(config.db.url);
      // set logger to log db connection info
      console.log("Database connected successfully!");
    } catch (error: any) {
      // set logger to log db connection info
      console.log({
        message: "Database was not connected!",
        error: error?.message,
      });
    }
  }
}

mongoose.connection.on("reconnected", () => {
  console.log("MongoDb has reconnected");
});
mongoose.connection.on("error", (error) => {
  console.log("MongoDB connection error", error);
  mongoose.disconnect();
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB is disconnected");
});

export const Database = new DB();
