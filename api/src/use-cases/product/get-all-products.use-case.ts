import { Inject, Injectable } from "@nestjs/common";
import { ProductResponse } from "src/dto/product/response/product.response";
import { ProductEntity } from "src/modules/database/models/product.entity";
import {
  ProductRepository,
  ProductRepositoryType,
} from "src/modules/database/port/product.repositorty";
import { Pagination } from "src/shared/class/pagination";
import { UseCase } from "src/shared/class/use-case";
import { FindOptionsWhere, ILike, Like } from "typeorm";
import { Paginated } from "../../interfaces/paginated.response";

export interface GetAllProductsInput extends Pagination {
  search: string | null;
}

@Injectable()
export class GetAllProductsUseCase
  implements UseCase<GetAllProductsInput, Paginated<ProductResponse>>
{
  constructor(
    @Inject(ProductRepositoryType)
    private readonly repository: ProductRepository,
  ) {}

  async execute(
    data: GetAllProductsInput,
  ): Promise<Paginated<ProductResponse>> {
    const { search, page, pageSize } = data;

    const skip = (page - 1) * pageSize;

    const where: FindOptionsWhere<ProductEntity> = {
      name: search ? ILike(`%${search}%`) : undefined,
    };

    const total = await this.repository.count(where);

    const totalPages = Math.ceil(total / pageSize);

    if (total === 0) {
      return { items: [], total: 0, totalPages: 0 };
    }

    const raw = await this.repository.get(where, {}, skip, pageSize);

    return { items: raw, total, totalPages };
  }
}
