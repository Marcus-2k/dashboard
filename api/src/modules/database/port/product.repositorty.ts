import { FindOptionsRelations, FindOptionsWhere } from "typeorm";
import { ProductEntity } from "../models/product.entity";

export interface ProductRepository {
  get(
    where?: FindOptionsWhere<ProductEntity> | FindOptionsWhere<ProductEntity>[],
    relations?: FindOptionsRelations<ProductEntity>,
    skip?: number,
    take?: number,
  ): Promise<ProductEntity[]>;

  count(
    where?: FindOptionsWhere<ProductEntity> | FindOptionsWhere<ProductEntity>[],
  ): Promise<number>;
}

export const ProductRepositoryType = Symbol.for("ProductRepositoryType");
