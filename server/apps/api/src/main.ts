import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as dotenv from "dotenv";
import { initApi, initDocs } from "./app.initializer";
import { AppModule } from "./app.module";

dotenv.config();

async function bootstrap() {
  const PORT = process.env.PORT ?? 3000;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  initApi(app);
  initDocs(app);

  await app.listen(PORT, () => {
    Logger.log(`Server is running on port ${PORT}`, "Bootstrap");
  });
}

bootstrap();
