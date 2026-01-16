<img src="https://capsule-render.vercel.app/api?type=waving&height=200&color=0:0d1117,50:1a1a2e,100:7B2CFF&text=Metaventions%20AI&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Architected%20Intelligence&descSize=18&descAlignY=58" width="100%" alt="Metaventions AI Landing"/>

<div align="center">

*Official landing page for the Metaventions AI ecosystem*

<br/>

[![Live Site](https://img.shields.io/badge/Live-metaventionsai.com-7B2CFF?style=for-the-badge&labelColor=0d1117)](https://metaventionsai.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## Overview

A futuristic, responsive landing page showcasing Metaventions AI — a research and development studio focused on **Architected Intelligence** and sovereign agentic workflows.

### Features

- **Hero Section** — Animated introduction with call-to-action
- **Mission Statement** — Core philosophy and vision
- **Ecosystem Showcase** — Overview of Antigravity projects
- **Dark/Light Mode** — Theme persistence via localStorage
- **Custom Backgrounds** — User-configurable visual settings
- **Modal System** — Vision, Product, Contact, and Investor modals
- **Responsive Design** — Mobile-first, works on all devices

---

## Tech Stack

| Technology | Purpose |
|:-----------|:--------|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tooling |
| **Tailwind CSS** | Styling |
| **Supabase** | Database + Edge Functions |
| **Resend** | Email notifications |
| **Vercel** | Hosting + CI/CD |

---

## Backend Architecture

```
┌─────────────────┐      ┌──────────────────────┐      ┌─────────────┐
│  Landing Page   │ ───▶ │  Supabase Edge Fn    │ ───▶ │  Database   │
│  (Vercel)       │      │  form-submit         │      │  PostgreSQL │
└─────────────────┘      └──────────────────────┘      └─────────────┘
                                   │
                                   ▼
                         ┌─────────────────┐
                         │  Resend Email   │
                         │  Notification   │
                         └─────────────────┘
```

### Database Tables

| Table | Purpose |
|:------|:--------|
| `signups` | Early access / waitlist signups (name, email, organization) |
| `contact_submissions` | Contact form inquiries (name, email, objective, message) |

### Edge Function

- **Endpoint:** `https://rqidgeittsjkpkykmdrz.supabase.co/functions/v1/form-submit`
- Handles both signup and contact form submissions
- Validates input, stores to database, sends email notification

---

## Quick Start

```bash
# Clone
git clone https://github.com/Blackamethyst-ai/Metaventions-AI-Landing.git
cd Metaventions-AI-Landing

# Install dependencies
npm install

# Set up environment (optional - for AI features)
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local

# Run development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
Metaventions-AI-Landing/
├── App.tsx              # Main application component
├── index.tsx            # Entry point
├── index.html           # HTML template
├── components/
│   ├── Navbar.tsx       # Navigation with modal triggers
│   ├── Hero.tsx         # Hero section with CTA
│   ├── Mission.tsx      # Mission statement
│   ├── Ecosystem.tsx    # Project showcase
│   ├── Footer.tsx       # Footer with links
│   ├── BackgroundEffect.tsx  # Dynamic background
│   ├── SettingsModal.tsx     # User preferences
│   ├── SignUpModal.tsx       # Early access signup → Supabase
│   ├── ContactModal.tsx      # Contact form → Supabase
│   ├── VisionModal.tsx       # Vision details
│   ├── ProductModal.tsx      # Product information
│   └── InvestorsModal.tsx    # Investor relations
├── lib/
│   └── supabase.ts      # Supabase API client for form submissions
├── types.ts             # TypeScript definitions
├── Dockerfile           # Cloud Run deployment
├── nginx.conf           # Nginx configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies
```

---

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Manual Build

```bash
npm run build
# Deploy the 'dist' folder to your hosting provider
```

---

## Related Projects

| Project | Description |
|:--------|:------------|
| [The-Decosystem](https://github.com/Blackamethyst-ai/The-Decosystem) | Architectural blueprint |
| [agent-core](https://github.com/Blackamethyst-ai/agent-core) | Research orchestration |
| [ResearchGravity](https://github.com/Blackamethyst-ai/ResearchGravity) | Signal capture framework |
| [CareerCoachAntigravity](https://github.com/Blackamethyst-ai/CareerCoachAntigravity) | Career intelligence |

---

<div align="center">

**Part of the [Antigravity Ecosystem](https://github.com/Blackamethyst-ai)**

<br/>

*"Let the invention be hidden in your vision."*

</div>

<img src="https://capsule-render.vercel.app/api?type=waving&height=100&color=0:0d1117,50:1a1a2e,100:7B2CFF&section=footer" width="100%"/>
