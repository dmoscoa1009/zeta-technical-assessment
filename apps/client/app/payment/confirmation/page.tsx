"use client";
import { useEffect } from "react";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentConfirmationPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-md mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg mb-8">
        Thank you for your purchase. Your payment has been processed.
      </p>
      <div className="text-6xl mb-6">🎉</div>
      <Link href="/" className="mt-4">
        <Button variant="link">← Back to Home</Button>
      </Link>
    </div>
  );
}
