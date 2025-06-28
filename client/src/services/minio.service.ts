import { API_BASE_URL } from "../constants/api-base-url";

export interface PresignedUrlResponse {
  url: string;
}

export class MinioService {
  static async getPresignedUrl(
    bucket: string,
    key: string
  ): Promise<PresignedUrlResponse> {
    const query = new URLSearchParams({ bucket, key });

    const response = await fetch(
      `${API_BASE_URL}/minio/get-presigned-url?${query.toString()}`,
      {
        method: "GET",
      }
    );

    return await response.json();
  }
}
