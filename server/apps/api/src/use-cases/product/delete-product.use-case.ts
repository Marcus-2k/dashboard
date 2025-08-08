import { IdDto, MessageResponse } from "@dto/general";
import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "@shared/class";
import { ProductRepository, ProductRepositoryType } from "database/database";

@Injectable()
export class DeleteProductUseCase implements UseCase<IdDto, MessageResponse> {
  constructor(
    @Inject(ProductRepositoryType)
    private readonly repository: ProductRepository,
  ) {}

  async execute(data: IdDto): Promise<MessageResponse> {
    const { id } = data;

    const result = await this.repository.delete(id);

    return {
      message: result ? "Product deleted successfully" : "Product not found",
      success: result,
    };
  }
}
