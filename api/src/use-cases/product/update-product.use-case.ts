import { IdDto } from "@dto/general";
import { Inject, Injectable } from "@nestjs/common";
import { UpdateProductRequest } from "src/dto/product/request/update-product.request";
import { ProductResponse } from "src/dto/product/response/product.response";
import {
  ProductRepository,
  ProductRepositoryType,
} from "src/modules/database/port/product.repositorty";
import { UseCase } from "src/shared/class/use-case";

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
