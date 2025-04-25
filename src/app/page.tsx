import { Navbar } from "@/components/Navbar";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();

  const { data: banners } = await supabase
    .from("banners")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .limit(6);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 py-4">
        {/* Featured Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4 mb-12">
          {/* Mother's Day Banner */}
          <div className="relative rounded-lg overflow-hidden bg-[#f5ebff]">
            <div className="p-8 flex flex-col h-full justify-center max-w-1/2 absolute left-0">
              <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-2 max-w-80">
                Mother&apos;s Day magic
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Affordable gifts for every kind of Mom
              </p>
              <Link
                href="/mothers-day"
                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full w-fit hover:bg-gray-800 transition-colors"
              >
                Perfect presents
              </Link>
            </div>
            {banners && banners[0] && (
              <div className="absolute right-0 top-0 h-full w-1/2 hidden md:block">
                <Image
                  src={banners[0].image_url}
                  alt="Mother's Day"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Book Lovers Section */}
          <div className="relative rounded-lg overflow-hidden w-[400px] h-[400px]">
            <div
              className="p-8 h-full flex flex-col relative z-10"
              style={{
                background: "linear-gradient(#0e0e0e00 48%, #0e0e0eab 100%)",
              }}
            >
              <h2 className="text-2xl font-medium text-white mt-auto">
                Book Lovers Sales
              </h2>
              <Link
                href="/book-sales"
                className="inline-block text-white font-medium hover:underline"
              >
                Shop Now
              </Link>
            </div>
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="https://i.etsystatic.com/ij/c18c3b/6862740827/ij_600x600.6862740827_4wedkiwe.jpg"
                alt="Book Lovers Sale"
                fill
                className="object-cover shadow-inner shadow-black"
                priority
              />
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-8">
            Shop our most popular categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories?.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group"
              >
                <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                  {category.image_url && (
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <h3 className="mt-3 text-sm text-gray-600 text-center group-hover:text-gray-900">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
