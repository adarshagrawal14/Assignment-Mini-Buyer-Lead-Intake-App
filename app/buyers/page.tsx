import { db } from "@/lib/db";
import Link from "next/link";
import { BuyerTable } from "./_components/buyer-table";
import { desc } from "drizzle-orm";
import { buyers } from "@/lib/db/schema";

// This is the crucial line that solves the build error.
// It tells Next.js to render this page dynamically on the server at request time.
export const dynamic = 'force-dynamic';

export default async function BuyersPage() {
  const leads = await db.query.buyers.findMany({
    orderBy: [desc(buyers.updatedAt)],
    limit: 10,
  });

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buyer Leads</h1>
          <p className="text-muted-foreground">
            A list of all buyer leads in the system.
          </p>
        </div>
        <Link href="/buyers/new">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Create New Lead
          </button>
        </Link>
      </div>
      <BuyerTable leads={leads} />
    </main>
  );
}

