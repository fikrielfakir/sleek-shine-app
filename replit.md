# Tacos Avenue - Restaurant Ordering Platform

## Overview

Tacos Avenue is a modern French fast-food restaurant ordering platform specializing in tacos, burgers, salads, and desserts. The application provides a public-facing website with online ordering capabilities, a restaurant dashboard for staff to manage orders, and an admin dashboard for business analytics and management. The platform features a bold, dark-themed UI with vibrant food imagery and supports multiple order types (delivery, pickup, dine-in).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- Built with React 18 using Vite as the build tool and development server
- TypeScript for type safety, though configured with relaxed strictness settings
- Single-page application (SPA) architecture with client-side routing via React Router

**UI Component System**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui design system for pre-built component implementations
- Tailwind CSS for utility-first styling with custom design tokens
- Dark theme as primary design approach with vibrant accent colors (red, yellow, neon green, neon pink)

**State Management**
- React Context API for global cart state (`CartContext`)
- TanStack Query (React Query) for server state management and data fetching
- Local component state with React hooks

**Key Design Decisions**
- Chose Vite over Create React App for faster development builds and HMR
- Radix UI selected for headless, accessible component primitives that can be fully styled
- TanStack Query provides automatic caching, background refetching, and optimistic updates for better UX
- Context API sufficient for cart state; avoided Redux due to application simplicity

### Backend Architecture

**Server Framework**
- Express.js server for API routes and middleware
- RESTful API design pattern
- In-memory storage implementation (`MemStorage`) for development

**Data Layer**
- Drizzle ORM for type-safe database queries and schema definitions
- SQLite database schema defined but using better-sqlite3 driver
- Schema validation with Zod through drizzle-zod integration

**API Structure**
- `/api/menu` - Menu item CRUD operations with category filtering
- `/api/orders` - Order management with status updates
- `/api/analytics/sales` - Business metrics and reporting

**Key Design Decisions**
- Express chosen for simplicity and wide ecosystem support
- In-memory storage used initially; designed with storage interface for easy database integration
- Drizzle ORM provides type safety and SQL-like query builder
- Zod validation ensures data integrity at API boundaries

### Data Models

**Core Entities**
- **Users**: Customer accounts, staff, and admin roles with authentication fields
- **Restaurants**: Multiple location support with active status tracking
- **Menu Items**: Products organized by category (tacos, burgers, salads, desserts, drinks) with pricing, availability, and ratings
- **Orders**: Customer orders with type (delivery/pickup/dine-in), status tracking, and pricing breakdown
- **Order Items**: Line items linking orders to menu items with quantities and notes

**Schema Design Rationale**
- Role-based user model enables single authentication system for customers, staff, and admins
- Restaurant entity supports multi-location expansion
- Separate order items table maintains order history while allowing menu price changes
- Status field on orders enables order workflow tracking (pending → confirmed → preparing → ready → delivering → completed)

### External Dependencies

**UI & Styling**
- @radix-ui/* - Accessible component primitives (dialogs, dropdowns, forms, etc.)
- tailwindcss - Utility-first CSS framework
- class-variance-authority - Type-safe component variants
- lucide-react - Icon library
- embla-carousel-react - Touch-friendly carousel component

**Data Management**
- @tanstack/react-query - Server state management and caching
- react-hook-form - Form state and validation
- @hookform/resolvers - Form validation resolver for Zod
- zod - Schema validation
- drizzle-orm - Type-safe ORM
- drizzle-zod - Drizzle schema to Zod validator conversion

**Database**
- better-sqlite3 - Synchronous SQLite database driver for Node.js

**Development Tools**
- vite - Fast build tool and dev server
- typescript-eslint - TypeScript linting
- lovable-tagger - Component tagging for Lovable development platform

**Potential Future Integrations**
- Payment gateway (Stripe, PayPal) for online payments
- Delivery service APIs (Uber Eats, Deliveroo, Just Eat) mentioned in UI
- WhatsApp Business API for order notifications
- Email service (SendGrid, Mailgun) for order confirmations
- SMS service for delivery updates