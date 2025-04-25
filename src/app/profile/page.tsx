import { Navbar } from "@/components/Navbar";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { User } from "lucide-react";

export default async function ProfilePage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", session.user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center space-x-6 mb-8">
              {profile?.avatar_url ? (
                <div className="relative h-24 w-24">
                  <Image
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
              )}

              <div>
                <h2 className="text-2xl font-semibold">{profile?.full_name}</h2>
                <p className="text-gray-600">{profile?.email}</p>
              </div>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold mb-4">
                Account Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-gray-900">{profile?.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{profile?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-900">
                    {new Date(profile?.created_at || "").toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
