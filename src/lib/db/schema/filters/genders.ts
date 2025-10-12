import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const genders = pgTable('genders', {
  id: uuid('id').primaryKey().defaultRandom(),
  label: text('label').notNull(), // e.g., "Men", "Women", "Unisex"
  slug: text('slug').notNull().unique(), // e.g., "men", "women", "unisex"
});

// Zod schemas for validation
export const insertGenderSchema = createInsertSchema(genders);
export const selectGenderSchema = createSelectSchema(genders);

// TypeScript types
export type Gender = typeof genders.$inferSelect;
export type InsertGender = typeof genders.$inferInsert;
