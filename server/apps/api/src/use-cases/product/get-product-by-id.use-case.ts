import { IdDto } from "@dto/general";
import { ProductResponse } from "@dto/product";
import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "@shared/class";
import { ProductRepository, ProductRepositoryType } from "database/database";

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
