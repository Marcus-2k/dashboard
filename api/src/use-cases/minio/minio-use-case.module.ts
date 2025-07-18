import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../modules/database/database.module";
import { GetPresignedUrlUseCase } from "./get-presigned-url.use-case";
import { MinioService } from "./minio.service";

const useCases = [GetPresignedUrlUseCase, MinioService];

@Module({
  imports: [DatabaseModule],
  providers: [...useCases],
  exports: useCases,
})
export class MinioUseCaseModule {}
