# Survd Web

Web application for Survd - a platform to find and book local services like barbers, hairstylists, nail technicians, and more.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: React 19

## Project Structure

The app uses Next.js App Router with **route groups** to organize pages by user type, similar to the mobile app structure:

```
survd-web/
├── app/
│   ├── (customer)/           # Customer pages (route group)
│   │   ├── waitlist/        # Landing/waitlist page ✅
│   │   │   └── page.tsx
│   │   ├── home/            # Service discovery
│   │   │   └── page.tsx
│   │   ├── explore/         # Browse categories
│   │   ├── appointments/    # My appointments ✅
│   │   │   └── page.tsx
│   │   ├── profile/         # User profile
│   │   ├── services/        # Service listings
│   │   └── layout.tsx       # Customer layout
│   │
│   ├── (vendor)/            # Vendor pages (route group)
│   │   ├── dashboard/       # Overview & analytics ✅
│   │   │   └── page.tsx
│   │   ├── appointments/    # Manage bookings ✅
│   │   │   └── page.tsx
│   │   ├── services/        # Manage services ✅
│   │   │   └── page.tsx
│   │   ├── clients/         # Client management
│   │   ├── earnings/        # Revenue tracking
│   │   ├── profile/         # Business profile
│   │   └── layout.tsx       # Vendor layout
│   │
│   ├── (auth)/              # Auth pages (route group)
│   │   ├── login/           # Sign in ✅
│   │   │   └── page.tsx
│   │   ├── signup/          # Create account ✅
│   │   │   └── page.tsx
│   │   ├── forgot-password/ # Password reset
│   │   ├── verify/          # Email verification
│   │   └── layout.tsx       # Auth layout
│   │
│   ├── api/
│   │   └── waitlist/        # Waitlist API endpoint ✅
│   │       └── route.ts
│   │
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Redirects to /waitlist
│   └── globals.css          # Global Tailwind styles
│
├── components/
│   ├── ui/                  # Base UI components
│   │   └── Button.tsx       # Reusable button ✅
│   ├── shared/              # Business components
│   │   └── ServiceCard.tsx  # Service display card ✅
│   └── waitlist/            # Waitlist-specific components
│       └── WaitlistForm.tsx # Waitlist signup form ✅
│
├── lib/                     # Shared logic (can sync with mobile)
│   ├── types/              # TypeScript definitions
│   │   ├── index.ts        # Core types (User, Vendor, etc.) ✅
│   │   └── waitlist.ts     # Waitlist types ✅
│   ├── api/                # API client functions
│   │   ├── client.ts       # Base API client ✅
│   │   └── appointments.ts # Appointments API ✅
│   └── utils/              # Helper functions
│       └── dateHelpers.ts  # Date formatting ✅
│
├── public/                 # Static assets (images, fonts)
├── .env.local.example      # Environment variables template
├── SHARED_CODE.md          # Guide for syncing with mobile ✅
└── package.json

## Getting Started

### Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Shared Code with Mobile App

The following directories contain code that can be shared between the web and mobile (React Native) apps:

- **lib/types/**: TypeScript interfaces and types
- **lib/api/**: API client functions
- **lib/utils/**: Helper functions (date formatting, validation, etc.)

To share code, you can:
1. Copy files between repositories
2. Use git submodules
3. Create a shared npm package
4. Set up a monorepo (future consideration)

## Environment Variables

Create a `.env.local` file with the following:

\`\`\`env
# Add your environment variables here
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
\`\`\`

## Understanding Route Groups

This app uses Next.js **route groups** (folders with parentheses) to organize pages without affecting the URL structure:

```
app/(customer)/waitlist/page.tsx  →  /waitlist  (not /customer/waitlist)
app/(vendor)/dashboard/page.tsx   →  /dashboard
app/(auth)/login/page.tsx         →  /login
```

**Benefits:**
- Clean URLs without prefixes
- Organized codebase by user type (like mobile app)
- Separate layouts for each section
- Easy to find related pages

## Current Routes

### ✅ Implemented
- `/` - Redirects to waitlist
- `/waitlist` - Waitlist signup page (customer)
- `/login` - Sign in page (auth)
- `/signup` - Create account page (auth)
- `/dashboard` - Vendor dashboard (vendor)
- `/appointments` - Customer appointments (customer)
- `POST /api/waitlist` - Waitlist submission API

### 🔲 To Implement

**Customer Pages:**
- [ ] `/home` - Service discovery & search
- [ ] `/explore` - Browse service categories
- [ ] `/services/[id]` - Service detail & booking
- [ ] `/profile` - User settings & info
- [ ] `/profile/addresses` - Manage addresses
- [ ] `/profile/payments` - Payment methods

**Vendor Pages:**
- [ ] `/services` - Manage service offerings (basic version exists)
- [ ] `/clients` - Client management
- [ ] `/earnings` - Revenue tracking & analytics
- [ ] `/profile` - Business profile settings
- [ ] `/messages` - Customer communication

**Auth Pages:**
- [ ] `/forgot-password` - Password reset
- [ ] `/verify` - Email verification

## License

Private
