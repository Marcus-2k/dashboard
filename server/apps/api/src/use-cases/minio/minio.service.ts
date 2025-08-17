import { GetPresignedUrlRequest } from "@dto/minio";
import { Injectable } from "@nestjs/common";
import { Client } from "minio";
import { v4 } from "uuid";

@Injectable()
export class MinioService {
  private readonly client: Client;

  constructor() {
    // TODO: add minio client
    // this.client = new Client({
    //   endPoint: process.env.MINIO_ENDPOINT!,
    //   port: +process.env.MINIO_PORT!,
    //   useSSL: false,
    //   accessKey: process.env.MINIO_ACCESS_KEY,
    //   secretKey: process.env.MINIO_SECRET_KEY,
    // });
  }

  async getPresignedUrl(body: GetPresignedUrlRequest) {
    const { bucket, key } = body;

    const fileExtension = key.split(".").pop();

    const id = v4();
    const newFileName = `${id}.${fileExtension}`;

    const presignedUrl = await this.client.presignedPutObject(
      bucket,
      newFileName,
      300, // 5 minutes instead of 60 seconds
    );

    return {
      id: id,
      presignedUrl: presignedUrl,
      previewUrl: `${process.env.S3_BUCKET}/${bucket}/${newFileName}`,
    };
  }
}
