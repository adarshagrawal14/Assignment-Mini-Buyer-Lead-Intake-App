import type { buyers } from "@/lib/db/schema";
import Link from "next/link";

// Define the type for the props we expect. 'leads' is an array of buyers.
type Buyer = typeof buyers.$inferSelect;

export function BuyerTable({ leads }: { leads: Buyer[] }) {
  // Function to format the budget nicely
  const formatBudget = (min?: number | null, max?: number | null) => {
    if (!min && !max) return "N/A";
    const format = (num: number) => `₹${(num / 100000).toFixed(1)}L`;
    if (min && max) return `${format(min)} - ${format(max)}`;
    return min ? format(min) : format(max!);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="th-style">Name</th>
            <th className="th-style">Phone</th>
            <th className="th-style">City & Property</th>
            <th className="th-style">Budget</th>
            <th className="th-style">Status</th>
            <th className="th-style">Last Updated</th>
            <th className="th-style text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leads.length === 0 && (
            <tr>
              <td colSpan={7} className="py-8 text-center text-gray-500">
                No leads found.
              </td>
            </tr>
          )}
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="td-style font-medium">
                <Link href={`/buyers/${lead.id}`} className="text-gray-900 hover:text-blue-700 hover:underline">
                  {lead.fullName}
                </Link>
              </td>
              <td className="td-style">{lead.phone}</td>
              <td className="td-style">
                <div className="font-medium text-gray-900">{lead.city}</div>
                <div className="text-xs text-gray-700">{lead.propertyType}</div>
              </td>
              <td className="td-style">{formatBudget(lead.budgetMin, lead.budgetMax)}</td>
              <td className="td-style">
                <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                  {lead.status}
                </span>
              </td>
              <td className="td-style">
                {new Date(lead.updatedAt).toLocaleDateString()}
              </td>
              <td className="td-style text-right">
                <div className="inline-flex gap-3">
                  <Link href={`/buyers/${lead.id}`} className="text-blue-600 hover:text-blue-700 hover:underline">View</Link>
                  <Link href={`/buyers/${lead.id}/edit`} className="text-indigo-600 hover:text-indigo-700 hover:underline">Edit</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

