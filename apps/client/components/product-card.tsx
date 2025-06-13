import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    category?: { name: string };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="flex flex-col items-center hover:scale-105 transition-all duration-300 cursor-pointer">
        {/* Card with image covering it */}
        <div className="relative w-full max-w-xs aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
          <Image
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 320px) 100vw, 320px"
          />
        </div>
        {/* Name and Price below the card */}
        <div className="mt-2 w-full max-w-xs flex flex-col items-start">
          <span className="text-zinc-400 text-sm font-medium">
            {product.name}
          </span>
          <span className="text-white text-2xl font-bold">
            $
            {product.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
