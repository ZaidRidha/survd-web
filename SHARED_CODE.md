# Sharing Code Between Mobile and Web Apps

This document outlines the strategy for sharing code between your React Native mobile app and this Next.js web app.

## What Can Be Shared

### ✅ **Highly Shareable** (Copy directly with minimal changes)

#### 1. TypeScript Types (`lib/types/`)
All your interfaces and types can be shared:
- User types
- Appointment types
- Vendor/Business types
- Service types
- Address types

**From mobile:** `app/context/AppointmentsContext.tsx` types
**To web:** `lib/types/index.ts`

#### 2. API Client Logic (`lib/api/`)
Your API calls and data fetching logic:
- Authentication API
- Appointments API
- Vendors API
- Services API

**Note:** You may need to adjust the HTTP client (mobile might use `fetch` or `axios`, web uses `fetch` natively)

#### 3. Business Logic & Utilities (`lib/utils/`)
Pure JavaScript/TypeScript functions:
- Date formatting helpers
- Price formatters
- Validation functions
- String manipulation
- Calculation logic

**From mobile:** Any utility functions in your mobile app
**To web:** `lib/utils/`

#### 4. Constants
- API endpoints
- Service categories
- Color schemes (convert to Tailwind)
- Configuration values

**From mobile:** `constants/` directory
**To web:** `lib/constants/`

---

## What Needs Platform-Specific Versions

### 🔄 **Requires Adaptation**

#### 1. UI Components
Mobile uses React Native components (`View`, `Text`, `TouchableOpacity`), web uses HTML/React DOM (`div`, `span`, `button`).

**Strategy:**
- Reuse **business logic** from mobile components
- Rebuild **UI layer** for web with Tailwind
- Keep similar component APIs for consistency

**Example:**
```typescript
// Mobile (React Native)
<TouchableOpacity onPress={handlePress}>
  <Text style={styles.text}>Button</Text>
</TouchableOpacity>

// Web (React + Tailwind)
<button onClick={handlePress} className="px-4 py-2 bg-blue-600 text-white">
  Button
</button>
```

#### 2. Navigation
- **Mobile:** Expo Router (file-based)
- **Web:** Next.js App Router (also file-based!)

The routing structure can be similar, but components are different.

#### 3. Maps
- **Mobile:** `react-native-maps`
- **Web:** Google Maps JavaScript API, `@react-google-maps/api`, or Mapbox

Share: location data, marker logic, geocoding functions
Rebuild: Map UI components

#### 4. State Management
If using Context API:
- ✅ Business logic can be shared
- ✅ State structure can be identical
- 🔄 May need to adjust React Native-specific code

**From mobile:** `app/context/AppointmentsContext.tsx`
**To web:** Create `lib/context/AppointmentsContext.tsx`

---

## How to Share Code

### Option 1: Manual Copy (Simple, Good for Starting)

1. Identify shared code in your mobile app
2. Copy files to the web app's `lib/` directory
3. Update imports and any platform-specific code
4. Keep files in sync manually when changes are made

**Pros:** Simple, no setup required
**Cons:** Manual syncing, risk of drift

### Option 2: Git Submodules

1. Create a `survd-shared` repository
2. Add it as a submodule to both mobile and web repos
3. Update and commit shared code in one place

**Pros:** Single source of truth
**Cons:** Submodules can be tricky, adds complexity

### Option 3: Private NPM Package

1. Create a `@survd/shared` npm package
2. Publish to private npm registry or GitHub packages
3. Install in both apps: `npm install @survd/shared`

**Pros:** Versioned, clean separation
**Cons:** Publish/install cycle for every change

### Option 4: Monorepo (Recommended for Long-term)

Convert to monorepo structure:
```
survd/
  ├── apps/
  │   ├── mobile/    (React Native)
  │   └── web/       (Next.js)
  └── packages/
      └── shared/    (Shared code)
```

Use tools like Turborepo or npm workspaces.

**Pros:** Easy imports, single repo, TypeScript works seamlessly
**Cons:** Requires restructuring both repos

---

## Recommended Migration Steps

### Phase 1: Extract Types & Utils (Start here)

From your mobile app `Survd/`, copy to web app `survd-web/`:

1. **Types from `app/data/dummyBusinessData.ts` and contexts**
   ```bash
   # Extract business types and create lib/types/index.ts
   ```

2. **Any utility functions**
   ```bash
   # Copy pure functions to lib/utils/
   ```

3. **API constants**
   ```bash
   # Create lib/constants/api.ts
   ```

### Phase 2: Extract Business Logic

1. **Context logic from `app/context/AppointmentsContext.tsx`**
   - Copy state management logic
   - Adapt any React Native-specific code
   - Create `lib/context/` directory

2. **Data transformations**
   - Any functions that process API responses
   - Formatting functions

### Phase 3: Build API Layer

1. Create `lib/api/` directory (already done)
2. If mobile has API calls, extract and adapt them
3. Create consistent API client for both platforms

### Phase 4: Rebuild UI Components

1. Use mobile app as reference for:
   - Component structure
   - User flows
   - Business rules
2. Rebuild with React + Tailwind for web
3. Optimize for desktop (hover states, responsive design)

---

## Example: Extracting Appointment Types

**From Mobile** (`Survd/app/context/AppointmentsContext.tsx`):
```typescript
export interface Appointment {
  id: string;
  businessId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
}
```

**To Web** (`survd-web/lib/types/index.ts`):
```typescript
// ✅ Can copy directly!
export interface Appointment {
  id: string;
  businessId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
}
```

**Use in both apps:**
```typescript
// Mobile
import { Appointment } from './context/AppointmentsContext';

// Web
import { Appointment } from '@/lib/types';
```

---

## Files to Extract from Your Mobile App

Based on your mobile app structure:

### High Priority
- [ ] `app/context/AppointmentsContext.tsx` → Types and logic
- [ ] `app/data/dummyBusinessData.ts` → Business/Vendor types
- [ ] `app/data/dummyAppointments.ts` → Appointment types
- [ ] Any utility functions you have

### Medium Priority
- [ ] Color constants from `constants/theme.ts` → Convert to Tailwind
- [ ] Service categories logic
- [ ] Validation functions
- [ ] Date/time helpers

### Reference Only (Rebuild for Web)
- [ ] UI components from `components/` → Use as reference
- [ ] Page layouts from `app/` directories → Adapt to Next.js
- [ ] Navigation structure → Similar but different implementation

---

## Need Help?

When extracting shared code:
1. Start with types - they're the easiest
2. Then utilities - pure functions
3. Then business logic
4. Finally, rebuild UI components

Let me know if you need help extracting specific code from your mobile app!
