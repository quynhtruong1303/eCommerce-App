import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const brands = pgTable('brands', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(), // e.g., "Nike", "Adidas"
  slug: text('slug').notNull().unique(), // e.g., "nike", "adidas"
  logoUrl: text('logo_url'), // optional brand logo URL
});

// Zod schemas for validation
export const insertBrandSchema = createInsertSchema(brands);
export const selectBrandSchema = createSelectSchema(brands);

// TypeScript types
export type Brand = typeof brands.$inferSelect;
export type InsertBrand = typeof brands.$inferInsert;
