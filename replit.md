# Orlando Virtual Offices

## Overview

Orlando Virtual Offices is a location-based affiliate marketing platform that helps users find and compare virtual office providers in Orlando, Florida. The platform is designed with SEO optimization and affiliate conversion in mind, featuring comprehensive provider comparisons, location-based search functionality, and educational content to drive organic traffic and revenue through affiliate partnerships.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### API-Driven Menu System (September 30, 2025)
Implemented dynamic API-driven navigation menus replacing hardcoded data with live content from markdown files:

- **Locations Dropdown**: Fetches featured offices from `/api/offices?featured=true`, groups by district, displays office count and lowest pricing with currency formatting
- **Providers Dropdown**: Fetches featured providers from `/api/providers?featured=true&limit=4`, displays provider cards with ratings and price ranges
- **API Enhancements**: Added featured filtering support, fixed status filtering to accept both 'active' and 'available' statuses, corrected pricing mapping to use mailOnly as monthlyRate
- **Query Client Fix**: Updated React Query client in `src/providers/index.tsx` to properly construct URLs with query parameters using URLSearchParams
- **Deterministic Sorting**: Locations sorted by price → office count → name for stable display order
- **Production Polish**: Added Infinity guards for pricing, currency formatting with "/mo" suffix, removed unused queryClient file
- **Testing**: End-to-end Playwright tests confirm both dropdowns successfully load and display API-driven content

### Orlando Market Localization (September 15, 2025)
Successfully transformed the platform from a nationwide virtual office aggregator to a focused Orlando, FL market presence:

- **Hero Section**: Updated with Orlando-specific messaging, local area suggestions (Downtown, Lake Nona, Winter Park), and Orlando business benefits
- **Provider Data**: Replaced mock data with Orlando-based virtual office providers including Regus Downtown Orlando, WeWork Lake Nona, and Orlando Executive Center with realistic local pricing
- **Featured Locations**: Updated to showcase Orlando neighborhoods and business districts instead of multiple cities
- **Content Copy**: All text content updated to emphasize Orlando market focus and Central Florida business opportunities
- **Search Functionality**: Configured with "Orlando, FL" as default location and local area suggestions for both desktop and mobile
- **SEO Optimization**: Implemented Orlando-focused page title, meta description, canonical links, Open Graph tags, and Twitter Card meta tags
- **Location Consistency**: Standardized all location formatting to "Area, Orlando, FL" pattern across all components

## System Architecture

### Frontend Architecture
The application uses a modern React-based frontend with TypeScript and Vite for build tooling. The UI is built with shadcn/ui components and Tailwind CSS for consistent styling. The component architecture follows a card-based design system inspired by Airbnb's location-based interface, optimized for affiliate conversions.

**Key Design Decisions:**
- **Component Library**: Extensive use of Radix UI primitives through shadcn/ui for accessibility and consistency
- **Styling**: Tailwind CSS with custom design tokens defined in `tailwind.config.ts` matching the brand color palette (#548ea1 primary, neutral greys)
- **State Management**: React Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
The backend is built with Express.js and follows a modular route-based architecture. The storage layer is abstracted through an interface pattern, currently implemented with in-memory storage but designed to be easily swapped for database implementations.

**Key Design Decisions:**
- **Storage Pattern**: Interface-based storage abstraction (`IStorage`) allows for easy migration from in-memory to database storage
- **Route Organization**: Centralized route registration in `registerRoutes` function for maintainability
- **Development Setup**: Vite integration for hot module replacement in development

### Data Storage Solutions
The application is configured for PostgreSQL with Drizzle ORM, though currently using in-memory storage for development. The database schema is defined in `shared/schema.ts` with a basic user model as foundation.

**Key Design Decisions:**
- **ORM Choice**: Drizzle ORM for type-safe database operations and migration management
- **Database**: PostgreSQL (configured via `drizzle.config.ts`)
- **Schema Management**: Shared schema definitions between frontend and backend for type consistency

### Content Management and SEO
The platform includes comprehensive SEO optimization with structured meta tags, Open Graph support, and content designed for search engine visibility. The design guidelines emphasize 1200+ word content blocks and strategic affiliate CTA placement. All SEO elements are now Orlando-focused for better local search visibility.

**Key Design Decisions:**
- **SEO Strategy**: Location-based content optimization with proper meta tags and structured data
- **Content Structure**: Blog/resource center for educational content and improved search rankings
- **Affiliate Integration**: Strategic placement of conversion-focused CTAs throughout the user journey

## External Dependencies

### UI and Styling
- **shadcn/ui**: Component library built on Radix UI primitives for accessible, customizable components
- **Tailwind CSS**: Utility-first CSS framework for consistent styling and responsive design
- **Radix UI**: Headless UI primitives for accessibility and keyboard navigation
- **Lucide React**: Icon library for consistent iconography

### Development and Build Tools
- **Vite**: Build tool and development server with hot module replacement
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds

### Data and State Management
- **React Query (@tanstack/react-query)**: Server state management, caching, and synchronization
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation for forms and API responses

### Database and Storage
- **Drizzle ORM**: Type-safe database toolkit for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL driver for database connections

### Email and Communication
- **SendGrid**: Email service for newsletter functionality and user communications

### Content Management
- **Notion API (@notionhq/client)**: Integration for content management and blog posts

### Monitoring and Analytics
The application is prepared for analytics integration and affiliate tracking, though specific services are not yet implemented.