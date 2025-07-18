import { Inject, Injectable } from "@nestjs/common";
import { CreateProductRequest } from "src/dto/product/request/create-product.request";
import { ProductResponse } from "src/dto/product/response/product.response";
import {
  ProductRepository,
  ProductRepositoryType,
} from "src/modules/database/port/product.repositorty";
import { UseCase } from "src/shared/class/use-case";

@Injectable()
export class CreateProductUseCase
  implements UseCase<CreateProductRequest, ProductResponse>
{
  constructor(
    @Inject(ProductRepositoryType)
    private readonly repository: ProductRepository,
  ) {}

  async execute(data: CreateProductRequest): Promise<ProductResponse> {
    const product = await this.repository.create(data);

    return product;
  }
}
