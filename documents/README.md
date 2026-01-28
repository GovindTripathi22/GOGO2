# GoGo Imperial Energy

Smart fuel delivery platform for businesses and individuals in Benin.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **CMS**: Contentful (Headless)
- **Forms**: React Hook Form + Zod

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-org/gogo.git
cd gogo
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in the required values:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
CONTENTFUL_PREVIEW_MODE=false
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## CMS Setup (Contentful)

### Content Types to Create

1. **Translation**
   - `key` (Short Text) - e.g., `hero.title`
   - `context` (Short Text) - Where used
   - `en` (Long Text) - English
   - `fr` (Long Text) - French

2. **FAQ**
   - `question` (Short Text, localized)
   - `answer` (Long Text, localized)
   - `order` (Number)
   - `isActive` (Boolean)

3. **Partner**
   - `name` (Short Text)
   - `logoUrl` (Media)
   - `websiteUrl` (Short Text)

4. **BlogPost**
   - `title` (Short Text, localized)
   - `slug` (Short Text)
   - `body` (Rich Text, localized)
   - `seoTitle`, `seoDescription` (Short/Long Text)
   - `featuredImage` (Media)
   - `publishedDate` (Date)

### Migration Checklist

- [ ] Create Contentful space
- [ ] Create content models above
- [ ] Seed initial content from `src/data/translations.ts`
- [ ] Add environment variables to Vercel
- [ ] Verify content updates within 60s

---

## Content Editing

See [docs/CONTENT_EDITING.md](docs/CONTENT_EDITING.md) for editor guide.

---

## Project Structure

```
src/
├── app/           # Next.js app router pages
├── components/    # React components
├── context/       # React context providers
├── lib/           # Utilities (cms.ts, analytics.ts)
├── data/          # Local fallback content
└── public/        # Static assets
```

---

## Deployment

Build for production:

```bash
npm run build
```

Deploy to Vercel, Cloudflare, or any Node.js host.

---

## License

Proprietary - GoGo Imperial Energy © 2026
