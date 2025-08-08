import { IdDto } from "@dto/general";
import { ProductResponse, UpdateProductRequest } from "@dto/product";
import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "@shared/class";
import { ProductRepository, ProductRepositoryType } from "database/database";

export interface UpdateProductInput {
  id: IdDto;
  data: UpdateProductRequest;
}

@Injectable()
export class UpdateProductUseCase
  implements UseCase<UpdateProductInput, ProductResponse>
{
  constructor(
    @Inject(ProductRepositoryType)
    private readonly repository: ProductRepository,
  ) {}

  async execute(body: UpdateProductInput): Promise<ProductResponse> {
    const {
      id: { id },
      data,
    } = body;

    const product = await this.repository.update(id, data);

    return product;
  }
}
