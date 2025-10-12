import { pgTable, uuid, text, integer, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { products } from './products';
import { productVariants } from './variants';

export const productImages = pgTable('product_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }), // nullable - can be product-level or variant-level
  url: text('url').notNull(),
  sortOrder: integer('sort_order').notNull().default(0), // for gallery ordering
  isPrimary: boolean('is_primary').notNull().default(false), // primary image for product/variant
});

// Relations
export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
  variant: one(productVariants, {
    fields: [productImages.variantId],
    references: [productVariants.id],
  }),
}));

// Zod schemas for validation
export const insertProductImageSchema = createInsertSchema(productImages);
export const selectProductImageSchema = createSelectSchema(productImages);

// TypeScript types
export type ProductImage = typeof productImages.$inferSelect;
export type InsertProductImage = typeof productImages.$inferInsert;
