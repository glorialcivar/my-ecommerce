import { Navbar } from "@/components/Navbar";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">1800-0223-441</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">contact@nestora.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600">Quito, Ecuador</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">About Nestora</h2>
            <p className="text-gray-600 mb-4">
              Since 1987, Nestora has been your trusted destination for
              handmade, vintage, and artistic goods. Our commitment to quality
              and authenticity has made us a beloved part of the Quito
              community.
            </p>
            <p className="text-gray-600">
              We take pride in offering unique, carefully curated items that
              bring style and character to your life. Our dedicated team is
              always here to assist you with any questions or concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
