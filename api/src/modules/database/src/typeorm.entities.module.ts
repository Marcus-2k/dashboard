import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "../models/product.entity";
import { ProductRepositoryType } from "../port/product.repositorty";
import { ProductAdapter } from "../repository/product.repository.adapter";

const entities = [
  {
    provide: ProductRepositoryType,
    useClass: ProductAdapter,
  },
];

export const entitiesForFeature = [ProductEntity];

@Module({
  imports: [TypeOrmModule.forFeature(entitiesForFeature)],
  providers: [...entities],
  exports: [TypeOrmModule.forFeature(entitiesForFeature), ...entities],
})
export class TypeOrmEntities {}
