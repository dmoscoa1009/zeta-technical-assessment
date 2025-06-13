"use client";

import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { useUserStore } from "@/stores/user-store";

export default function Navbar() {
  const user = useUserStore((state) => state.user);
  console.log("🚀 ~ Navbar ~ user:", user);

  return (
    <nav className="w-full flex items-center justify-between px-12 py-8">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">ARKI</span>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* Cart Icon with badge */}
            <div className="relative">
              <ShoppingCart className="text-white w-7 h-7" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1.5 py-0.5 font-bold">
                2
              </span>
            </div>
            {/* Menu Icon */}
            <Menu className="text-white w-7 h-7" />
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
