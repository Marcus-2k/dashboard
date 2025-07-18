import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../modules/database/database.module";
import { CreateProductUseCase } from "./create-product.use-case";
import { DeleteProductUseCase } from "./delete-product.use-case";
import { GetAllProductsUseCase } from "./get-all-products.use-case";
import { UpdateProductUseCase } from "./update-product.use-case";

const useCases = [
  GetAllProductsUseCase,
  DeleteProductUseCase,
  UpdateProductUseCase,
  CreateProductUseCase,
];

@Module({
  imports: [DatabaseModule],
  providers: [...useCases],
  exports: useCases,
})
export class ProductUseCaseModule {}
