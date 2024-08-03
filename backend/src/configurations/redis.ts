import { createClient } from "redis";
import { config } from "./envConfig";

const redisClient = createClient({
  socket: {
    host: config.redis.host,
    port: Number(config.redis.port),
  },
  password: config.redis.password,
});

class RedisWrapper {
  async connect() {
    console.log("Redis database connecting...");
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

export const RedisClient = new RedisWrapper();

export default redisClient;
