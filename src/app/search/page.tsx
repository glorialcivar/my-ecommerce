import { Navbar } from "@/components/Navbar";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const supabase = await createServerSupabaseClient();
  const query = searchParams.q;

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .textSearch("name", query)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error searching products:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Search Results for &quot;{query}&quot;
        </h1>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="aspect-square relative bg-gray-100" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              No products found
            </h2>
            <p className="text-gray-600">
              Try searching with different keywords or browse our categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
