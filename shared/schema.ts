import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Location interface for Orlando business districts (used by client-side location data)
export interface Location {
  id: string;
  cityName: string;
  stateName: string;
  image: string;
  providerCount: number;
  averagePrice: number;
  popularAreas: string[];
  isHotspot: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  priceRange: {
    min: number;
    max: number;
  };
  description: string;
  keyFeatures: string[];
}
