<div align="center">

[![Live](https://img.shields.io/badge/Live-penspinning--academy.vercel.app-black?style=flat-square&logo=vercel)](https://penspinning-academy.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js%2015-App%20Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Community](https://img.shields.io/badge/Discord-2000%2B%20members-5865F2?style=flat-square&logo=discord)](https://discord.gg/YvV3hSPen)

</div>
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
