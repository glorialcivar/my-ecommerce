"use client";

import Link from "next/link";
import { Package, Grid, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Welcome to Nestora
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover our amazing products and exclusive deals
            </p>
          </div>
        </div>
      </div>

      {/* Featured Sections */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Categories */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Categories
              </h2>
              <Grid className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-2">
              {["Electronics", "Clothing", "Books", "Home & Garden"].map(
                (category) => (
                  <Link
                    key={category}
                    href={`/categories/${category.toLowerCase()}`}
                    className="block rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                  >
                    {category}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* New Arrivals */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                New Arrivals
              </h2>
              <Package className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                { name: "Wireless Earbuds", price: "$99.99" },
                { name: "Smart Watch", price: "$199.99" },
                { name: "Laptop Stand", price: "$29.99" },
              ].map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <span className="text-gray-700">{product.name}</span>
                  <span className="font-medium text-gray-900">
                    {product.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Trending</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                { name: "Gaming Mouse", price: "$79.99", trend: "+15%" },
                {
                  name: "Mechanical Keyboard",
                  price: "$149.99",
                  trend: "+12%",
                },
                { name: "4K Monitor", price: "$399.99", trend: "+8%" },
              ].map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div>
                    <div className="text-gray-700">{product.name}</div>
                    <div className="text-sm text-green-600">
                      {product.trend}
                    </div>
                  </div>
                  <span className="font-medium text-gray-900">
                    {product.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
