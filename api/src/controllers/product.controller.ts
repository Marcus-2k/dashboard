import { Controller, Get, Inject, Query } from "@nestjs/common";
import { GetAllProductsRequest } from "src/dto/product/request/get-all-products.request";
import { GetAllProductsUseCase } from "src/use-cases/product/get-all-products.use-case";

@Controller("product")
export default class ProductController {
  constructor(
    @Inject(GetAllProductsUseCase)
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
  ) {}

  @Get()
  async getAllProducts(@Query() query: GetAllProductsRequest) {
    return this.getAllProductsUseCase.execute(query);
  }
}
