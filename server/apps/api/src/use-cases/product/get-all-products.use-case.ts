import { PaginationRequest } from "@dto/general";
import { ProductResponse } from "@dto/product";
import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "@shared/class";
import {
  ProductEntity,
  ProductRepository,
  ProductRepositoryType,
} from "database/database";
import { FindOptionsWhere, ILike } from "typeorm";
import { Paginated } from "../../interfaces/paginated.response";

export interface GetAllProductsInput extends PaginationRequest {
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
