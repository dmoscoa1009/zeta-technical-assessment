"use client";
import { useState, useMemo } from "react";
import ProductCard from "@/components/product-card";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category?: { id: string; name: string };
}

export default function ProductGridWithFilters({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category
        ? product.category?.id === category
        : true;
      return matchesName && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <div className="w-full max-w-5xl px-4 flex flex-col items-center">
      {/* Filter Bar */}
      <div className="w-full flex flex-col sm:flex-row gap-4 justify-between items-center mt-8 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg bg-zinc-900 text-white placeholder-zinc-400 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {/* Products Grid */}
      <section className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-zinc-400 py-12">
            No products found.
          </div>
        )}
      </section>
    </div>
  );
}
