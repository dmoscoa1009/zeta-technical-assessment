import { ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-12 py-8">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">ARKI</span>
      </div>
      <div className="flex items-center gap-4">
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
      </div>
    </nav>
  );
}
