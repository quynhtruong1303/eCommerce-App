import { pgTable, uuid, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { categories } from './categories';
import { genders } from './filters/genders';
import { brands } from './brands';

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  categoryId: uuid('category_id').notNull().references(() => categories.id, { onDelete: 'restrict' }),
  genderId: uuid('gender_id').notNull().references(() => genders.id, { onDelete: 'restrict' }),
  brandId: uuid('brand_id').notNull().references(() => brands.id, { onDelete: 'restrict' }),
  isPublished: boolean('is_published').notNull().default(false),
  defaultVariantId: uuid('default_variant_id'), // nullable, will be set after variants are created
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations will be defined after product_variants is created
export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  gender: one(genders, {
    fields: [products.genderId],
    references: [genders.id],
  }),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  // Note: defaultVariant relation will be added in variants.ts to avoid circular dependency
  // variants, images, reviews, wishlists, productCollections relations will be added in their respective files
}));

// Zod schemas for validation
export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);

// TypeScript types
export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
