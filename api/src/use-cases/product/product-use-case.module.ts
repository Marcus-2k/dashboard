import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../modules/database/database.module";
import { GetAllProductsUseCase } from "./get-all-products.use-case";

const useCases = [GetAllProductsUseCase];

@Module({
  imports: [DatabaseModule],
  providers: [...useCases],
  exports: useCases,
})
export class ProductUseCaseModule {}
