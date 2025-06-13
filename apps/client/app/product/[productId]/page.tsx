import { fetchProductById } from "@/services/products";
import Image from "next/image";
import ProductAddToCartBar from "@/components/product-add-to-cart-bar";
import { Product } from "@/types/product";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductPageProps {
  params: { productId: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product: Product | null = await fetchProductById(params.productId);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="relative pb-24">
      <div className="flex flex-col md:flex-row gap-8 w-full h-[75vh] p-8">
        <Link href="/" className="mt-4">
          <Button variant="link">← Back to Home</Button>
        </Link>
        <div className="relative w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-full aspect-[3/4] max-w-[400px] mx-auto">
            <Image
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              fill
              className="rounded-2xl object-cover border-2 border-zinc-800"
              sizes="(max-width: 600px) 100vw, 400px"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            {product.name}
          </h1>
          <div className="text-zinc-400 text-sm mb-2">
            {product.category?.name}
          </div>
          <div className="text-2xl font-bold text-white mb-4">
            ${product.price.toLocaleString()}
          </div>
          <div className="text-zinc-300">{product.description}</div>
        </div>
      </div>
      <ProductAddToCartBar product={product} />
    </div>
  );
}
