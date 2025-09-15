import { BuyerForm } from './_components/buyer-form';

export default function NewBuyerPage() {
  return (
    <main className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Create New Buyer Lead</h1>
        <p className="mt-2 text-lg text-gray-900">Fill in the details below to add a new lead.</p>
      </div>
      <BuyerForm />
    </main>
  );
}