import { fetchProducts } from "@/services/products";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import CreateProductDialog from "@/components/create-product-dialog";
import { fetchCategories } from "@/services/categories";

export default async function AdminProductsPage() {
  const products = await fetchProducts();
  const categories = await fetchCategories();

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <CreateProductDialog categories={categories} />
      </div>
      <div className="bg-zinc-900 rounded-lg shadow p-4">
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
                  <Button variant="outline" size="icon" className="mr-2">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
