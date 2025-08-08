import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../../../../libs/database/src/database.module";
import { CreateProductUseCase } from "./create-product.use-case";
import { DeleteProductUseCase } from "./delete-product.use-case";
import { GetAllProductsUseCase } from "./get-all-products.use-case";
import { GetProductByIdUseCase } from "./get-product-by-id.use-case";
import { UpdateProductUseCase } from "./update-product.use-case";

const useCases = [
  GetAllProductsUseCase,
  GetProductByIdUseCase,
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
