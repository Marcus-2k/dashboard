import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../models/product.entity";

const entities = [];

export const entitiesForFeature = [Product];

@Module({
  imports: [TypeOrmModule.forFeature(entitiesForFeature)],
  providers: [...entities],
  exports: [TypeOrmModule.forFeature(entitiesForFeature), ...entities],
})
export class TypeOrmEntities {}
