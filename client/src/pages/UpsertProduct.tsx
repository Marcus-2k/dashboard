import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SaveIcon from "@mui/icons-material/Save";
import { Button, CircularProgress, IconButton } from "@mui/material";
import {
  MinioApi,
  ProductApi,
  type CreateProductRequest,
  type UpdateProductRequest,
} from "@shared/api";
import { S3_BUCKET_NAME } from "@shared/constants";
import { UploadStatusEnum } from "@shared/enums";
import { MinioBucketService } from "@shared/services";
import { Input, ProgressCard } from "@shared/ui";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

interface FormProduct {
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  category: string;
  images: string[];
}

const minioApi = new MinioApi();
const productApi = new ProductApi();

export function UpsertProduct() {
  console.log("init component");

  const params = useParams();
  const isUpdate = !!params.id;

  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isFormInit, setIsFormInit] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormProduct>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discountPrice: null,
      category: "",
      images: [],
    },
    mode: "onChange",
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
    if (isInit) {
      return;
    }

    initForm();

    setIsInit(true);

    return () => {};
  }, []);

  async function initForm(): Promise<void> {
    if (isUpdate && params.id) {
      console.log("Loading product with ID:", params.id);

      const response = await productApi.productControllerGetProductById({
        id: params.id,
      });

      setValue("name", response.name);
      setValue("description", response.description);
      setValue("price", response.price);
      setValue("discountPrice", response.discountPrice);
      setValue("images", response.images);

      setIsFormInit(true);
    }
  }

  async function onSubmit(formData: FormProduct): Promise<void> {
    setIsLoading(true);

    try {
      const requestData: CreateProductRequest | UpdateProductRequest = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        discountPrice: formData.discountPrice,
        images: formData.images,
      };

      if (isUpdate && params.id) {
        await productApi.productControllerUpdateProductById({
          id: params.id,
          updateProductRequest: requestData,
        });
      } else {
        const response = await productApi.productControllerCreateProduct({
          createProductRequest: requestData,
        });

        if (response.id) {
          navigate("../update/" + response.id, {
            relative: "path",
          });
        }
      }
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];

        await eventProcessFile(file);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  async function eventProcessFile(file: File): Promise<void> {
    try {
      const data = await minioApi.minioControllerGetPresignedUrl({
        bucket: S3_BUCKET_NAME,
        key: file.name,
      });

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
    MinioBucketService.uploadToBucket(file, url, (event) => {
      setUploadProgress((prev) => {
        const updated = { ...prev };

        updated[id].progress = event;
        updated[id].status =
          event === 100 ? UploadStatusEnum.SUCCESS : UploadStatusEnum.PROGRESS;

        if (event === 100) {
          const images = getValues("images").filter(
            (image) => image !== updated[id].url
          );
          images.push(updated[id].url);
          setValue("images", images);
        }

        return updated;
      });
    });
  }

  function removeImage(fileName: string, url: string): void {
    setUploadProgress((prev) => {
      const newProgress = { ...prev };

      delete newProgress[fileName];

      return newProgress;
    });

    const images = getValues("images").filter((image) => image !== url);
    setValue("images", images);
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
        onSubmit={handleSubmit(onSubmit)}
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
        {isFormInit && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

            <div>
              <div className="mt-4">
                <Input
                  label="Product Name"
                  placeholder="Enter product name..."
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </div>

              <div className="mt-4">
                <Input
                  label="Description"
                  placeholder="Enter product description..."
                  {...register("description", {
                    required: "Product description is required",
                    maxLength: {
                      value: 256,
                      message:
                        "Product description cannot exceed 256 characters",
                    },
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  multiline={true}
                />
              </div>

              <div className="mt-4">
                <Input
                  label="Price"
                  placeholder="0.00"
                  type="number"
                  {...register("price", {
                    required: "Product price is required",
                    min: {
                      value: 0.0,
                      message: "Product price must be greater than 0",
                    },
                    valueAsNumber: true,
                  })}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button variant="contained" type="submit" color="success">
            {isLoading ? (
              <>
                <CircularProgress size={16} color="inherit" />
                <span className="ml-2">Saving...</span>
              </>
            ) : (
              <>
                <SaveIcon />
                {isUpdate ? "Update Product" : "Create Product"}
              </>
            )}
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
