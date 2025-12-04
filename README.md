# Lumina E-Commerce

Lumina is a modern React + Vite storefront demo with an AI shopping assistant, admin analytics, and a clean Tailwind-powered UI.

## Overview
- Polished storefront with category filters, search, ratings, and responsive cards.
- Slide-in cart with quantity controls and mocked checkout flow.
- Admin dashboard with sales/visitor charts (Recharts), inventory list, and product creation form.
- AI-powered product description generator and chat assistant to guide shoppers.
- No backend required; products are seeded from local state and images are fetched from Picsum.

## Tech Stack
- React 19, TypeScript, Vite 6
- Tailwind CSS via CDN
- Recharts for analytics
- Generative AI client for the shopping assistant and description generator (API key-driven)

## Getting Started
**Prerequisite:** Node.js 18+.

1) Install dependencies  
   ```bash
   npm install
   ```
2) Configure environment variables  
   Create or update `.env.local` with your AI API key:
   ```bash
   API_KEY=your_api_key_here
   ```
3) Run the dev server  
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev` – start the local dev server.
- `npm run build` – create a production build.
- `npm run preview` – preview the production build locally.

## Project Structure
- `App.tsx` – navigation, layout shell, and page switching.
- `pages/Storefront.tsx` – customer-facing storefront with filters and search.
- `pages/AdminDashboard.tsx` – analytics, inventory management, and AI description generation.
- `components/CartSidebar.tsx` – slide-in cart experience with quantity controls.
- `components/ChatAssistant.tsx` – floating AI shopping assistant chat.
- `context/ShopContext.tsx` – products, cart state, and inventory utilities.
- `services/` – AI helper functions that read `API_KEY`.
- `types.ts` – shared types for products, cart, sales data, and chat.

## Usage Notes
- Products and images are mock data defined in `context/ShopContext.tsx`; use the admin form to add or remove items at runtime.
- The AI description generator and assistant require a valid `API_KEY`; without it, fallback messages are shown.
- Charts use sample data in `pages/AdminDashboard.tsx` and can be swapped for real analytics feeds.

## Deployment
Run `npm run build` and host the `dist` folder on any static host (e.g., Vercel, Netlify, or your own server).
