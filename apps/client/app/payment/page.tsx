"use client";
import { useCartStore } from "@/stores/cart-store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PaymentPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cardName.trim()) {
      setError("Please enter the cardholder name.");
      return;
    }
    if (!/^\d{12,19}$/.test(cardNumber.replace(/\s/g, ""))) {
      setError("Please enter a valid card number.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(exp)) {
      setError("Expiration must be in MM/YY format.");
      return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      setError("Please enter a valid CVV.");
      return;
    }
    setError("");
    router.push("/payment/confirmation");
  }

  // Format card number as '1234 5678 9012 3456'
  function formatCardNumber(value: string) {
    return value
      .replace(/[^\d]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  // Format expiration as 'MM/YY'
  function formatExp(value: string) {
    const digits = value.replace(/[^\d]/g, "");
    if (digits.length === 0) return "";
    if (digits.length <= 2) return digits;
    return digits.slice(0, 2) + "/" + digits.slice(2, 4);
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-5xl font-bold mb-6">
        ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardName" className="block mb-1 font-medium">
            Cardholder Name
          </label>
          <Input
            id="cardName"
            type="text"
            autoComplete="cc-name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cardNumber" className="block mb-1 font-medium">
            Card Number
          </label>
          <Input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="**** **** **** ****"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
            required
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="exp" className="block mb-1 font-medium">
              Expiration (MM/YY)
            </label>
            <Input
              id="exp"
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={exp}
              onChange={(e) => setExp(formatExp(e.target.value))}
              maxLength={5}
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block mb-1 font-medium">
              CVV
            </label>
            <Input
              id="cvv"
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="***"
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              maxLength={4}
              required
            />
          </div>
        </div>
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        <Button type="submit" className="w-full">
          Pay ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Button>
      </form>
    </div>
  );
}
