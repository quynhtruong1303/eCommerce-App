import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const colors = pgTable('colors', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(), // e.g., "Red", "Blue"
  slug: text('slug').notNull().unique(), // e.g., "red", "blue"
  hexCode: text('hex_code').notNull(), // e.g., "#FF0000"
});

// Zod schemas for validation
export const insertColorSchema = createInsertSchema(colors);
export const selectColorSchema = createSelectSchema(colors);

// TypeScript types
export type Color = typeof colors.$inferSelect;
export type InsertColor = typeof colors.$inferInsert;
