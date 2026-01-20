# Deploying GoGo CMS to Cloudflare Pages

Since this project uses Next.js with API routes (for the CMS), you need to configure Cloudflare Pages correctly.

## Option 1: Zero-Config (Best for Static + Edge)

1. **Log in to Cloudflare Dashboard**.
2. Go to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
3. Select the repository: `GovindTripathi22/GOGO`.
4. **Build Settings**:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `npx @cloudflare/next-on-pages@1`
   - **Output Directory**: `.vercel/output/static` (or default checks)
   - **Node Version**: Set environment variable `NODE_VERSION` to `20.0.0` or higher.

## Option 2: Add Adapter (Recommended)

To ensure best compatibility, add the Cloudflare adapter to your project:

1. Run locally:
   ```bash
   npm install -D @cloudflare/next-on-pages
   ```
2. Update `package.json`:
   ```json
   "scripts": {
     "pages:build": "npx @cloudflare/next-on-pages"
   }
   ```
3. Commit and Push.
4. In Cloudflare Build Settings, use command: `npm run pages:build`.

## CMS Access
The CMS is available at `/admin`.
