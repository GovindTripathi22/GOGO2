# GoGo Imperial Energy - Website

Modern fuel delivery platform for Benin, built with Next.js 16+, React, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/              # About Us page
│   ├── admin/              # Admin dashboard (CMS)
│   ├── b2b/                # B2B Solutions page
│   ├── blog/               # Blog index & posts
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/         # Individual blog posts
│   ├── mobile-app/         # Mobile app showcase
│   ├── quote/              # Quote request form
│   └── trust-faq/          # Trust & FAQ page
├── components/             # Reusable React components
│   ├── ui/                 # UI primitives (ScrollReveal, etc.)
│   ├── Navbar.tsx          # Site navigation
│   ├── Footer.tsx          # Site footer
│   ├── Hero.tsx            # Homepage hero section
│   └── QuoteForm.tsx       # Lead capture form
├── context/
│   └── LangContext.tsx     # i18n language context (EN/FR)
├── data/
│   └── translations.ts     # All translation strings
├── content/                # Local JSON data (leads, blog, etc.)
└── lib/                    # Utilities (CMS, analytics, etc.)
```

## 🌍 Internationalization (i18n)

The site supports **English** and **French**:

- **Language toggle**: Navbar (`EN | FR`) and Footer buttons
- **URL param**: `?lang=fr` or `?lang=en`
- **Default**: French (`fr`)

### Adding translations

1. Edit `src/data/translations.ts`
2. Add keys to both `en` and `fr` objects
3. Use via `useLang()` hook: `const { t } = useLang()`

## 📝 Blog System

Blog posts are stored in `src/content/blog.json`:

```json
{
  "slug": "my-post",
  "title": "Post Title",
  "body": "Markdown content...",
  "publishedDate": "2025-01-15",
  "tags": ["Company News"],
  "author": "GoGo Team"
}
```

**Blog pages:**
- `/blog` - Blog index (BlogClient.tsx)
- `/blog/[slug]` - Individual posts (BlogPostClient.tsx)

## 🛠️ Admin CMS

Access at `/admin` (password protected):

- **Pages**: Edit page content and SEO
- **Blog**: Manage blog posts
- **FAQs**: Update FAQ content
- **Leads**: View quote submissions
- **Settings**: Site configuration

## 🔧 Environment Variables

Create `.env.local`:

```env
# reCAPTCHA (optional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX
```

## 📱 Key Features

- **Responsive design** with mobile-first approach
- **Bilingual support** (English/French)
- **Form validation** with translated error messages
- **Blog** with markdown rendering
- **Admin CMS** for content management
- **SEO optimized** with meta tags

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Docker
```bash
docker build -t gogo-web .
docker run -p 3000:3000 gogo-web
```

## 📞 Support

For technical questions, contact the development team.

---

© 2025 GoGo Imperial Energy
