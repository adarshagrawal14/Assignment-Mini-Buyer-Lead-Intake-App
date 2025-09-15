import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Buyer Lead Intake App
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          A simple application to capture, list, and manage buyer leads for your real estate business.
        </p>
        <Link href="/buyers">
          <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors duration-300">
            View All Leads
          </button>
        </Link>
      </div>
    </main>
  );
}

