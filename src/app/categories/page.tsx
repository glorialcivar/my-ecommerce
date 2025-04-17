import { Metadata } from "next";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import type { Database } from "@/types/database.types";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse our product categories",
};

type Category = Database["public"]["Tables"]["categories"]["Row"];

export default async function CategoriesPage() {
  const supabase = await createServerSupabaseClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          Error loading categories. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories?.map((category: Category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="block p-6 border rounded-lg hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            {category.description && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {category.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
