import { db } from "@/lib/db";
import Link from "next/link";
import { BuyerTable } from "./_components/buyer-table";
import { desc } from "drizzle-orm";
import { buyers } from "@/lib/db/schema";

// This tells Next.js to render this page dynamically on the server at request time.
// It is important for pages that fetch fresh data from a database.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BuyersPage() {
  const leads = await db.query.buyers.findMany({
    orderBy: [desc(buyers.updatedAt)],
    limit: 50,
  });

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Buyer Leads</h1>
          <p className="text-gray-700">Manage and track your latest buyer inquiries.</p>
        </div>
        <Link href="/buyers/new" className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Create New Lead
        </Link>
      </div>
      <BuyerTable leads={leads} />
    </main>
  );
}

