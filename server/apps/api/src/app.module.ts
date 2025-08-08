import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "database/database";
import MinioController from "./controllers/minio.controller";
import ProductController from "./controllers/product.controller";
import { UseCaseModule } from "./use-cases/use-case.module";

const controllers = [ProductController, MinioController];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UseCaseModule,
  ],
  controllers: controllers,
  providers: [],
  exports: [],
})
export class AppModule {}
