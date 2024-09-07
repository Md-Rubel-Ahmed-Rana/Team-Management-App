import redisClient from "@/configurations/redis";

class RedisCache {
  async set<T extends object>(
    key: string,
    data: T,
    expireSeconds?: number
  ): Promise<void> {
    const serializedData = JSON.stringify(data);
    const options: { EX?: number } = {};
    if (expireSeconds) {
      options.EX = expireSeconds;
    }
    await redisClient.set(key, serializedData, options);
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await redisClient.get(key);
    if (data) {
      try {
        return JSON.parse(data) as T;
      } catch (error) {
        console.error(`Error parsing JSON for key "${key}":`, error);
        return null;
      }
    }
    return null;
  }

  async delete(key: string): Promise<void> {
    await redisClient.del(key);
  }
}

export const RedisService = new RedisCache();
