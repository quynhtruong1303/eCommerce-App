import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from './user';
import { guests } from './guest';
import { productVariants } from './variants';

export const carts = pgTable('carts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }), // nullable for guest carts
  guestId: uuid('guest_id').references(() => guests.id, { onDelete: 'cascade' }), // nullable for authenticated users
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const cartItems = pgTable('cart_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  cartId: uuid('cart_id').notNull().references(() => carts.id, { onDelete: 'cascade' }),
  productVariantId: uuid('product_variant_id').notNull().references(() => productVariants.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull().default(1),
});

// Relations
export const cartsRelations = relations(carts, ({ one, many }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
  guest: one(guests, {
    fields: [carts.guestId],
    references: [guests.id],
  }),
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  productVariant: one(productVariants, {
    fields: [cartItems.productVariantId],
    references: [productVariants.id],
  }),
}));

// Zod schemas for validation
export const insertCartSchema = createInsertSchema(carts);
export const insertCartItemSchema = createInsertSchema(cartItems);
export const selectCartSchema = createSelectSchema(carts);
export const selectCartItemSchema = createSelectSchema(cartItems);

// TypeScript types
export type Cart = typeof carts.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCart = typeof carts.$inferInsert;
export type InsertCartItem = typeof cartItems.$inferInsert;
