import { Client } from "minio";

export class MinioService {
  static minioClient = null;

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: process.env.MINIO_PORT,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }
}
