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

  static async uploadToBucker(
    file: File,
    url: string,
    onProgress: (event: number) => void
  ) {
    const xhr = new XMLHttpRequest();

    // Progress event
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    });

    // Load event (upload complete)
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
      } else {
        console.error(`Upload failed for ${file.name}:`, xhr.statusText);
      }
    });

    // Error event
    xhr.addEventListener("error", () => {
      console.error(`Upload error for ${file.name}:`, xhr.statusText);
    });

    // Abort event
    xhr.addEventListener("abort", () => {
      console.log(`Upload aborted for ${file.name}`);
    });

    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.send(file);
  }
}
