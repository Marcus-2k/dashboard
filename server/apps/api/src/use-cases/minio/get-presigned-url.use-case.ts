import { Injectable } from "@nestjs/common";
import { GetPresignedUrlRequest } from "src/dto/minio/request/get-presigned-url.request";
import { GetPresignedUrlResponse } from "src/dto/minio/response/get-presigned-url.response";
import { UseCase } from "src/shared/class/use-case";
import { MinioService } from "./minio.service";

@Injectable()
export class GetPresignedUrlUseCase
  implements UseCase<GetPresignedUrlRequest, GetPresignedUrlResponse>
{
  constructor(private readonly service: MinioService) {}

  async execute(
    body: GetPresignedUrlRequest,
  ): Promise<GetPresignedUrlResponse> {
    return this.service.getPresignedUrl(body);
  }
}
