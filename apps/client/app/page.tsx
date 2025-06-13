import { fetchProducts } from "@/services/products";
import { fetchCategories } from "@/services/categories";
import ProductGridWithFilters from "@/components/product-grid-with-filters";

export default async function Home() {
  const products = await fetchProducts();
  const categories = await fetchCategories();

  return (
    <main className="min-h-screen text-white flex flex-col items-center">
      <ProductGridWithFilters products={products} categories={categories} />
    </main>
  );
}
