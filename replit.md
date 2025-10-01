# Orlando Virtual Offices

## Overview

Orlando Virtual Offices is a location-based affiliate marketing platform focused on connecting users with virtual office providers in Orlando, Florida. The platform aims to drive organic traffic and affiliate revenue through SEO-optimized content, comprehensive provider comparisons, and location-based search functionalities. Its core purpose is to simplify the search for virtual offices in the Orlando market, offering detailed information and educational resources to users.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application utilizes a modern React-based frontend with TypeScript and Vite. It employs shadcn/ui components and Tailwind CSS for a consistent, card-based UI, inspired by Airbnb's design for affiliate conversions. React Query manages server state, and Wouter handles client-side routing.

### Backend Architecture
The backend is built with Express.js, featuring a modular, route-based structure. It uses an interface-based storage abstraction (`IStorage`) that currently defaults to in-memory storage but is designed for easy migration to database implementations.

### Data Storage Solutions
The application is configured for PostgreSQL using Drizzle ORM for type-safe database operations, with schema definitions shared between frontend and backend for consistency.

### Content Management and SEO
The platform integrates comprehensive SEO strategies, including structured meta tags and Open Graph support, with all content focused on the Orlando market. The design emphasizes extensive content blocks and strategic affiliate call-to-action placements to maximize search visibility and conversion rates.

## External Dependencies

### UI and Styling
- **shadcn/ui**: Component library based on Radix UI.
- **Tailwind CSS**: Utility-first CSS framework.
- **Radix UI**: Headless UI primitives.
- **Lucide React**: Icon library.

### Development and Build Tools
- **Vite**: Build tool and development server.
- **TypeScript**: For type safety.
- **ESBuild**: Fast JavaScript bundler.

### Data and State Management
- **React Query (@tanstack/react-query)**: Server state management.
- **React Hook Form**: Form handling and validation.
- **Zod**: Schema validation.

### Database and Storage
- **Drizzle ORM**: Type-safe ORM for PostgreSQL.
- **@neondatabase/serverless**: Serverless PostgreSQL driver.

### Email and Communication
- **SendGrid**: Email service for user communications.

### Content Management
- **Notion API (@notionhq/client)**: For content management and blog posts.