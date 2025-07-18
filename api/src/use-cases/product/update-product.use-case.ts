import { Inject, Injectable } from "@nestjs/common";
import { ProductResponse } from "src/dto/product/response/product.response";
import { ProductEntity } from "src/modules/database/models/product.entity";
import {
  ProductRepository,
  ProductRepositoryType,
} from "src/modules/database/port/product.repositorty";
import { Pagination } from "src/dto/general/request/pagination";
import { UseCase } from "src/shared/class/use-case";
import { FindOptionsWhere, ILike, Like } from "typeorm";
import { Paginated } from "../../interfaces/paginated.response";
import { UpdateProductRequest } from "src/dto/product/request/update-product.request";
import { IdDto } from "src/dto/general/request/id";

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
