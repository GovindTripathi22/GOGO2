# AWS Amplify Deployment Guide for GoGo Web

## What is AWS Amplify?

**AWS Amplify** is Amazon's managed hosting platform for modern web applications. Think of it as "Vercel but for AWS."

| Feature | What It Does |
|---------|--------------|
| **Auto-Build** | Connects to GitHub, builds your app automatically on every push |
| **Global CDN** | Uses CloudFront to serve your site from 400+ edge locations worldwide |
| **Free SSL** | Automatic HTTPS certificates for your domain |
| **Serverless Backend** | Runs Next.js API routes as Lambda functions |
| **Preview Deployments** | Creates a unique URL for each pull request |

### Why Amplify for This Project?
- ✅ **Next.js 16+ Support**: Full SSR, API routes, and App Router compatibility
- ✅ **No Server Management**: No EC2 instances to maintain
- ✅ **Auto-Scaling**: Handles traffic spikes automatically
- ✅ **Cost**: Free tier covers most small-medium sites

---

## Deployment Steps

### Step 1: Prepare Your Code

Your project is already AWS-compatible. Key configurations:

```typescript
// next.config.ts
output: "standalone"  // ✅ Required for Amplify
poweredByHeader: false // ✅ Security best practice
```

**Push to GitHub:**
```bash
git add -A
git commit -m "Prepare for AWS Amplify deployment"
git push origin main
```

### Step 2: Create Amplify App

1. Go to [AWS Console](https://console.aws.amazon.com) → **Amplify**
2. Click **"Create new app"** → **"Host web app"**
3. Select **GitHub** as your source
4. Authorize AWS to access your repositories
5. Select `GovindTripathi22/GOGO2` → Branch: `main`

### Step 3: Configure Build Settings

Amplify auto-detects Next.js. Verify these settings:

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Node.js Version | `18` or `20` |

**Custom Build Spec** (if needed):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Step 4: Set Environment Variables (CRITICAL)

Go to **Hosting** → **Environment variables** → **Manage variables**

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ⚠️ For CMS persistence |
| `JWT_SECRET` | Random 32+ character string | ⚠️ For admin auth |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v2 site key | Optional |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v2 secret | Optional |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager ID | Optional |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | Optional |
| `NEXT_PUBLIC_BASE_URL` | `https://your-domain.com` | Recommended |

> [!IMPORTANT]
> Without `DATABASE_URL`, CMS edits will NOT persist. See "CMS Persistence" section below.

### Step 5: Deploy

1. Click **"Save and deploy"**
2. Wait 3-5 minutes for build
3. Access your site at `https://main.d1234567.amplifyapp.com`

### Step 6: Add Custom Domain

1. Go to **Hosting** → **Domain management**
2. Click **"Add domain"**
3. Enter your domain (e.g., `gogo.bj`)
4. Amplify will provide DNS records to add at your registrar
5. SSL certificate is issued automatically

---

## Security Best Practices

### ✅ Already Configured in Your Project

| Security Feature | Location | Status |
|-----------------|----------|--------|
| Content Security Policy | `next.config.ts` | ✅ Active |
| X-Frame-Options: DENY | `next.config.ts` | ✅ Active |
| X-Content-Type-Options | `next.config.ts` | ✅ Active |
| Strict Referrer Policy | `next.config.ts` | ✅ Active |
| PoweredBy Header Removed | `next.config.ts` | ✅ Active |
| HTTPS Upgrade | `middleware.ts` | ✅ Active |

### 🔒 Recommended Additions

1. **Enable WAF (Web Application Firewall)**
   - AWS Console → WAF → Create Web ACL
   - Attach to your Amplify distribution
   - Protects against SQL injection, XSS, etc.

2. **Enable CloudWatch Monitoring**
   - Amplify → Monitoring → Enable logging
   - Set up alarms for error rates

3. **Secret Management**
   - Use AWS Secrets Manager for sensitive values
   - Never commit `.env` files to GitHub

4. **Admin Route Protection**
   - Currently: Admin is open (no auth required)
   - Recommended: Enable password protection in `middleware.ts`

---

## CMS Persistence Problem

> [!WARNING]
> **Your CMS currently saves to JSON files, which don't persist on Amplify.**

### The Issue
Amplify runs on Lambda (serverless). File writes are temporary.

### The Solution
Connect a PostgreSQL database:

1. **Option A: Neon (Easiest, Free Tier)**
   - Go to [neon.tech](https://neon.tech)
   - Create a project → Copy connection string
   - Add as `DATABASE_URL` in Amplify

2. **Option B: AWS RDS PostgreSQL**
   - AWS Console → RDS → Create database
   - Choose PostgreSQL, Free Tier
   - Copy endpoint URL

3. **Run Migrations**
   After getting your database URL:
   ```sql
   -- Run the script at: src/migrations/001_initial_cms_tables.sql
   ```

---

## Cost Estimate

| Tier | Monthly Cost | Suitable For |
|------|-------------|--------------|
| **Free Tier** | $0 | Up to 1000 build minutes, 5GB bandwidth |
| **Small Site** | $1-5 | Low traffic, occasional builds |
| **Production** | $20-50 | Moderate traffic + RDS database |

---

## Can I Deploy For You?

No, I cannot directly access your AWS account. However, I have:

1. ✅ Made your project AWS-compatible (`output: "standalone"`)
2. ✅ Created security headers in `next.config.ts`
3. ✅ Created database migration scripts
4. ✅ Provided this step-by-step guide

**What You Need To Do:**
1. Log into [AWS Console](https://console.aws.amazon.com)
2. Follow the steps above
3. Add your environment variables
4. (Optional) Set up Neon or RDS for CMS persistence

---

## Quick Commands Reference

```bash
# Verify build works locally before deploying
npm run build

# Test production mode locally
npm run start

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting issues
npm run lint
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check Node.js version (use 18 or 20) |
| Environment variables not working | Ensure no quotes around values in Amplify console |
| CMS changes not saving | Add `DATABASE_URL` (see CMS section) |
| Custom domain not working | Wait 24-48h for DNS propagation |
| 500 errors on API routes | Check CloudWatch logs for details |
