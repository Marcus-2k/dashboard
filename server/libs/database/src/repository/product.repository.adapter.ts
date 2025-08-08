import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DeepPartial,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from "typeorm";
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

  async findById(id: string): Promise<ProductEntity> {
    const product = await this.repository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return product;
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

  create(data: DeepPartial<ProductEntity>): Promise<ProductEntity> {
    return this.repository.create(data).save();
  }

  update(id: string, data: ProductEntity): Promise<ProductEntity> {
    return this.repository.save({ ...data, id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);

    return result.affected && result.affected > 0 ? true : false;
  }
}
