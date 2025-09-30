import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
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

// Blog Authors table
export const authors = pgTable("authors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  bio: text("bio"),
  avatar: text("avatar"),
  email: text("email"),
  socialLinks: text("social_links"),
  slug: text("slug").notNull().unique(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Blog Categories table
export const blogCategories = pgTable("blog_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  color: text("color").default("#6366f1"),
});

// Blog Posts table
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featuredImage: text("featured_image"),
  authorId: varchar("author_id").references(() => authors.id),
  categoryId: varchar("category_id").references(() => blogCategories.id),
  tags: text("tags").array(),
  status: text("status").notNull().default("draft"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
  readingTime: integer("reading_time"),
  viewCount: integer("view_count").default(0),
  metaDescription: text("meta_description"),
});

// Insert schemas for blog entities
export const insertAuthorSchema = createInsertSchema(authors).pick({
  name: true,
  bio: true,
  avatar: true,
  email: true,
  socialLinks: true,
  slug: true,
});

export const insertBlogCategorySchema = createInsertSchema(blogCategories).pick({
  name: true,
  slug: true,
  description: true,
  color: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  content: true,
  excerpt: true,
  featuredImage: true,
  authorId: true,
  categoryId: true,
  tags: true,
  status: true,
  publishedAt: true,
  readingTime: true,
  metaDescription: true,
});

// Types for blog entities
export type InsertAuthor = z.infer<typeof insertAuthorSchema>;
export type Author = typeof authors.$inferSelect;

export type InsertBlogCategory = z.infer<typeof insertBlogCategorySchema>;
export type BlogCategory = typeof blogCategories.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

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
  providerLogos?: string[];
}
