# Kaizen Burgos Gym Website

## Overview

This is a full-stack web application for Kaizen Burgos, a martial arts gymnasium in Burgos, Spain. The application serves as a marketing website and contact management system for the gym, featuring information about their martial arts programs (MMA, Brazilian Jiu-Jitsu, Kickboxing, Karate, and Boxing), instructors, schedules, and testimonials.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: TailwindCSS with custom brand colors (Kaizen red, gold)
- **UI Components**: Radix UI components with shadcn/ui design system
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API endpoints
- **Development**: Hot module replacement via Vite middleware in development
- **Production**: Compiled JavaScript bundle via esbuild

### Component Structure
- Single-page application with modular section components
- Responsive design optimized for mobile and desktop
- Spanish language content with SEO optimization
- Dark theme implementation with custom color variables

## Key Components

### Frontend Components
1. **Navigation**: Fixed header with smooth scrolling navigation
2. **Hero Section**: Landing area with call-to-action buttons
3. **About Section**: Gym philosophy and statistics
4. **Services Section**: Martial arts disciplines offered
5. **Instructors Section**: Team profiles and specialties
6. **Schedule Section**: Class timetables in grid format
7. **Testimonials Section**: Customer reviews and ratings
8. **Contact Section**: Contact form with discipline selection
9. **Footer**: Contact information and social links

### Backend Endpoints
- `POST /api/contact`: Contact form submission handling
- Logging middleware for API request monitoring
- Error handling middleware for graceful error responses

### Database Schema
- **Contacts Table**: Stores contact form submissions
  - Fields: id, name, email, phone, discipline, message, createdAt
  - Uses Drizzle ORM with Zod validation schemas
  - Currently configured for PostgreSQL via Neon Database

## Data Flow

1. **User Interaction**: Users browse the website and submit contact forms
2. **Form Submission**: Contact data is validated using Zod schemas
3. **API Processing**: Express server receives and processes contact submissions
4. **Database Storage**: Contact information is prepared for database insertion
5. **Response**: Success/error messages are returned to the user
6. **User Feedback**: Toast notifications inform users of submission status

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **wouter**: Lightweight client-side routing
- **zod**: Runtime type validation and schema parsing

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Styling utility for component variants

### Development Dependencies
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production

## Deployment Strategy

### Development Environment
- Vite development server with HMR
- TypeScript compilation and checking
- Replit integration with error overlay and cartographer plugins

### Production Build
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Static Serving**: Express serves built frontend assets
4. **Database**: Drizzle migrations for schema updates

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Development vs production mode detection
- Replit-specific optimizations and banners

## Changelog

```
Changelog:
- June 30, 2025. Initial setup
- June 30, 2025. Updated with realistic martial arts images and removed karate classes per user requirements. Updated Instagram links to @kaizen_burgos
- July 2, 2025. Enhanced website with authentic data from web scraping script - updated ratings display (5.0⭐), improved schedule formatting, and verified contact information accuracy
- July 2, 2025. Added comprehensive pricing section with three plans (individual €15, monthly €45, trimestral €120), morning MMA classes (Tuesday/Thursday 9-11am), and official schedule/pricing images from gym documentation
- July 2, 2025. Added official Kaizen logo to navigation and footer, adjusted BJJ image composition, and integrated authentic champions photos
- July 2, 2025. Implemented comprehensive SEO optimization for Google #1 ranking: enhanced meta tags with 50+ keywords, structured data (Business, FAQ), sitemap.xml, robots.txt, keyword-rich content updates, and local SEO targeting for "gimnasio artes marciales Burgos" searches
- July 3, 2025. Built complete e-commerce system with premium store (8 products), space rental system, and mobile-optimized chatbot
- July 3, 2025. Added dedicated gym space rental section targeting wellness professionals in Burgos with morning hours, SEO optimization for local searches, and WhatsApp integration
- July 3, 2025. Created comprehensive domain integration guide for GoDaddy setup, including DNS configuration, SSL certificates, and SEO optimization for professional domain deployment
- July 3, 2025. Completed kaizenburgos.com domain configuration with full DNS setup guides, updated all website URLs and SEO metadata, ready for GoDaddy DNS connection
- July 4, 2025. Enhanced website performance and marketing: added professional space rental testimonials, comprehensive booking calendar in chatbot, TikTok/YouTube social media integration, mobile optimization, and updated Facebook link to authentic account
- July 4, 2025. Redesigned store with professional layout featuring only 2 official Kaizen products (hoodie 55€, t-shirt 35€) with authentic product images, improved image display system, and streamlined shopping cart functionality
- July 4, 2025. Updated branding with new official Kaizen logo throughout website (navigation, footer), refreshed color palette to match logo aesthetics, and enhanced visual consistency across all pages
- July 5, 2025. Complete branding transformation to "KaizenAcademy改善Burgos" with authentic KAIZEN logo integration, updated pricing structure including "Combinar 2 disciplinas" €60/mes option, comprehensive chatbot professionalization with instructor-specific information, mobile optimization improvements, and enhanced SEO targeting for competitive local search rankings
- July 6, 2025. Built complete mobile app system "KaizenApp" exclusively for gym members with personalized Kaizen branding, motivation messages specific to Burgos location, 1-hour pre-class notifications with discipline-specific funny/motivational content, real-time gym capacity tracking, attendance confirmation system, photo gallery, chat functionality, and member authentication - fully branded with official Kaizen logo and "KaizenAcademy改善" identity
- July 9, 2025. Successfully deployed kaizenburgos.com custom domain with full DNS configuration, SSL certificate activation, and professional domain integration. Website now live at https://kaizenburgos.com with updated SEO metadata, social media integration, and business-ready professional web presence
- July 9, 2025. Advanced SEO optimization implemented targeting MMA, Brazilian Jiu-Jitsu, kickboxing, boxing searches in Burgos + tourism/Camino Santiago market. Enhanced meta tags with 100+ targeted keywords, comprehensive structured data (TouristAttraction, EventSeries), optimized FAQ section with 7 discipline-specific questions, updated sitemap.xml with high-priority pages, improved robots.txt with tourism focus, and removed all community features for business-focused SEO ranking optimization
- July 9, 2025. Completed comprehensive SEO audit and optimization for #1 Google rankings: optimized H1 tags with primary keywords, restructured content hierarchy with location-based keywords, implemented advanced structured data (SportsActivityLocation, LocalBusiness, FAQ schemas), created 7-question FAQ section targeting exact search queries, updated sitemap.xml with 65+ SEO-optimized URLs, enhanced robots.txt with strategic keyword placement, and prepared complete SEO audit report with 3-phase implementation strategy for dominating 90%+ of martial arts organic traffic in Burgos
- July 9, 2025. Successfully rolled back visual changes while preserving FAQ section and all technical SEO improvements per user request. Maintained "our disciples" section in original format, restored original hero section design, kept service titles in Spanish format, while keeping all backend SEO enhancements (structured data, sitemap, meta tags) intact for optimal ranking performance
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```