import api from "./api";

export async function fetchProducts() {
  const response = await api.get("/products/get-all-products");
  return response.data;
}

export async function fetchProductById(productId: string) {
  const response = await api.get(`/products/get-product-by-id/${productId}`);
  return response.data;
}
