# CMS Deployment Guide

## Prerequisites
- Supabase project with Postgres database
- SendGrid account for email (magic links)
- Vercel or similar hosting

## Step 1: Database Setup

### Run Migrations
```bash
# Using Supabase CLI
supabase db push --file migrations/001_create_cms_tables.sql

# Or via Supabase Dashboard:
# Go to SQL Editor > New Query > Paste contents of migrations/001_create_cms_tables.sql > Run
```

### Verify Tables
Expected tables:
- `pages`, `page_translations`, `content_history`
- `faqs`, `faq_translations`
- `blog_posts`, `blog_translations`
- `media_meta`, `content_audit`
- `leads`, `lead_notifications`, `admin_sessions`

## Step 2: Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Required
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
ADMIN_EMAIL=admin@company.com

# Email (for magic links in production)
SENDGRID_API_KEY=SG.xxx

# Site
NEXT_PUBLIC_SITE_URL=https://gogo.bj
```

## Step 3: Initial Content Seed

Run the content migration script to import existing `translations.ts`:

```bash
npm run migrate:content
# or
npx ts-node scripts/migrate-content.ts
```

## Step 4: Deploy

### Vercel
```bash
vercel --prod
```

### Environment Variables in Vercel
Add all variables from `.env.example` to Vercel project settings.

## Step 5: Verify

1. Visit `/admin/login`
2. Enter admin email
3. Check console for magic link (development) or email (production)
4. Verify dashboard loads with content stats

## Rollback

To remove CMS tables:
```sql
-- Run migrations/001_create_cms_tables_down.sql
```

The site will fall back to `translations.ts` static content.

## Monitoring

- Check Supabase dashboard for database health
- Review `content_audit` table for admin activity
- Monitor Vercel functions for API errors

## Security Checklist
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is not exposed to client
- [ ] `ADMIN_EMAIL` is set to authorized email only
- [ ] Rate limiting is active on login endpoint
- [ ] HTTPS enforced in production
