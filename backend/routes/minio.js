import { Client } from "minio";

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

    const presignedUrl = await minioClient.presignedGetObject(bucket, key);

    console.log(presignedUrl);

    return reply.status(200).send(presignedUrl);
  });
}
