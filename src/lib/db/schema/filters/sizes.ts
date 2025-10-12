import { pgTable, uuid, text, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const sizes = pgTable('sizes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(), // e.g., "S", "M", "L", "XL", "US 8", "US 9"
  slug: text('slug').notNull().unique(), // e.g., "s", "m", "l", "us-8"
  sortOrder: integer('sort_order').notNull().default(0), // for ordering: S < M < L
});

// Zod schemas for validation
export const insertSizeSchema = createInsertSchema(sizes);
export const selectSizeSchema = createSelectSchema(sizes);

// TypeScript types
export type Size = typeof sizes.$inferSelect;
export type InsertSize = typeof sizes.$inferInsert;
