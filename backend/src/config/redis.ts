import { createClient } from "redis";

const client = createClient();

class Redis {
  async connect() {
    try {
      await client.connect();
      console.log("Redis connected successfully");
    } catch (error: any) {
      console.log({
        message: "Redis Client Error",
        error: error.message,
      });
    }
  }
}

export const RedisClient = new Redis();
