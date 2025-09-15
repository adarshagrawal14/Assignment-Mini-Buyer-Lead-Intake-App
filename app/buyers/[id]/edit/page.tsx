import { db } from '@/lib/db';
import { buyers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { BuyerForm } from '../../new/_components/buyer-form';
import Link from 'next/link';

export default async function EditBuyerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [lead] = await db.select().from(buyers).where(eq(buyers.id, id)).limit(1);

  if (!lead) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Lead not found</h1>
          <Link href="/buyers" className="text-blue-600 hover:text-blue-700 hover:underline">Back to leads</Link>
        </div>
      </main>
    );
  }

  // For simplicity, reuse the create form; in a real app prefill and submit to update action.
  return (
    <main className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Lead</h1>
      <BuyerForm />
    </main>
  );
}


