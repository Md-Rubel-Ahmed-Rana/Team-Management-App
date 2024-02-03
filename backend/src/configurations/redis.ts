import { createClient } from "redis";
export const redisClient = createClient();

class Redis {
  async connect() {
    try {
      await redisClient.connect();
      console.log("Redis connected successfully");
    } catch (error: any) {
      console.log({
        message: "Redis not connected",
        error: error.message,
      });
    }
  }
}

export const RedisClient = new Redis();
