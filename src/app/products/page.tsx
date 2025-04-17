import { Metadata } from "next";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import type { Database } from "@/types/database.types";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our collection of products",
};

type Product = Database["public"]["Tables"]["products"]["Row"];

export default async function ProductsPage() {
  const supabase = await createServerSupabaseClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          Error loading products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product: Product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-square relative">
              {/* Add Image component here when we have image URLs */}
              <div className="absolute inset-0 bg-gray-100" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
