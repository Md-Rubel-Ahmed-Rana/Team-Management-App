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

mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully')
})
mongoose.connection.on('reconnected', () => {
  console.log('Mongo has reconnected')
})
mongoose.connection.on('error', error => {
  console.log('Mongo connection has an error', error)
  mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})

export const Database = new DB();
