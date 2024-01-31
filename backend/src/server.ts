import server from "./app";
import { config } from "./config";
import { Database } from "./config/database";
import { RedisClient } from "./config/redis";

const bootstrap = async () => {
  server.listen(config.app.port, async () => {
    console.log(`Application  listening on port ${config.app.port}`);
    await Database.connect();
    await RedisClient.connect();
  });
};

bootstrap();
