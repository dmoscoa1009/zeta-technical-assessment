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
import type { Product } from "@/types/product";
import { Category } from "@/types/category";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductGridWithFiltersProps {
  products: Product[];
  categories: Category[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export default function ProductGridWithFilters({
  products,
  categories,
  pagination,
}: ProductGridWithFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    params.set("page", "1"); // Reset to first page on new search
    router.push(`?${params.toString()}`);
  };

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    params.set("page", "1"); // Reset to first page on category change
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search products..."
          className="max-w-sm"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("search") || ""}
        />
        <Select
          onValueChange={handleCategoryChange}
          defaultValue={searchParams.get("category") || "all"}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-zinc-400">
          Showing {products.length} of {pagination.total} products
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={!pagination.hasPrevPage}
            onClick={() => {
              if (pagination.hasPrevPage) {
                handlePageChange(pagination.currentPage - 1);
              }
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            disabled={!pagination.hasNextPage}
            onClick={() => {
              if (pagination.hasNextPage) {
                handlePageChange(pagination.currentPage + 1);
              }
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
