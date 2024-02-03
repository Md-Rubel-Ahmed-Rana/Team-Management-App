import server from "./app";
import { config } from "./configurations/envConfig";
import { Database } from "./configurations/database";
import { RedisClient } from "./configurations/redis";

const bootstrap = async () => {
  server.listen(config.app.port, async () => {
    console.log(`Application  listening on port ${config.app.port}`);
    await Database.connect();
    await RedisClient.connect();
  });
};

bootstrap();
