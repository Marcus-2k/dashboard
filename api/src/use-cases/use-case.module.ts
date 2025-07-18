import { Module } from "@nestjs/common";
import { ProductUseCaseModule } from "./product/product-use-case.module";

const modules = [ProductUseCaseModule];

@Module({
  imports: modules,
  exports: modules,
})
export class UseCaseModule {}
