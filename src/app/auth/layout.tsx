// import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center">
                  {/* <div className="relative w-10 h-10">
                    <Image
                      src="https://i.ibb.co/WNZVfp0z/logo-2.png"
                      alt="Nestora Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div> */}
                  <span className="ml-2 text-xl font-bold text-primary">
                    Nestora
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}
