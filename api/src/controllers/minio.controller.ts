import { Controller, Get, Query } from "@nestjs/common";
import { GetPresignedUrlRequest } from "src/dto/minio/request/get-presigned-url.request";
import { GetPresignedUrlResponse } from "src/dto/minio/response/get-presigned-url.response";
import { GetPresignedUrlUseCase } from "src/use-cases/minio/get-presigned-url.use-case";

@Controller("minio")
export default class MinioController {
  constructor(
    private readonly getPresignedUrlUseCase: GetPresignedUrlUseCase,
  ) {}

  @Get("get-presigned-url")
  async getPresignedUrl(
    @Query() query: GetPresignedUrlRequest,
  ): Promise<GetPresignedUrlResponse> {
    return this.getPresignedUrlUseCase.execute(query);
  }
}
