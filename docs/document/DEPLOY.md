# Deployment Guide

## Prerequisites

- Node.js 18+
- npm 9+
- Vercel account (or alternative hosting)
- Supabase account
- SendGrid account
- Google reCAPTCHA v3 account

---

## Local Development

### 1. Clone Repository

```bash
git clone https://github.com/your-org/gogo.git
cd gogo
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anon/public key | Yes |
| `SENDGRID_API_KEY` | SendGrid API key | Yes |
| `SALES_EMAIL` | Email for lead notifications | Yes |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret | Optional |
| `CONTENTFUL_SPACE_ID` | Contentful CMS space | Optional |

### 3. Database Setup

Create the `leads` table in Supabase:

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  fleet_size TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  email_status TEXT DEFAULT 'pending',
  email_error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow inserts" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow updates" ON leads FOR UPDATE USING (true);
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Production Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

```bash
vercel --prod
```

### Manual Deployment

```bash
npm run build
npm start
```

---

## Environment Variables in Vercel

Go to **Project Settings → Environment Variables** and add:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SENDGRID_API_KEY`
- `SALES_EMAIL`
- `RECAPTCHA_SECRET_KEY`
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `NEXT_PUBLIC_SITE_URL`

---

## Pre-Production Checklist

- [ ] All environment variables set
- [ ] Database tables created
- [ ] Email delivery tested
- [ ] Lighthouse score > 90
- [ ] Security headers verified
- [ ] Sitemap accessible at `/sitemap.xml`

---

## Rollback Procedure

### Vercel

```bash
vercel rollback [deployment-id]
```

### Git-based

```bash
git revert HEAD
git push origin main
```

---

## Monitoring

- **Logs**: Vercel Dashboard → Logs
- **Database**: Supabase Dashboard → Table Editor
- **Email**: SendGrid Activity Feed

---

## Staging Environment

1. Create separate Supabase project for staging
2. Create Vercel preview deployment
3. Test all flows before production release
