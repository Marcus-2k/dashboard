import { useRef, useState } from "react";
import Button from "./components/Button";
import { MinioService } from "./services/minio.service";

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      for (const file of files) {
        console.log(file);

        eventProcessFile(file);
      }
    }
  };

  async function eventProcessFile(file: File) {
    MinioService.getPresignedUrl("storage", file.name).then((data) => {
      uploadFile(file, data.url);
    });
  }

  function uploadFile(file: File, url: string) {
    setUploading(true);
    setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

    const xhr = new XMLHttpRequest();

    // Progress event
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
      }
    });

    // Load event (upload complete)
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(`Upload completed for ${file.name}`);
        setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
      } else {
        console.error(`Upload failed for ${file.name}:`, xhr.statusText);
      }
      setUploading(false);
    });

    // Error event
    xhr.addEventListener("error", () => {
      console.error(`Upload error for ${file.name}:`, xhr.statusText);
      setUploading(false);
    });

    // Abort event
    xhr.addEventListener("abort", () => {
      console.log(`Upload aborted for ${file.name}`);
      setUploading(false);
    });

    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.send(file);
  }

  return (
    <>
      <Button
        label="Upload File"
        onClick={() => fileInputRef.current?.click()}
      />

      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple={true}
      />

      {Object.keys(uploadProgress).length > 0 && (
        <div className="mt-4 space-y-2">
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="w-full">
              <div className="flex justify-between text-sm mb-1">
                <span>{fileName}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
