# Penspinning Academy

A production-ready web application built with Next.js 15, React, TypeScript, and Tailwind CSS, actively used by a community of 2,000+ users.

## Features

### Data-driven architecture
Trick content is generated dynamically from a structured data layer, keeping UI components fully decoupled from content. New tricks can be added without modifying UI logic.

### Next.js App Router
Uses server components, dynamic routing (`/[level]/[trick]`), and static generation for fast performance and SEO-friendly pages.

### Persistent user preferences
Dark mode and progress tracking are stored with `localStorage` and restored on mount without causing layout shift.

### Scalable classification system
Each trick is strongly typed and categorized by:
- Family  
- Difficulty  
- Modifiers  

This enables filtered views and future search expansion.

### Responsive design
Mobile-first interface built with Tailwind CSS and tested across multiple screen sizes.

### Deployment pipeline
Hosted on Vercel with automatic CI/CD deployments on every push to `main`.

## Tech Stack

- Next.js 15  
- React  
- TypeScript  
- Tailwind CSS  
- localStorage  
- Vercel

## Running locally
```
git clone https://github.com/AllwarsGIT/penspinning-academy.git
cd penspinning-academy
npm install
npm run dev
```
