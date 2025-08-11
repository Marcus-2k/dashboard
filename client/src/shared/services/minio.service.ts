export class MinioBucketService {
  static async uploadToBucket(
    file: File,
    url: string,
    onProgress: (event: number) => void,
    // onError: () => void
  ) {
    const xhr = new XMLHttpRequest();

    // Progress event
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);

        if (progress < 100) {
          onProgress(progress);
        }
      }
    });

    // Load event (upload complete)
    xhr.addEventListener("loadend", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
      } else {
        console.error(`Upload failed for ${file.name}:`, xhr.statusText);
      }
    });

    // Error event
    xhr.addEventListener("error", () => {
      console.error(`Upload error for ${file.name}:`, xhr.statusText);
      // onError();
    });

    // Abort event
    xhr.addEventListener("abort", () => {
      console.log(`Upload aborted for ${file.name}`);
      // onError();
    });

    // Timeout event
    xhr.addEventListener("timeout", () => {
      console.error(`Upload timeout for ${file.name}`);
      // onError();
    });

    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", file.type);

    // Set longer timeout for slow connections
    xhr.timeout = 300000; // 5 minutes

    xhr.send(file);
  }
}
