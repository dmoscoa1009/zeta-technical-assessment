import { fetchProducts } from "@/services/products";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import ProductDialog from "@/components/create-product-dialog";
import { fetchCategories } from "@/services/categories";
import DeleteProductDialog from "@/components/delete-product-dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
  };
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const { products, pagination } = await fetchProducts(page, limit);
  const categories = await fetchCategories();

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <ProductDialog categories={categories} />
      </div>

      {/* Desktop Table */}
      <div className="bg-zinc-900 rounded-lg shadow p-4 hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative w-16 h-16">
                    <Image
                      src={product.imageUrl || "/placeholder.png"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-md border"
                    />
                  </div>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toLocaleString()}</TableCell>
                <TableCell>{product.category?.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <ProductDialog
                      categories={categories}
                      product={product}
                      editMode
                    />
                    <DeleteProductDialog
                      productId={product.id}
                      productName={product.name}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile List */}
      <div className="block sm:hidden space-y-4">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="flex items-center gap-4 bg-zinc-900 rounded-lg p-3 shadow"
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover rounded-md border"
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold">{product.name}</div>
              <div className="text-zinc-400 text-sm">
                {product.category?.name}
              </div>
              <div className="text-lg font-bold">
                ${product.price.toLocaleString()}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <ProductDialog
                categories={categories}
                product={product}
                editMode
              />
              <DeleteProductDialog
                productId={product.id}
                productName={product.name}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (show on both views) */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-zinc-400">
          Showing {products.length} of {pagination.total} products
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`?page=${pagination.currentPage - 1}&limit=${
              pagination.limit
            }`}
            aria-disabled={!pagination.hasPrevPage}
            tabIndex={pagination.hasPrevPage ? 0 : -1}
            className={`inline-flex items-center justify-center rounded-md border border-input bg-background p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 ${
              !pagination.hasPrevPage ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <span className="text-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Link
            href={`?page=${pagination.currentPage + 1}&limit=${
              pagination.limit
            }`}
            aria-disabled={!pagination.hasNextPage}
            tabIndex={pagination.hasNextPage ? 0 : -1}
            className={`inline-flex items-center justify-center rounded-md border border-input bg-background p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 ${
              !pagination.hasNextPage ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
