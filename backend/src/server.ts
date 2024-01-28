import server from "./app";
import { config } from "./config";
import { Database } from "./config/database";

const bootstrap = async () => {
  server.listen(config.app.port, async () => {
    console.log(`Application  listening on port ${config.app.port}`);
    await Database.connect();
  });
};

bootstrap();
