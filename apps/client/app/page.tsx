import { fetchProducts } from "@/services/products";
import { fetchCategories } from "@/services/categories";
import ProductGridWithFilters from "@/components/product-grid-with-filters";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
  };
}

export default async function HomePage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = searchParams.search || "";
  const category = searchParams.category || "";

  const { products, pagination } = await fetchProducts(
    page,
    limit,
    search,
    category
  );
  const categories = await fetchCategories();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <ProductGridWithFilters
        products={products}
        categories={categories}
        pagination={pagination}
      />
    </main>
  );
}
