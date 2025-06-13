"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import Image from "next/image";
import { ShoppingCart, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartSheet() {
  const cart = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handlePay = () => {
    setOpen(false);
    setTimeout(() => {
      router.push("/payment");
    }, 200);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="w-7 h-7" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1.5 py-0.5 font-bold">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full p-4 max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {cart.length === 0 ? (
            <div className="text-center text-zinc-400 mt-8">
              Your cart is empty.
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {cart.map((item) => (
                <li
                  key={item.productId}
                  className="flex gap-4 items-center border-b border-zinc-800 pb-4"
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.imageUrl || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md border"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-zinc-400 text-sm">
                      ${item.price.toLocaleString()} x {item.quantity}
                    </div>
                  </div>
                  <div className="font-bold text-right">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 text-zinc-400 hover:text-red-600"
                    onClick={() => removeFromCart(item.productId)}
                    aria-label="Remove from cart"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-zinc-800 pt-4 mt-4 flex flex-col gap-2">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <Button
            onClick={handlePay}
            className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-bold text-lg"
          >
            Pay
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
