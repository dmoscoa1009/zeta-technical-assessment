import api from "./api";
import { Product } from "@/types/product";

export interface PaginatedResponse {
  products: Product[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const fetchProducts = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  category?: string
): Promise<PaginatedResponse> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const response = await api.get<PaginatedResponse>(
    `/products/get-all-products?${params.toString()}`
  );
  return response.data;
};

export async function fetchProductById(productId: string) {
  const response = await api.get(`/products/get-product-by-id/${productId}`);
  return response.data;
}

export async function createProduct(formData: any) {
  const response = await api.post("/products/create-product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function updateProduct(productId: string, formData: FormData) {
  const response = await api.put(
    `/products/update-product/${productId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
}

export async function deleteProduct(id: string) {
  const response = await api.delete(`/products/delete-product/${id}`);
  return response.data;
}
