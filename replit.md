# Saniya Allen — Model Portfolio

## Overview

This is a high-end model portfolio website for **Saniya Allen**, a Nashville-based model. The site is a single-page application featuring a cinematic hero section, about section, editorial features gallery (horizontal scroll), UGC gallery with lightbox, a 3D rotating carousel, animated ticker, contact form with database persistence, and a custom cursor effect. The design uses a dark luxury aesthetic with gold accent colors, serif typography (Cormorant Garamond), and smooth scroll-triggered animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (React SPA)
- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: Wouter (lightweight router) — single main route `/` renders the Portfolio page
- **Styling**: Tailwind CSS with CSS custom properties for a dark luxury theme. shadcn/ui component library (new-york style) provides the base UI primitives
- **State/Data Fetching**: TanStack React Query for server state, react-hook-form with zod validation for the contact form
- **Animations**: Framer Motion for the hero section, IntersectionObserver-based reveal animations throughout, CSS keyframe animations for the ticker marquee and 3D carousel
- **Typography**: Google Fonts — Cormorant Garamond (serif headings), Inter (body), Space Grotesk (mono/accents)
- **Key Components**:
  - `HeroSection` — Full-screen cinematic intro with letter-by-letter animation, parallax mouse-follow glow
  - `AboutSection` — Two-column layout with parallax image and bio text
  - `FeaturesGallery` — Horizontal scroll-linked gallery of editorial work
  - `UgcGallery` — Grid gallery with lightbox overlay
  - `Carousel3D` — Interactive 3D rotating photo carousel with drag support
  - `TickerSection` — Infinite scrolling marquee of brand names
  - `ContactSection` — Form that POSTs to `/api/contact`
  - `CustomCursor` — Custom cursor with follower effect (desktop only)
  - `Navigation` — Floating nav that becomes opaque on scroll

### Backend (Express API)
- **Runtime**: Node.js with Express 5, TypeScript compiled via tsx
- **Architecture**: Simple REST API with a single endpoint
- **API Endpoints**:
  - `POST /api/contact` — Validates and stores contact form submissions
- **Validation**: Zod schemas shared between client and server (in `shared/schema.ts`), with `drizzle-zod` for generating insert schemas from table definitions
- **Dev Server**: Vite dev server integrated as Express middleware in development; static file serving in production

### Data Storage
- **Database**: PostgreSQL via `DATABASE_URL` environment variable
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema** (in `shared/schema.ts`):
  - `users` table — id (UUID), username, password
  - `contacts` table — id (UUID), name, email, subject, message, created_at
- **Migrations**: Managed via `drizzle-kit push` (`npm run db:push`)
- **Connection**: `pg` Pool connecting to PostgreSQL

### Build Process
- **Development**: `npm run dev` — runs tsx with Vite HMR middleware
- **Production Build**: `npm run build` — Vite builds the client to `dist/public`, esbuild bundles the server to `dist/index.cjs`
- **Production Start**: `npm start` — runs the bundled server which serves static files

### Project Structure
```
├── client/                  # Frontend React application
│   ├── index.html          # HTML entry point
│   └── src/
│       ├── main.tsx        # React root mount
│       ├── App.tsx         # Router and providers
│       ├── pages/          # Page components (portfolio, not-found)
│       ├── components/     # Feature components (hero, about, galleries, etc.)
│       │   └── ui/         # shadcn/ui component library
│       ├── hooks/          # Custom React hooks
│       └── lib/            # Utilities (queryClient, cn helper)
├── server/                  # Backend Express application
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Database access layer
│   ├── static.ts           # Production static file serving
│   └── vite.ts             # Vite dev server integration
├── shared/                  # Shared code between client and server
│   └── schema.ts           # Drizzle table definitions and Zod schemas
├── attached_assets/         # Reference content and branding assets
├── migrations/              # Drizzle migration files
└── script/
    └── build.ts            # Production build script
```

## External Dependencies

- **PostgreSQL** — Primary database, connected via `DATABASE_URL` environment variable. Required for the contact form and user storage
- **Google Fonts** — Cormorant Garamond, Inter, Space Grotesk loaded via CDN
- **No authentication** is currently implemented despite user table existing in schema
- **No email service** is integrated — contact form submissions are stored in the database only
- **Images** — Portfolio images are expected to be served from `/images/` subdirectories (hero, features, ugc, carousel). These static assets need to be placed in the `client/public/images/` directory