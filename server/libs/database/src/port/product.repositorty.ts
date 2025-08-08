import { DeepPartial, FindOptionsRelations, FindOptionsWhere } from "typeorm";
import { ProductEntity } from "../models/product.entity";

export interface ProductRepository {
  get(
    where?: FindOptionsWhere<ProductEntity> | FindOptionsWhere<ProductEntity>[],
    relations?: FindOptionsRelations<ProductEntity>,
    skip?: number,
    take?: number,
  ): Promise<ProductEntity[]>;

  findById(id: string): Promise<ProductEntity>;

  count(
    where?: FindOptionsWhere<ProductEntity> | FindOptionsWhere<ProductEntity>[],
  ): Promise<number>;

  create(data: DeepPartial<ProductEntity>): Promise<ProductEntity>;

  update(id: string, data: DeepPartial<ProductEntity>): Promise<ProductEntity>;

  delete(id: string): Promise<boolean>;
}

export const ProductRepositoryType = Symbol.for("ProductRepositoryType");
