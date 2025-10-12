import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { products } from './products';

// Collections (e.g., "Summer '25", "New Arrivals")
export const collections = pgTable('collections', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(), // e.g., "Summer '25"
  slug: text('slug').notNull().unique(), // e.g., "summer-25"
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Junction table for many-to-many relationship between products and collections
export const productCollections = pgTable('product_collections', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  collectionId: uuid('collection_id').notNull().references(() => collections.id, { onDelete: 'cascade' }),
});

// Relations
export const collectionsRelations = relations(collections, ({ many }) => ({
  productCollections: many(productCollections),
}));

export const productCollectionsRelations = relations(productCollections, ({ one }) => ({
  product: one(products, {
    fields: [productCollections.productId],
    references: [products.id],
  }),
  collection: one(collections, {
    fields: [productCollections.collectionId],
    references: [collections.id],
  }),
}));

// Zod schemas for validation
export const insertCollectionSchema = createInsertSchema(collections);
export const insertProductCollectionSchema = createInsertSchema(productCollections);
export const selectCollectionSchema = createSelectSchema(collections);
export const selectProductCollectionSchema = createSelectSchema(productCollections);

// TypeScript types
export type Collection = typeof collections.$inferSelect;
export type ProductCollection = typeof productCollections.$inferSelect;
export type InsertCollection = typeof collections.$inferInsert;
export type InsertProductCollection = typeof productCollections.$inferInsert;
