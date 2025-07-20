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
import { ApiOkResponse } from "@nestjs/swagger";
import { IdDto } from "src/dto/general/request/id";
import { MessageResponse } from "src/dto/general/response/message.response";
import { CreateProductRequest } from "src/dto/product/request/create-product.request";
import { GetAllProductsRequest } from "src/dto/product/request/get-all-products.request";
import { UpdateProductRequest } from "src/dto/product/request/update-product.request";
import { ProductResponse } from "src/dto/product/response/product.response";
import { CreateProductUseCase } from "src/use-cases/product/create-product.use-case";
import { DeleteProductUseCase } from "src/use-cases/product/delete-product.use-case";
import { GetAllProductsUseCase } from "src/use-cases/product/get-all-products.use-case";
import { GetProductByIdUseCase } from "src/use-cases/product/get-product-by-id.use-case";
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
    @Inject(GetProductByIdUseCase)
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) {}

  @Get()
  async getAllProducts(@Query() query: GetAllProductsRequest) {
    return this.getAllProductsUseCase.execute(query);
  }

  @Get(":id")
  @ApiOkResponse({ type: ProductResponse })
  async getProductById(@Param() param: IdDto): Promise<ProductResponse> {
    return this.getProductByIdUseCase.execute(param);
  }

  @Post()
  @ApiOkResponse({ type: ProductResponse })
  async createProduct(
    @Body() body: CreateProductRequest,
  ): Promise<ProductResponse> {
    return this.createProductUseCase.execute(body);
  }

  @Patch(":id")
  @ApiOkResponse({ type: ProductResponse })
  async updateProductById(
    @Param() param: IdDto,
    @Body() body: UpdateProductRequest,
  ) {
    return this.updateProductUseCase.execute({ id: param, data: body });
  }

  @Delete(":id")
  @ApiOkResponse({ type: MessageResponse })
  async deleteProductById(@Param() param: IdDto): Promise<MessageResponse> {
    return this.deleteProductUseCase.execute(param);
  }
}
