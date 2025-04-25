"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User, LogOut, Search } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (path: string) => pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-white text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Nestora
            </Link>

            <div className="hidden md:flex md:ml-10 space-x-8">
              <Link
                href="/about"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive("/about")
                    ? "text-primary-DEFAULT border-b-2 border-primary-DEFAULT"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                About Us
              </Link>
              <Link
                href="/stores"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive("/stores")
                    ? "text-primary-DEFAULT border-b-2 border-primary-DEFAULT"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Stores
              </Link>
              <Link
                href="/contact"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive("/contact")
                    ? "text-primary-DEFAULT border-b-2 border-primary-DEFAULT"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </form>

            <Link
              href="/cart"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className={`p-2 ${
                    isActive("/profile")
                      ? "text-primary-DEFAULT"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <User className="h-6 w-6" />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={async () => {
                    await signOut();
                    router.push("/auth/sign-in");
                  }}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link
                href="/auth/sign-in"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-DEFAULT hover:bg-primary/90"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
