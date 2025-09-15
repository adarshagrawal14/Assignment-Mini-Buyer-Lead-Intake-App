import { db } from "@/lib/db";
import Link from "next/link";
import { BuyerTable } from "./_components/buyer-table";
import { desc } from "drizzle-orm";
import { buyers } from "@/lib/db/schema";

// This tells Next.js to render this page dynamically on the server at request time.
// It is important for pages that fetch fresh data from a database.
export const dynamic = 'force-dynamic';

export default async function BuyersPage() {
  // --- TEMPORARY DEBUGGING LOG ---
  // This code will run on your server and print to your local terminal.
  // It helps us verify if the .env file is being loaded correctly.
  console.log("\n--- LOCAL ENV CHECK ---");
  if (process.env.DATABASE_URL) {
    console.log("✅ DATABASE_URL was found by the local server.");
  } else {
    console.log("❌ ERROR: DATABASE_URL IS MISSING or not loaded!");
  }
  console.log("----------------------\n");
  // --- END DEBUGGING LOG ---

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

