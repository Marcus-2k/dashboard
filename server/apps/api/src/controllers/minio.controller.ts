import { GetPresignedUrlRequest, GetPresignedUrlResponse } from "@dto/minio";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { GetPresignedUrlUseCase } from "@use-cases/minio";

@Controller("minio")
export default class MinioController {
  constructor(
    private readonly getPresignedUrlUseCase: GetPresignedUrlUseCase,
  ) {}

  @Get("get-presigned-url")
  @ApiOperation({
    operationId: "getPresignedUrl",
    description: "Get a presigned url",
  })
  @ApiOkResponse({ type: GetPresignedUrlResponse })
  async getPresignedUrl(
    @Query() query: GetPresignedUrlRequest,
  ): Promise<GetPresignedUrlResponse> {
    return this.getPresignedUrlUseCase.execute(query);
  }
}
