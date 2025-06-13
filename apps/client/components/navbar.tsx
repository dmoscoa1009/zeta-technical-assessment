"use client";

import Link from "next/link";
import { ShoppingCart, Menu, LogOut, LayoutDashboard } from "lucide-react";
import { useUserStore } from "@/stores/user-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Navbar() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const cart = [];
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    clearUser();
    setOpen(false);
    window.location.href = "/";
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-6">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-lg font-bold">ARKI</span>
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* Cart Icon with badge */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-white">
                <ShoppingCart className="text-white w-7 h-7" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1.5 py-0.5 font-bold">
                    {cart.length}
                  </span>
                )}
              </Button>
            </div>
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
                    <Link href="/dashboard">
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
