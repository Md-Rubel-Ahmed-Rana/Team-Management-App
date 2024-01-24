import mongoose from "mongoose";
import { config } from ".";

class DB {
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(config.db.url);
      // set logger to log db connection info
      console.log("Database connected successfully!");
    } catch (error: any) {
      // set logger to log db connection info
      console.log({
        message: "Database not connected!",
        error: error?.message,
      });
    }
  }
}

export const Database = new DB();
