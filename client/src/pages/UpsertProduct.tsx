import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ProgressCard } from "../components";
import { MinioService } from "../services/minio.service";

export function UpsertProduct() {
  const params = useParams();

  const isUpdate = !!params.id;

  useEffect(() => {
    if (isUpdate) {
      console.log("update");
    }

    return () => {
      console.log("cleanup");
    };
  }, [isUpdate]);

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
      <div className="p-10 container mx-auto">
        <h1 className="text-2xl font-bold">
          {isUpdate ? "Update Product" : "Create Product"}
        </h1>
      </div>

      <div className="p-10 container mx-auto">
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
      </div>
    </>
  );
}
