import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { IdDto } from "src/dto/general/request/id";
import { CreateProductRequest } from "src/dto/product/request/create-product.request";
import { GetAllProductsRequest } from "src/dto/product/request/get-all-products.request";
import { UpdateProductRequest } from "src/dto/product/request/update-product.request";
import { CreateProductUseCase } from "src/use-cases/product/create-product.use-case";
import { DeleteProductUseCase } from "src/use-cases/product/delete-product.use-case";
import { GetAllProductsUseCase } from "src/use-cases/product/get-all-products.use-case";
import { UpdateProductUseCase } from "src/use-cases/product/update-product.use-case";

@Controller("product")
export default class ProductController {
  constructor(
    @Inject(GetAllProductsUseCase)
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    @Inject(CreateProductUseCase)
    private readonly createProductUseCase: CreateProductUseCase,
    @Inject(UpdateProductUseCase)
    private readonly updateProductUseCase: UpdateProductUseCase,
    @Inject(DeleteProductUseCase)
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Get()
  async getAllProducts(@Query() query: GetAllProductsRequest) {
    return this.getAllProductsUseCase.execute(query);
  }

  @Post()
  async createProduct(@Body() body: CreateProductRequest) {
    return this.createProductUseCase.execute(body);
  }

  @Patch(":id")
  async updateProductById(
    @Param() param: IdDto,
    @Body() body: UpdateProductRequest,
  ) {
    return this.updateProductUseCase.execute({ id: param, data: body });
  }

  @Delete(":id")
  async deleteProductById(@Param() param: IdDto) {
    return this.deleteProductUseCase.execute(param);
  }
}
