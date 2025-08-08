import { Module } from "@nestjs/common";
import { MinioUseCaseModule } from "./minio/minio-use-case.module";
import { ProductUseCaseModule } from "./product/product-use-case.module";

const modules = [ProductUseCaseModule, MinioUseCaseModule];

@Module({
  imports: modules,
  exports: modules,
})
export class UseCaseModule {}
