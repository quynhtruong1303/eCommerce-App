import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(), // e.g., "Running", "Basketball", "Lifestyle"
  slug: text('slug').notNull().unique(), // e.g., "running", "basketball"
  parentId: uuid('parent_id'), // nullable, self-referencing for category hierarchy
});

// Relations
export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'categoryHierarchy',
  }),
  children: many(categories, {
    relationName: 'categoryHierarchy',
  }),
}));

// Zod schemas for validation
export const insertCategorySchema = createInsertSchema(categories);
export const selectCategorySchema = createSelectSchema(categories);

// TypeScript types
export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
