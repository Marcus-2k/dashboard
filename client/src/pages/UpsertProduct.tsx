import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SaveIcon from "@mui/icons-material/Save";
import { Button, IconButton } from "@mui/material";
import { S3_BUCKET_NAME } from "@shared/constants";
import { UploadStatusEnum } from "@shared/enums";
import { MinioService } from "@shared/services";
import { Input, ProgressCard } from "@shared/ui";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

export function UpsertProduct() {
  console.log("init component");

  const params = useParams();
  const isUpdate = !!params.id;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Product>({
    name: "warhammer",
    description: "",
    price: 0,
    category: "",
    images: [],
  });
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: {
      status: UploadStatusEnum;
      file: File;
      progress: number;
      url: string;
      s3Url: string;
    };
  }>({});

  useEffect(() => {
    console.log("init effect");

    return () => {
      console.log("destroy component");
    };
  });

  function initForm() {
    if (isUpdate && params.id) {
      console.log("Loading product with ID:", params.id);
    }
  }

  const handleInputChange = (field: keyof Product, value: string | number) => {
    console.log("handleInputChange");

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit");

    // e.preventDefault();
    // setIsLoading(true);

    // try {
    //   const productData = {
    //     ...formData,
    //     images: uploadedImages,
    //   };

    //   if (isUpdate) {
    //     // TODO: Implement ProductService.updateProduct(params.id, productData)
    //     console.log("Updating product:", productData);
    //   } else {
    //     // TODO: Implement ProductService.createProduct(productData)
    //     console.log("Creating product:", productData);
    //   }

    //   // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1000));

    //   // Redirect to products list
    //   window.location.href = "/products";
    // } catch (error) {
    //   console.error("Error saving product:", error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFileChange");

    const files = e.target.files;

    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        console.log("push file");
        await eventProcessFile(file);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  async function eventProcessFile(file: File): Promise<void> {
    console.log("eventProcessFile");

    try {
      const data = await MinioService.getPresignedUrl(
        S3_BUCKET_NAME,
        file.name
      );

      setUploadProgress((prev) => {
        return {
          ...prev,
          [data.id]: {
            status: UploadStatusEnum.PENDING,
            file: file,
            progress: 0,
            url: data.previewUrl,
            s3Url: data.presignedUrl,
          },
        };
      });

      uploadFile(file, data.presignedUrl, data.id);
    } catch (error) {
      console.error("Error processing file:", error);
    }
  }

  async function uploadFile(
    file: File,
    url: string,
    id: string
  ): Promise<void> {
    console.log("uploadFile");

    MinioService.uploadToBucket(file, url, (event) => {
      setUploadProgress((prev) => {
        const updated = { ...prev };

        updated[id].progress = event;
        updated[id].status =
          event === 100 ? UploadStatusEnum.SUCCESS : UploadStatusEnum.PROGRESS;

        if (event === 100) {
          setFormData((prev) => {
            const newImages = prev.images.filter(
              (image) => image !== updated[id].url
            );
            newImages.push(updated[id].url);
            return { ...prev, images: newImages };
          });
        }

        return updated;
      });
    });
  }

  function removeImage(fileName: string, url: string): void {
    console.log("removeImage");
    console.log("file name", fileName);

    setUploadProgress((prev) => {
      const newProgress = { ...prev };

      delete newProgress[fileName];

      return newProgress;
    });

    setFormData((prev) => {
      const newImages = prev.images.filter((image) => image !== url);
      return { ...prev, images: newImages };
    });
  }

  return (
    <>
      <div className="p-10 container mx-auto">
        <h1 className="text-2xl font-bold flex gap-2 items-center">
          <Link to="/products" className="text-blue-500">
            BACK
          </Link>
          <span>-</span>
          <span>{isUpdate ? "Update Product" : "Create Product"}</span>
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-10 container mx-auto max-w-2xl"
      >
        {/* Product Images */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>

          <div>
            <Button
              variant="outlined"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileUploadIcon />
              Upload Images
            </Button>

            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple={true}
            />
          </div>

          {/* Upload Progress */}
          {Object.keys(uploadProgress).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(uploadProgress).map(([key, progress]) => (
                <div
                  key={key}
                  className="w-[calc(50%-4px)] h-[120px] rounded relative"
                >
                  {progress.progress === 100 ? (
                    <>
                      <img
                        src={progress.url}
                        alt={progress.file.name}
                        className="object-cover size-full"
                      />

                      <IconButton
                        style={{ position: "absolute", top: 0, right: 0 }}
                        aria-label="delete"
                        onClick={() => removeImage(key, progress.url)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  ) : (
                    <ProgressCard progress={progress.progress} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          <div>
            <div className="mt-4">
              <Input
                label="Product Name"
                placeholder="Enter product name..."
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="mt-4">
              <Input
                label="Description"
                placeholder="Enter product description..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                multiline={true}
              />
            </div>

            <div className="mt-4">
              <Input
                label="Price"
                placeholder="0.00"
                type="number"
                min={0.0}
                value={formData.price}
                onChange={(e) =>
                  handleInputChange("price", parseFloat(e.target.value) || 0)
                }
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button variant="contained" type="submit" color="success">
            <SaveIcon />
            {isLoading
              ? "Saving..."
              : isUpdate
              ? "Update Product"
              : "Create Product"}
          </Button>

          <Button
            variant="outlined"
            type="button"
            onClick={() => console.log(formData)}
          >
            Show Form State
          </Button>

          <Link to="/products">
            <Button variant="outlined" color="error">
              Cancel
              <CancelIcon />
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
}
