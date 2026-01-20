# GoGo CMS Admin Guide

## Overview
The GoGo CMS is a headless content management system built on Supabase (Postgres) that allows you to manage website content without code changes.

## Accessing the Admin Panel
1. Navigate to `/admin` on your website
2. Enter your authorized admin email
3. Check your email for a magic login link (valid for 15 minutes)
4. Click the link to access the dashboard

## Dashboard
The dashboard shows:
- **Pages**: Total number of content pages
- **FAQs**: Total FAQ entries
- **Leads**: B2B quote submissions

## Managing Pages

### Creating a Page
1. Go to **Pages** in the main navigation
2. Enter a slug (e.g., `about-us`) in the input field
3. Click **Create Page**
4. The page will be created with empty EN and FR translations

### Editing Content
1. Click **Edit** on any page
2. You'll see two tabs: **English** and **French**
3. Edit the content in JSON format
4. Click **Save** to save changes (creates a version backup)
5. Click **Publish** to make changes live

### Publishing Workflow
- **Draft**: Content is saved but not visible on the public site
- **Published**: Content is live and visible to visitors
- Each locale (EN/FR) has its own publish status

### Version History
- The last 3 versions of each translation are saved
- Click **Restore** on any version to revert

## French Parity Rules
Pages marked as "FR Required" must have French translations:
- If French is not published, French visitors see: "Contenu bientôt disponible en français"
- Required sections: Hero, About, B2B, FAQ

## Media Settings
Go to **Media** to control:
- **Hero Video**: Toggle on/off
- **Captions**: Edit EN/FR captions for videos

## FAQ Management
1. Go to **FAQs**
2. Add questions with category tags
3. Publish EN and FR versions separately
4. FAQs support full-text search

## Best Practices
1. Always publish both EN and FR for required sections
2. Use the preview link before publishing
3. Check mobile responsiveness after content changes
4. Coordinate with marketing for major content updates

## Troubleshooting

### Can't login?
- Verify your email matches `ADMIN_EMAIL` in environment variables
- Check spam folder for magic link email
- Try again after 1 minute (rate limiting)

### Content not updating?
- Check that the translation is published (not just saved)
- Content updates within ~60 seconds (ISR cache)
- Force refresh with Ctrl+Shift+R

### Need help?
Contact the development team or check `docs/DEPLOY_CMS.md` for technical documentation.
