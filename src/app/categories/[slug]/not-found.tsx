import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
      <p className="text-gray-600 mb-8">
        The category you&apos;re looking for doesn&apos;t exist or has been
        removed.
      </p>
      <Link
        href="/categories"
        className="text-indigo-600 hover:text-indigo-500 font-medium"
      >
        ← Back to Categories
      </Link>
    </div>
  );
}
