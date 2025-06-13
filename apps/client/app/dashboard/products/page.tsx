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
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await fetchProducts();
  const categories = await fetchCategories();

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <ProductDialog categories={categories} />
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
      <div className="flex justify-end mt-4">
        <Link href="/">
          <Button variant="link">← Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
