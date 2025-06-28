import { useRef, useState } from "react";
import { Button, ProgressCard } from "./components";
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
            <ProgressCard
              key={fileName}
              fileName={fileName}
              progress={progress}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
