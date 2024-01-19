import mongoose from "mongoose";
import { config } from "dotenv";
import app from "./app";
config();

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server: any;

async function bootstrap() {
  try {
    server = app.listen(process.env.PORT, async () => {
      console.log(`Application  listening on port ${process.env.PORT}`);
      await mongoose.connect(process.env.DATABASE_URL as string);
      console.log(`🛢 Database is connected successfully`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();
