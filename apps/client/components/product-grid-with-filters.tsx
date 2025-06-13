"use client";
import { useState, useMemo } from "react";
import ProductCard from "@/components/product-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [category, setCategory] = useState("__all__");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "__all__" ? true : product.category?.id === category;
      return matchesName && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <div className="w-full max-w-5xl px-4 flex flex-col items-center">
      {/* Filter Bar */}
      <div className="w-full flex flex-col sm:flex-row gap-4 justify-between items-center mt-8 mb-6">
        <Input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-1/4">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
