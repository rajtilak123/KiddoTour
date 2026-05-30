# KiddoTour Booking Platform

KiddoTour is a luxury preschool and early childhood learning centre tour booking platform. Originally migrated from static HTML prototypes, this application has been fully refactored into a modern, production-ready, pure React.js architecture. The visual interface, glassmorphic styling, and animations remain exactly identical to the original high-end designs, but all underlying interactivity is managed through declarative React state.

## Tech Stack

- **Framework**: React.js (v18+) with Vite (for ultra-fast bundling and development)
- **Styling**: Tailwind CSS (Utility-first style configuration)
- **Routing**: React Router DOM (v6+ client-side routing)
- **State Management**: React Context API & `useState` hook (with `localStorage` persistence)
- **Animations**: Framer Motion & CSS keyframe transitions
- **Accessibility**: Screen reader compatible (aria properties, accessible image roles, keyboard focus bindings)
- **Code Hygiene**: Fully code-split routes (lazy loading), custom class-based error boundaries

## Features

- **Dynamic Booking Flow**: Navigate sequentially from Home $\rightarrow$ Booking Selection $\rightarrow$ Parent Details $\rightarrow$ Confirmation.
- **Persistent State**: All user selections (preschool centre, calendar date, time slot, form data) are synchronized in real-time with `localStorage`. Selections persist through browser refreshes or back-and-forth navigation.
- **Interactive Map and QR Codes**: Confirmation page renders dynamic visitor cards containing actual selected centre names, addresses, date ranges, visitor names, and emails.
- **A11y & Keyboard Compliant**: Calendar grids, time chips, and cards support `aria-pressed`, focus indicators, and keyboard activation (Enter/Space triggers).
- **Smooth Navigation Scroll**: Features React `useRef` anchors for homepage sections (`#how-it-works`, `#centres`, `#providers`). Link triggers automatically redirect to the home page and scroll smoothly to the target ref.
- **Robust Error Handling**: Wrapped in a top-level React `ErrorBoundary` fallback screen to capture and recover from runtime render crashes.

---

## Folder Structure

The project has been cleaned of unused placeholders and HTML asset files. The current structure is as follows:

```text
src/
├── assets/
│   └── screenshots/          # Design walkthrough references
├── components/
│   └── ErrorBoundary.jsx     # Top-level crash catcher & reset controller
├── context/
│   └── BookingContext.jsx    # Global context provider & localStorage syncing
├── hooks/
│   └── useBooking.js         # custom context consumption hook
├── pages/
│   ├── LandingPage.jsx       # Homepage with scroll anchors
│   ├── BookingSelectionPage.jsx # Centre, date, and slot picker
│   ├── ParentDetailsPage.jsx # Parent/Child form and validation
│   ├── ConfirmationPage.jsx  # Summary card & QR booking pass
│   └── NotFoundPage.jsx      # Glassmorphic 404 router
├── routes/
│   └── AppRoutes.jsx         # Lazy route routing & suspense skeleton
├── App.jsx                   # Application root routing shell
├── main.jsx                  # React DOM strict mounter
└── index.css                 # Main Tailwind styles entrypoint
```

---

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Navigate your browser to `http://localhost:5173`.

### 3. Production Build
Build optimized production static bundles under `dist/`:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## Deployment Instructions

### Vercel (SPA Routing Configured)
This project contains a [vercel.json](vercel.json) file that handles client-side routing fallback rewrites:
- Build command: `npm run build`
- Output directory: `dist`

### Netlify (SPA Redirects Configured)
This project includes a public `_redirects` file that automatically enables client-side fallbacks on Netlify:
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages
Configure `VITE_BASE_PATH` in your `.env` or build action matching your repository sub-path (e.g. `/my-repository/`):
```bash
VITE_BASE_PATH=/
```
Deploy the output `dist/` folder using the standard GitHub Action deploy runner.
