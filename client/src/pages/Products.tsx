import { Button } from "@mui/material";
import { EmptyState } from "@pages/index";
import { ProductApi, type ProductResponse } from "@shared/api";
import { debounce } from "@shared/functions";
import { CircularProgressBox, Input } from "@shared/ui";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";

const productApi = new ProductApi();

export const Products = () => {
  console.log("producs");

  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";

  const { register, watch } = useForm<{ search: string }>({
    defaultValues: {
      search: initialSearch,
    },
  });

  const searchValue = watch("search");

  const updateSearchParams = useCallback(
    (term: string) => {
      if (term.trim()) {
        setSearchParams({ search: term });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams]
  );

  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (!term.trim()) {
        await initProducts();
        return;
      }

      setIsSearching(true);
      try {
        const response = await productApi.getProducts({
          page: 1,
          pageSize: 10,
          search: term,
        });

        setProducts(response);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (initialSearch) {
      debouncedSearch(initialSearch);
    } else {
      initProducts();
    }
  }, []);

  useEffect(() => {
    setSearchTerm(searchValue);
    updateSearchParams(searchValue);
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch, updateSearchParams]);

  async function initProducts() {
    const response = await productApi.getProducts({
      page: 1,
      pageSize: 10,
    });

    setProducts(response);
  }

  async function deleteProductById(id: string) {
    await productApi.deleteProductById({ id });

    initProducts();
  }

  return (
    <>
      <div className="flex gap-2">
        <Input placeholder="Search products..." {...register("search")} />

        <Button type="submit" variant="contained">
          Search
        </Button>

        <Button type="submit" variant="contained">
          <Link to="/products/new">Create</Link>
        </Button>
      </div>

      {isSearching ? (
        <div className="flex justify-center items-center text-gray-500 p-4">
          <CircularProgressBox size={100} />
        </div>
      ) : (
        <ul className="mt-4 flex gap-2 flex-wrap justify-between">
          {products.length === 0 ? (
            <EmptyState message="No products found" />
          ) : (
            <>
              {products.map((product) => (
                <li key={product.id} className="flex flex-col gap-2 w-48">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-48 w-inherit object-cover rounded-md"
                  />
                  <h2 className="text-lg font-bold line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {product.price}&nbsp;₴
                  </p>
                  <div className="flex gap-2">
                    <Button variant="contained" color="primary">
                      <Link to={`/products/update/${product.id}`}>Update</Link>
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        deleteProductById(product.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </>
  );
};
