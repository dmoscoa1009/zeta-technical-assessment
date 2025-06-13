"use client";

import Link from "next/link";
import { Menu, LogOut, LayoutDashboard } from "lucide-react";
import { useUserStore } from "@/stores/user-store";
import CartSheet from "@/components/cart-sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCartStore } from "@/stores/cart-store";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const clearCart = useCartStore((state) => state.clearCart);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    clearUser();
    clearCart();
    setOpen(false);
    router.push("/");
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-6">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-lg font-bold">ARKI</span>
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* CartSheet replaces cart icon */}
            <CartSheet />
            {/* Menu Icon with Popover */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-7 h-7" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56 p-0">
                <div className="px-4 py-3 border-b border-zinc-800 text-sm font-medium text-zinc-300">
                  Hello, {user.name}!
                </div>
                <div className="flex flex-col gap-1 p-2">
                  {user.role === "ADMIN" && (
                    <Link href="/dashboard/products">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-500 hover:text-red-700"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <>
            <Link href="/register">
              <button className="px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 hover:bg-zinc-800 transition">
                Register
              </button>
            </Link>
            <Link href="/login">
              <button className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition">
                Sign In
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
