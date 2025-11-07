# Survd Web

Web application for Survd - a platform to find and book local services like barbers, hairstylists, nail technicians, and more.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: React 19

## Project Structure

```
survd-web/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes (login, signup)
│   ├── (customer)/        # Customer-facing routes
│   ├── (vendor)/          # Vendor/business routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── shared/           # Shared business components
├── lib/                  # Utilities and shared logic
│   ├── types/           # TypeScript types (shared with mobile)
│   ├── api/             # API calls (shared with mobile)
│   ├── utils/           # Helper functions (shared with mobile)
│   └── hooks/           # Custom React hooks
├── public/              # Static assets
└── styles/              # Additional styles if needed

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

## Pages to Implement

Based on the mobile app structure:

### Customer Pages
- [ ] Home / Service Discovery
- [ ] Service Categories (Barber, Hairstylist, Nails, etc.)
- [ ] Vendor Profile & Booking
- [ ] My Appointments
- [ ] User Profile & Settings
- [ ] Payment Methods

### Vendor Pages
- [ ] Vendor Dashboard
- [ ] Manage Appointments
- [ ] Manage Services
- [ ] Client Management
- [ ] Earnings & Analytics
- [ ] Vendor Profile Settings

### Auth Pages
- [ ] Login
- [ ] Sign Up
- [ ] Forgot Password
- [ ] Verification

## License

Private
