import { Navbar } from "@/components/Navbar";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { MapPin, Phone } from "lucide-react";

export default async function StoresPage() {
  const supabase = await createServerSupabaseClient();

  const { data: stores, error } = await supabase
    .from("stores")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching stores:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Stores</h1>

        {stores && stores.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <div key={store.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">{store.name}</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <p className="text-gray-600">{store.address}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <p className="text-gray-600">{store.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              No stores available yet
            </h2>
            <p className="text-gray-600">
              We are expanding! Check back soon for our store locations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
