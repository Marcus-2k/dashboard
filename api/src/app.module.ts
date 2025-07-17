import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import MinioController from "./controllers/minio.controller";
import ProductController from "./controllers/product.controller";
import { DatabaseModule } from "./modules/database/database.module";

const controllers = [ProductController, MinioController];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: controllers,
  providers: [],
  exports: [],
})
export class AppModule {}
