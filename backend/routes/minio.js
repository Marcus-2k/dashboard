import { Client } from "minio";
import { v4 } from "uuid";

export async function minioRoutes(app) {
  app.get("/minio/get-presigned-url", async function handler(request, reply) {
    const minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: process.env.MINIO_PORT,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });

    const { bucket, key } = request.query;

    const fileExtension = key.split(".").pop();

    const id = v4();
    const newFileName = `${id}.${fileExtension}`;

    const presignedUrl = await minioClient.presignedPutObject(
      bucket,
      newFileName,
      300 // 5 minutes instead of 60 seconds
    );

    return reply.status(200).send({
      id: id,
      presignedUrl: presignedUrl,
      previewUrl: `${process.env.S3_BUCKET}/${bucket}/${newFileName}`,
    });
  });
}
