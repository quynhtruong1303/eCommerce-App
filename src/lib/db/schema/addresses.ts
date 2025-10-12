import { pgTable, uuid, text, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from './user';

// Enum for address type
export const addressTypeEnum = pgEnum('address_type', ['billing', 'shipping']);

export const addresses = pgTable('addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: addressTypeEnum('type').notNull(),
  line1: text('line1').notNull(),
  line2: text('line2'),
  city: text('city').notNull(),
  state: text('state').notNull(),
  country: text('country').notNull(),
  postalCode: text('postal_code').notNull(),
  isDefault: boolean('is_default').notNull().default(false),
});

// Relations
export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
  // orders relations will be added in orders.ts
}));

// Zod schemas for validation
export const insertAddressSchema = createInsertSchema(addresses);
export const selectAddressSchema = createSelectSchema(addresses);

// TypeScript types
export type Address = typeof addresses.$inferSelect;
export type InsertAddress = typeof addresses.$inferInsert;
export type AddressType = 'billing' | 'shipping';
