import { db } from "@/lib/db";
import Link from "next/link";
import { BuyerTable } from "./_components/buyer-table";
import { desc } from "drizzle-orm";
import { buyers } from "@/lib/db/schema";

export default async function BuyersPage() {
  // --- TEMPORARY DEBUGGING LOG ---
  // This will print a censored version of the environment variable to the Vercel build logs.
  if (process.env.DATABASE_URL) {
    console.log("VERCEL_DATABASE_URL found.");
    // Replace the password with <password> for security before printing.
    const censoredUrl = process.env.DATABASE_URL.replace(/:[^:]+@/, ":<password>@");
    console.log("Censored URL:", censoredUrl);
  } else {
    console.log("VERCEL_DATABASE_URL IS MISSING or empty");
  }
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

