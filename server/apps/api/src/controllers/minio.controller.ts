import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { GetPresignedUrlUseCase } from "@use-cases/minio";
import { GetPresignedUrlRequest } from "src/dto/minio/request/get-presigned-url.request";
import { GetPresignedUrlResponse } from "src/dto/minio/response/get-presigned-url.response";

@Controller("minio")
export default class MinioController {
  constructor(
    private readonly getPresignedUrlUseCase: GetPresignedUrlUseCase,
  ) {}

  @Get("get-presigned-url")
  @ApiOkResponse({ type: GetPresignedUrlResponse })
  async getPresignedUrl(
    @Query() query: GetPresignedUrlRequest,
  ): Promise<GetPresignedUrlResponse> {
    return this.getPresignedUrlUseCase.execute(query);
  }
}
