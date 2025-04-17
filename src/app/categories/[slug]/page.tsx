import { Metadata } from "next";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import type { Database } from "@/types/database.types";
import { notFound } from "next/navigation";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const supabase = await createServerSupabaseClient();

  const { data: category } = await supabase
    .from("categories")
    .select("name, description")
    .eq("slug", params.slug)
    .single();

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: category.name,
    description: category.description || `Browse our ${category.name} products`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const supabase = await createServerSupabaseClient();

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (categoryError || !category) {
    notFound();
  }

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  if (productsError) {
    console.error("Error fetching products:", productsError);
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
      <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
      {category.description && (
        <p className="text-gray-600 mb-8">{category.description}</p>
      )}
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
