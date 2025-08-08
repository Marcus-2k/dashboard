import { IdDto, MessageResponse } from "@dto/general";
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
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
// import { Client, } from "@notionhq/client";
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetAllProductsUseCase,
  GetProductByIdUseCase,
  UpdateProductUseCase,
} from "@use-cases/product";
import { CreateProductRequest } from "src/dto/product/request/create-product.request";
import { GetAllProductsRequest } from "src/dto/product/request/get-all-products.request";
import { UpdateProductRequest } from "src/dto/product/request/update-product.request";
import { ProductResponse } from "src/dto/product/response/product.response";

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
  ) {
    // this.invitePeopleToMyNotionPage();
  }

  // private async invitePeopleToMyNotionPage() {
  //   const notion = new Client({ auth: process.env.NOTION_API_KEY });

  //   console.log(notion);

  //   console.log("me", await notion.users.me({}));
  //   console.log("list", await notion.users.list({}));
  //   try {
  //     const result = await notion.pages.update({
  //       page_id: "My-Namespace-2465c065ab8a80faadbcf46f54d80272",
  //     });
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  @Get()
  @ApiOperation({
    operationId: "getProducts",
    description: "Get products with pagination",
  })
  @ApiOkResponse({ type: ProductResponse, isArray: true })
  async getProducts(
    @Query() query: GetAllProductsRequest,
  ): Promise<ProductResponse[]> {
    const response = await this.getAllProductsUseCase.execute(query);

    return response.items;
  }

  @Get(":id")
  @ApiOperation({
    operationId: "getProductById",
    description: "Get a product by id",
  })
  @ApiOkResponse({ type: ProductResponse })
  async getProductById(@Param() param: IdDto): Promise<ProductResponse> {
    return this.getProductByIdUseCase.execute(param);
  }

  @Post()
  @ApiOperation({
    operationId: "createProduct",
    description: "Create a product",
  })
  @ApiOkResponse({ type: ProductResponse })
  async createProduct(
    @Body() body: CreateProductRequest,
  ): Promise<ProductResponse> {
    return this.createProductUseCase.execute(body);
  }

  @Patch(":id")
  @ApiOperation({
    operationId: "updateProductById",
    description: "Update a product by id",
  })
  @ApiOkResponse({ type: ProductResponse })
  async updateProductById(
    @Param() param: IdDto,
    @Body() body: UpdateProductRequest,
  ) {
    return this.updateProductUseCase.execute({ id: param, data: body });
  }

  @Delete(":id")
  @ApiOperation({
    operationId: "deleteProductById",
    description: "Delete a product by id",
  })
  @ApiOkResponse({ type: MessageResponse })
  async deleteProductById(@Param() param: IdDto): Promise<MessageResponse> {
    return this.deleteProductUseCase.execute(param);
  }
}
