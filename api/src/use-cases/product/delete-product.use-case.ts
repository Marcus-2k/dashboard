import { Inject, Injectable } from "@nestjs/common";
import { IdDto } from "src/dto/general/request/id";
import { MessageResponse } from "src/dto/general/response/message.response";
import {
  ProductRepository,
  ProductRepositoryType,
} from "src/modules/database/port/product.repositorty";
import { UseCase } from "src/shared/class/use-case";

@Injectable()
export class DeleteProductUseCase implements UseCase<IdDto, MessageResponse> {
  constructor(
    @Inject(ProductRepositoryType)
    private readonly repository: ProductRepository,
  ) {}

  async execute(data: IdDto): Promise<MessageResponse> {
    const { id } = data;

    return this.repository.delete(id);
  }
}
