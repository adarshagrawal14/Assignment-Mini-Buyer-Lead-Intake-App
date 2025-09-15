import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-24 sm:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
              Capture and manage buyer leads with speed and clarity
            </h1>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl">
              Streamline your intake process, keep history, and never lose track of follow-ups.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Link href="/buyers/new" className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">Create Lead</Link>
              <Link href="/buyers" className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100">View Leads</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Fast Intake</h3>
            <p className="mt-2 text-gray-700">Quickly add new leads with validation and helpful defaults.</p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Smart Listing</h3>
            <p className="mt-2 text-gray-700">Filter, sort, and export your lead list with ease.</p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Audit History</h3>
            <p className="mt-2 text-gray-700">Every change is tracked so your team stays aligned.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

