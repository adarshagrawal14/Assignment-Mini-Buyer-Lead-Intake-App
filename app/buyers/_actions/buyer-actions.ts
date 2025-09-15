'use server';

import { db } from '@/lib/db';
import { buyers, buyerHistory, buyerFormSchema, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// A mock user ID. In a real app, you would get this from your auth session.
const MOCK_USER_ID = "123e4567-e89b-12d3-a456-426614174000";

export async function createBuyer(formData: unknown) {
  // 1. Validate the form data on the server
  const validatedFields = buyerFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid data. Please check the form.',
    };
  }

  const data = validatedFields.data;

  try {
    // 1.5 Normalize phone and check duplicates early to avoid DB errors
    const normalizedPhone = data.phone.trim();
    const existing = await db
      .select({ id: buyers.id })
      .from(buyers)
      .where(eq(buyers.phone, normalizedPhone))
      .limit(1);

    if (existing.length > 0) {
      return {
        errors: { phone: ["A lead with this phone already exists."] },
        message: "Duplicate phone number.",
      } as const;
    }

    // 2. Perform the database operations in a transaction
      await db.transaction(async (tx) => {
      // Ensure mock user exists to satisfy FK constraint
      await tx
        .insert(users)
        .values({ id: MOCK_USER_ID, email: 'demo@example.com' })
        .onConflictDoNothing({ target: users.id });

      const [result] = await tx.insert(buyers).values({
        fullName: data.fullName,
        email: data.email,
        phone: normalizedPhone,
        city: data.city,
        propertyType: data.propertyType,
        bhk: data.bhk,
        purpose: data.purpose,
        budgetMin: data.budgetMin,
        budgetMax: data.budgetMax,
        timeline: data.timeline,
        source: data.source,
        notes: data.notes,
        tags: data.tags,
        ownerId: MOCK_USER_ID,
      }).returning();

      await tx.insert(buyerHistory).values({
        buyerId: result.id,
        changedBy: MOCK_USER_ID,
        diff: { action: 'created', data: result }, // Log the creation event
      });

      return result;
    });

    // 3. Invalidate cache for the buyers list page
    revalidatePath('/buyers');

    // 4. Redirect to the new buyer's page (or the list page)
    redirect(`/buyers`); // Redirect to a list page which you will create later

  } catch (error) {
    console.error("Failed to create buyer:", error);
    return {
      message: 'Database error: Failed to create buyer lead.',
    };
  }
}