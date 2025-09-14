import { pgTable, uuid, varchar, text, integer, timestamp, pgEnum, jsonb, uniqueIndex } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// ENUMS
export const cityEnum = pgEnum('city', ['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other']);
export const propertyTypeEnum = pgEnum('propertyType', ['Apartment', 'Villa', 'Plot', 'Office', 'Retail']);
export const bhkEnum = pgEnum('bhk', ['1', '2', '3', '4', 'Studio']);
export const purposeEnum = pgEnum('purpose', ['Buy', 'Rent']);
export const timelineEnum = pgEnum('timeline', ['0-3m', '3-6m', '>6m', 'Exploring']);
export const sourceEnum = pgEnum('source', ['Website', 'Referral', 'Walk-in', 'Call', 'Other']);
export const statusEnum = pgEnum('status', ['New', 'Qualified', 'Contacted', 'Visited', 'Negotiation', 'Converted', 'Dropped']);

// TABLES
export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull(),
});

export const buyers = pgTable('buyers', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 80 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 15 }).notNull(),
  city: cityEnum('city').notNull(),
  propertyType: propertyTypeEnum('propertyType').notNull(),
  bhk: bhkEnum('bhk'),
  purpose: purposeEnum('purpose').notNull(),
  budgetMin: integer('budget_min'),
  budgetMax: integer('budget_max'),
  timeline: timelineEnum('timeline').notNull(),
  source: sourceEnum('source').notNull(),
  status: statusEnum('status').default('New').notNull(),
  notes: text('notes'),
  tags: text('tags').array(), // Storing tags as an array of strings
  ownerId: uuid('owner_id').notNull().references(() => users.id),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
    return {
        phoneIndex: uniqueIndex("phone_idx").on(table.phone),
    };
});

export const buyerHistory = pgTable('buyer_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  buyerId: uuid('buyer_id').notNull().references(() => buyers.id, { onDelete: 'cascade' }),
  changedBy: uuid('user_id').notNull().references(() => users.id),
  changedAt: timestamp('changed_at').defaultNow().notNull(),
  diff: jsonb('diff').notNull(), // { field: 'status', old: 'New', new: 'Contacted' }
});

// ZOD VALIDATION SCHEMA
export const buyerFormSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters.").max(80),
    email: z.string().email("Invalid email address.").optional().or(z.literal('')),
    phone: z.string().min(10, "Phone number must be 10-15 digits.").max(15).regex(/^\d+$/, "Invalid phone number."),
    city: z.enum(cityEnum.enumValues),
    propertyType: z.enum(propertyTypeEnum.enumValues),
    bhk: z.enum(bhkEnum.enumValues).optional(),
    purpose: z.enum(purposeEnum.enumValues),
    budgetMin: z.coerce.number().int().positive().optional(),
    budgetMax: z.coerce.number().int().positive().optional(),
    timeline: z.enum(timelineEnum.enumValues),
    source: z.enum(sourceEnum.enumValues),
    notes: z.string().max(1000, "Notes cannot exceed 1000 characters.").optional(),
    tags: z.array(z.string()).optional(),
    updatedAt: z.string().optional(), // For concurrency check
}).refine(data => {
    if (data.budgetMin && data.budgetMax) {
        return data.budgetMax >= data.budgetMin;
    }
    return true;
}, {
    message: "Max budget must be greater than or equal to min budget.",
    path: ["budgetMax"],
}).refine(data => {
    if (['Apartment', 'Villa'].includes(data.propertyType)) {
        return !!data.bhk;
    }
    return true;
}, {
    message: "BHK is required for Apartments and Villas.",
    path: ["bhk"],
});