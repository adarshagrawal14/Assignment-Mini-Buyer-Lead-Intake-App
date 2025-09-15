import { db } from '@/lib/db';
import { buyers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

export default async function BuyerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [lead] = await db.select().from(buyers).where(eq(buyers.id, id)).limit(1);

  if (!lead) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Lead not found</h1>
          <p className="text-gray-700 mb-6">The requested lead does not exist.</p>
          <Link href="/buyers" className="text-blue-600 hover:text-blue-700 hover:underline">Back to leads</Link>
        </div>
      </main>
    );
  }

  const format = (num: number | null) => (num == null ? '—' : `₹${(num / 100000).toFixed(1)}L`);

  return (
    <main className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{lead.fullName}</h1>
        <Link href={`/buyers/${lead.id}/edit`} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Edit</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
          <div className="space-y-2 text-gray-900">
            <div><span className="text-gray-700">Phone:</span> {lead.phone}</div>
            <div><span className="text-gray-700">Email:</span> {lead.email || '—'}</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h2>
          <div className="space-y-2 text-gray-900">
            <div><span className="text-gray-700">City:</span> {lead.city}</div>
            <div><span className="text-gray-700">Property:</span> {lead.propertyType} {lead.bhk ? `(${lead.bhk})` : ''}</div>
            <div><span className="text-gray-700">Purpose:</span> {lead.purpose}</div>
            <div><span className="text-gray-700">Budget:</span> {format(lead.budgetMin)} - {format(lead.budgetMax)}</div>
            <div><span className="text-gray-700">Timeline:</span> {lead.timeline}</div>
            <div><span className="text-gray-700">Source:</span> {lead.source}</div>
            <div><span className="text-gray-700">Status:</span> {lead.status}</div>
          </div>
        </div>
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
          <p className="text-gray-900 whitespace-pre-wrap">{lead.notes || '—'}</p>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/buyers" className="text-blue-600 hover:text-blue-700 hover:underline">Back to leads</Link>
      </div>
    </main>
  );
}


