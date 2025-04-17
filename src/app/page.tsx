import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our e-commerce platform",
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Our E-commerce Platform
        </h1>
        <p className="text-lg mb-4">
          Discover amazing products at great prices.
        </p>
      </div>
    </main>
  );
}
