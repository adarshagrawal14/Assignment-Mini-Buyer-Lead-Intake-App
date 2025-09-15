'use client';

import { useForm, FieldError, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { buyerFormSchema, cityEnum, propertyTypeEnum, bhkEnum, purposeEnum, timelineEnum, sourceEnum } from '@/lib/db/schema';
import { createBuyer } from '@/app/buyers/_actions/buyer-actions';
import { useTransition, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

// Define the type for our form data based on the Zod schema
type BuyerFormData = z.infer<typeof buyerFormSchema>;

// Helper component for form fields with proper TypeScript types
const FormField = ({ name, label, children, error }: {
  name: string;
  label: string;
  children: ReactNode;
  error?: FieldError;
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);


export function BuyerForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<BuyerFormData>({
    resolver: zodResolver(buyerFormSchema),
    // Set default values to prevent uncontrolled component warnings
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      notes: "",
      city: undefined,
      propertyType: undefined,
      bhk: undefined,
      purpose: undefined,
      timeline: undefined,
      source: undefined,
    }
  });

  const propertyType = watch('propertyType');
  const showBhkField = propertyType === 'Apartment' || propertyType === 'Villa';

  // Explicitly type the onSubmit handler for maximum type safety
  const processForm: SubmitHandler<BuyerFormData> = (data) => {
    startTransition(async () => {
      const result = await createBuyer(data);
      if (result?.errors) {
        toast.error(result.message || 'Server validation failed.');
      } else {
        toast.success('Lead created successfully!');
        reset(); // Clear the form on successful submission
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your FormField components go here, no changes needed for them */}
        <FormField name="fullName" label="Full Name" error={errors.fullName}>
          <input id="fullName" {...register('fullName')} className="input-style" />
        </FormField>
        <FormField name="phone" label="Phone Number" error={errors.phone}>
          <input id="phone" type="tel" {...register('phone')} className="input-style" />
        </FormField>
        <FormField name="email" label="Email (Optional)" error={errors.email}>
          <input id="email" type="email" {...register('email')} className="input-style" />
        </FormField>
        <FormField name="city" label="City" error={errors.city}>
          <select id="city" {...register('city', { required: 'Please select a city' })} className="input-style" aria-invalid={!!errors.city}>
            <option value="" disabled>Select City</option>
            {cityEnum.enumValues.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </FormField>
        <FormField name="propertyType" label="Property Type" error={errors.propertyType}>
          <select id="propertyType" {...register('propertyType', { required: 'Please select a property type' })} className="input-style" aria-invalid={!!errors.propertyType}>
            <option value="" disabled>Select Property Type</option>
            {propertyTypeEnum.enumValues.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </FormField>
        {showBhkField && (
          <FormField name="bhk" label="BHK" error={errors.bhk}>
            <select id="bhk" {...register('bhk', { required: 'Please select BHK' })} className="input-style" aria-invalid={!!errors.bhk}>
              <option value="" disabled>Select BHK</option>
              {bhkEnum.enumValues.map(bhk => <option key={bhk} value={bhk}>{bhk}</option>)}
            </select>
          </FormField>
        )}
        <FormField name="purpose" label="Purpose" error={errors.purpose}>
          <select id="purpose" {...register('purpose', { required: 'Please select a purpose' })} className="input-style" aria-invalid={!!errors.purpose}>
            <option value="" disabled>Select Purpose</option>
            {purposeEnum.enumValues.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </FormField>
        <FormField name="timeline" label="Timeline" error={errors.timeline}>
          <select id="timeline" {...register('timeline', { required: 'Please select a timeline' })} className="input-style" aria-invalid={!!errors.timeline}>
            <option value="" disabled>Select Timeline</option>
            {timelineEnum.enumValues.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </FormField>
        <FormField name="budgetMin" label="Min Budget (INR, Optional)" error={errors.budgetMin}>
          <input
            id="budgetMin"
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            placeholder="e.g., 2500000"
            {...register('budgetMin', {
              setValueAs: (v) => {
                if (v === '' || v === null || v === undefined) return undefined;
                const n = Number(v);
                return Number.isFinite(n) ? n : undefined;
              },
            })}
            className="input-style"
          />
        </FormField>
        <FormField name="budgetMax" label="Max Budget (INR, Optional)" error={errors.budgetMax}>
          <input
            id="budgetMax"
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            placeholder="e.g., 5000000"
            {...register('budgetMax', {
              setValueAs: (v) => {
                if (v === '' || v === null || v === undefined) return undefined;
                const n = Number(v);
                return Number.isFinite(n) ? n : undefined;
              },
            })}
            className="input-style"
          />
        </FormField>
        <FormField name="source" label="Lead Source" error={errors.source}>
          <select id="source" {...register('source', { required: 'Please select a source' })} className="input-style" aria-invalid={!!errors.source}>
            <option value="" disabled>Select Source</option>
            {sourceEnum.enumValues.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FormField>
      </div>
      <FormField name="notes" label="Notes (Optional)" error={errors.notes}>
        <textarea id="notes" {...register('notes')} rows={4} className="input-style" />
      </FormField>

      <button type="submit" disabled={isPending} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        {isPending ? 'Submitting...' : 'Create Lead'}
      </button>
    </form>
  );
}