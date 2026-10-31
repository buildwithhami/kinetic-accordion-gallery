# Kinetic Accordion Gallery

A high-performance, responsive accordion gallery component for Next.js 15, React 19, and Tailwind CSS v4. Built with vanilla JS layout calculations and native CSS transitions to deliver 60 FPS interactions across mobile, tablet, and desktop viewports without third-party animation libraries.

## Overview

The component dynamically adjusts its interaction model based on the viewport:

- **Desktop / Tablet (`>= 768px`):** Hover and click-driven horizontal expansion powered by CSS flexbox transitions.
- **Mobile (`< 768px`):** Scroll-driven vertical focus where cards auto-expand based on viewport position inside a sticky container.

## Features

- **Zero External Animation Dependencies:** Operates without Framer Motion or GSAP. Uses browser-native CSS transitions and `requestAnimationFrame`.
- **Decoupled Data Architecture:** Accept dynamic data via props or fall back to a typed configuration module (`galleryData.ts`).
- **Optimized Layout Performance:** Uses non-blocking scroll and resize handlers with explicit listener cleanup on unmount.
- **Hardware Accelerated:** Transitions are strictly bound to `flex`, `opacity`, `transform`, and `border-color` to leverage GPU rendering.
- **TypeScript Ready:** Fully typed interfaces for props and dataset schemas.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript 5+

## Project Structure

```text
├── app/
│   ├── globals.css          # Core CSS rules & view-state keyframes
│   ├── layout.tsx           # Root layout with font imports
│   └── page.tsx             # Demo usage page
├── components/
│   └── KineticAccordion.tsx # Core Accordion Gallery component
└── data/
    └── galleryData.ts       # Typed dataset & interface definitions
```

## Setup Instructions

### 1. CSS Configuration (`app/globals.css`)

Copy the required accordion transition rules into your global CSS file. This handles content fading, flex scaling, and border lighting across breakpoints.

```css
@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: #050505;
    color: #ffffff;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }
}

.font-cinzel {
  font-family: 'Cinzel', serif;
}

.accordion-card {
  transition: flex 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
}

.accordion-card .shrunk-content {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.accordion-card .expanded-content {
  opacity: 0;
  transform: translateY(15px);
  pointer-events: none;
  will-change: opacity, transform;
  transition: opacity 0.4s ease, transform 0.8s ease;
}

/* Mobile Viewport */
@media (max-width: 767.98px) {
  .accordion-card.mobile-active {
    border-color: rgba(255, 255, 255, 0.22) !important;
  }
  .accordion-card.mobile-active .shrunk-content {
    opacity: 0 !important;
    transform: translateY(-10px) !important;
    pointer-events: none !important;
  }
  .accordion-card.mobile-active .expanded-content {
    opacity: 1 !important;
    transform: translateY(0) !important;
    pointer-events: auto !important;
  }
}

/* Tablet Viewport */
@media (min-width: 768px) {
  .accordion-card.active {
    border-color: rgba(255, 255, 255, 0.22) !important;
  }
  .accordion-card.active .shrunk-content {
    opacity: 0 !important;
    transform: translateY(-10px) !important;
    pointer-events: none !important;
  }
  .accordion-card.active .expanded-content {
    opacity: 1 !important;
    transform: translateY(0) !important;
    pointer-events: auto !important;
  }
}

/* Desktop Hover Viewport */
@media (min-width: 768px) and (hover: hover) {
  .accordion-card:hover {
    border-color: rgba(255, 255, 255, 0.22) !important;
  }
  .accordion-card:hover .shrunk-content {
    opacity: 0 !important;
    transform: translateY(-10px) !important;
    pointer-events: none !important;
  }
  .accordion-card:hover .expanded-content {
    opacity: 1 !important;
    transform: translateY(0) !important;
    pointer-events: auto !important;
  }
}
```

### 2. Data Definition (`data/galleryData.ts`)

Create your data array or import it from your API / CMS:

```typescript
export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  bgImage: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: 'analytics',
    title: 'ANALYTICS',
    subtitle: 'REAL-TIME METRICS & USER INSIGHTS',
    buttonText: 'View Dashboard',
    buttonHref: '#',
    bgImage: 'https://images.unsplash.com/photo-1738330094168-6e9728731ce8?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
  {
    id: 'ai-workflow',
    title: 'AI WORKFLOW',
    subtitle: 'AUTOMATED LLM PIPELINE INTEGRATION',
    buttonText: 'Explore API',
    buttonHref: '#',
    bgImage: 'https://images.unsplash.com/photo-1775342989484-32de64ef79c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  },
];
```

## Usage

Import and render the component in your Next.js page. You can pass a custom array via the `items` prop or let it use default fallback data.

```tsx
// app/page.tsx
import KineticAccordion from '@/components/KineticAccordion';

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
      <KineticAccordion />
    </main>
  );
}
```