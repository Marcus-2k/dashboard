import { useRef, useState } from "react";
import Button from "./components/Button";
import { MinioService } from "./services/minio.service";

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      for (const file of files) {
        eventProcessFile(file);
      }
    }
  };

  async function eventProcessFile(file: File) {
    MinioService.getPresignedUrl("storage", file.name).then((data) => {
      uploadFile(file, data.url);
    });
  }

  async function uploadFile(file: File, url: string) {
    MinioService.uploadToBucker(file, url, (event) => {
      setUploadProgress((prev) => ({ ...prev, [file.name]: event }));
    });
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
