import api from "./api";

export async function fetchProducts() {
  const response = await api.get("/products/get-all-products");
  return response.data;
}

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
