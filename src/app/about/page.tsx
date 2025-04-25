import { Navbar } from "@/components/Navbar";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            About Nestora
          </h1>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64 md:h-96">
              <Image
                src="/about-banner.jpg"
                alt="Nestora store front"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Since 1987, Nestora has been at the heart of Quito&apos;s
                  artisanal community, serving as a cherished marketplace for
                  handmade, vintage, and artistic goods. What began as a small
                  family-owned shop has blossomed into a beloved destination for
                  those seeking unique, carefully curated items that tell a
                  story.
                </p>

                <p>
                  Our commitment to quality and authenticity has remained
                  unwavering throughout our journey. We take pride in supporting
                  local artisans and craftspeople, helping to preserve
                  traditional techniques while embracing contemporary
                  creativity.
                </p>

                <p>
                  Today, Nestora continues to be a trusted source for
                  distinctive pieces that bring character and warmth to homes
                  across Ecuador. Our dedicated team works tirelessly to
                  maintain the cozy, stylish, and trustworthy atmosphere that
                  has become our hallmark.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
                <p className="text-gray-600">
                  Experience the magic of Nestora in person. Our doors are
                  always open to those who appreciate the beauty of handcrafted
                  goods and the stories they tell.
                </p>
                <p className="mt-4 text-gray-600">
                  Contact us at 1800-0223-441 or visit one of our locations in
                  Quito.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
