"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                Nestora
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/")
                    ? "border-primary-DEFAULT text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/products")
                    ? "border-primary-DEFAULT text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Products
              </Link>
              <Link
                href="/categories"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/categories")
                    ? "border-primary-DEFAULT text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Categories
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              href="/cart"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>
            {user ? (
              <div className="ml-3 relative flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <User className="h-6 w-6" />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 rounded-full"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="ml-3 relative flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-DEFAULT hover:bg-primary-dark"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
