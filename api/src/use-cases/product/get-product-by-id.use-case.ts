import { Inject, Injectable } from "@nestjs/common";
import { IdDto } from "src/dto/general/request/id";
import { ProductResponse } from "src/dto/product/response/product.response";
import {
  ProductRepository,
  ProductRepositoryType,
} from "src/modules/database/port/product.repositorty";
import { UseCase } from "src/shared/class/use-case";

@Injectable()
export class GetProductByIdUseCase implements UseCase<IdDto, ProductResponse> {
  constructor(
    @Inject(ProductRepositoryType)
    private readonly repository: ProductRepository,
  ) {}

  async execute(data: IdDto): Promise<ProductResponse> {
    const { id } = data;

    return this.repository.findById(id);
  }
}
