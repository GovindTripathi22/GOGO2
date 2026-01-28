# System Architecture

## Overview
GoGo Imperial Energy is a Next.js 14 web application designed for performance, SEO, and reliability. It uses a hybrid rendering approach (ISR for content, Client Components for interactivity) and integrates with headless services for content and data.

## Tech Stack

| Component | Technology | Role |
|-----------|------------|------|
| **Frontend** | Next.js 14 (App Router) | React framework, SSR/ISR |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS v4 | Utility-first styling |
| **CMS** | Contentful | Headless content management |
| **Database** | Supabase (PostgreSQL) | Lead persistence |
| **Email** | SendGrid | Transactional emails |
| **Security** | reCAPTCHA v3 | Bot protection |
| **Hosting** | Vercel | Edge network deployment |

## Data Flow

### 1. Lead Submission Flow
```mermaid
sequenceDiagram
    User->>QuoteForm: Submits form
    QuoteForm->>API Route: POST /api/leads
    API Route->>RateLimiter: Check IP limit
    API Route->>reCAPTCHA: Verify token
    API Route->>Supabase: Insert (status: pending)
    API Route->>SendGrid: Send email
    alt Email Success
        API Route->>Supabase: Update (status: sent)
        API Route-->>User: 200 OK
    else Email Fail
        API Route->>Supabase: Update (status: failed)
        API Route-->>User: 200 OK (soft fail)
    end
```

### 2. Content Fetching (ISR)
```mermaid
sequenceDiagram
    Build Time->>Contentful: Fetch all content
    Contentful-->>Next.js: JSON Data
    Next.js->>Cache: Store HTML/JSON
    User->>CDN: Request Page
    CDN-->>User: Cached HTML (Fast)
    Note over CDN: Revalidates every 60s
```

## Directory Structure

- `src/app`: Page routes and API endpoints
- `src/components`: Reusable UI components
- `src/lib`: Service clients (Supabase, SendGrid, CMS)
- `src/context`: React contexts (Language)
- `docs`: Developer documentation

## Security Measures

- **CSP**: Strict Content-Security-Policy headers
- **Rate Limiting**: LRU-based IP tracking
- **Input Validation**: Zod schemas for all API inputs
- **Honeypot**: Hidden fields to trap bots
- **Secrets**: Environment variables (never committed)

## Performance Optimizations

- **Images**: `next/image` with WebP/AVIF
- **Fonts**: `next/font` (DM Sans)
- **Scripts**: Third-party scripts (GTM, Pixel) lazy loaded
- **Content**: ISR caching with 60s revalidation

## Deployment Pipeline

1. **Commit** -> GitHub Main
2. **CI Check** (GitHub Actions): Lint, Type Check, Build, Test, Lighthouse
3. **Deploy** -> Vercel Production
