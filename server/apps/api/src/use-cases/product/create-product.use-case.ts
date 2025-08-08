import { CreateProductRequest, ProductResponse } from "@dto/product";
import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "@shared/class";
import { ProductRepository, ProductRepositoryType } from "database/database";

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
