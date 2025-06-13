"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import type { Product } from "@/types/product";
import { useUserStore } from "@/stores/user-store";

export default function ProductAddToCartBar({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const user = useUserStore((state) => state.user);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-zinc-800 flex items-center justify-end gap-4 px-6 py-4 z-50">
      {user ? (
        <>
          {/* Quantity selector */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </Button>
            <span className="text-lg font-semibold w-8 text-center">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </Button>
          </div>
          {/* Add To Cart button */}
          <Button
            className="text-sm px-8 py-3 bg-red-600 text-white hover:bg-red-700"
            onClick={() =>
              addToCart(
                {
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  imageUrl: product.imageUrl,
                },
                quantity
              )
            }
          >
            Add To Cart
          </Button>
        </>
      ) : (
        <Link href="/login">
          <Button className="text-sm px-8 py-3 bg-red-600 text-white hover:bg-red-700">
            Sign In to Add to Cart
          </Button>
        </Link>
      )}
    </div>
  );
}
