import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { ProductEntity } from "../models/product.entity";
import { ProductRepository } from "../port/product.repositorty";

export class ProductAdapter implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  /**
   * Retrieves products from the repository with optional filters.
   */
  get(
    where?: FindOptionsWhere<ProductEntity> | FindOptionsWhere<ProductEntity>[],
    relations?: FindOptionsRelations<ProductEntity>,
    skip?: number,
    take?: number,
  ): Promise<ProductEntity[]> {
    return this.repository.find({
      where,
      relations,
      skip,
      take,
    });
  }

  /**
   * Returns number of products from the repository
   */
  count(
    where?: FindOptionsWhere<ProductEntity> | FindOptionsWhere<ProductEntity>[],
  ): Promise<number> {
    return this.repository.count({
      where,
    });
  }
}
