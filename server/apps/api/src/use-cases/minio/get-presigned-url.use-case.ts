import { GetPresignedUrlRequest, GetPresignedUrlResponse } from "@dto/minio";
import { Injectable } from "@nestjs/common";
import { UseCase } from "@shared/class/use-case";
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
