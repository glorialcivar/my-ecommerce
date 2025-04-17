import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our e-commerce platform",
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to My E-commerce</h1>
      <p className="text-lg mb-6">
        A simple e-commerce application built with Next.js.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="mb-4">Browse our collection of products.</p>
          <a href="/products" className="text-blue-600 hover:underline">
            View Products →
          </a>
        </div>
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <p className="mb-4">Explore products by category.</p>
          <a href="/categories" className="text-blue-600 hover:underline">
            View Categories →
          </a>
        </div>
      </div>
    </div>
  );
}
