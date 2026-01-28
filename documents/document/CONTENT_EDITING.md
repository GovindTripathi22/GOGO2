# Content Editing Guide

This guide explains how to edit website content using Contentful CMS.

---

## Accessing the CMS

1. Go to [app.contentful.com](https://app.contentful.com)
2. Login with your editor credentials
3. Select the **GoGo Imperial Energy** space

---

## Content Types

### Translations
Used for all website text (headlines, buttons, descriptions).

| Field | Description |
|-------|-------------|
| `key` | Technical identifier (e.g., `hero.title`) |
| `context` | Where this text appears (e.g., "Hero Section") |
| `en` | English text |
| `fr` | French text |

> **Important**: Do not change the `key` field—only edit `en` and `fr`.

### FAQs
Frequently Asked Questions shown on the homepage.

| Field | Description |
|-------|-------------|
| `question` | The question text |
| `answer` | The answer text |
| `order` | Display order (lower = first) |
| `isActive` | Toggle visibility |

> **Tip**: Set `isActive` to false to hide an FAQ without deleting it.

### Partners
Logos shown in the "Trusted By" section.

| Field | Description |
|-------|-------------|
| `name` | Company name |
| `logoUrl` | Upload logo image |
| `websiteUrl` | Link to partner website |

### Blog Posts
Articles for the blog (coming soon).

| Field | Description |
|-------|-------------|
| `title` | Post title |
| `slug` | URL path (e.g., `fuel-delivery-guide`) |
| `body` | Rich text content |
| `seoTitle` | Title for Google search results |
| `seoDescription` | Description for Google |
| `featuredImage` | Hero image for the post |
| `publishedDate` | Publication date |

---

## Publishing Changes

1. Make your edits
2. Click **Publish** (top right)
3. Changes appear on the website within **60 seconds**

---

## Preview Drafts

To preview unpublished changes:
1. Save your draft (don't publish)
2. Ask a developer to enable Preview Mode
3. View the site with draft content

---

## Best Practices

- ✅ Always fill both EN and FR fields
- ✅ Use the `context` field to note where text appears
- ✅ Test on mobile after making changes
- ❌ Don't delete translations—set `isActive` to false instead
- ❌ Don't change `key` or `slug` values without developer approval

---

## Need Help?

Contact the development team for:
- New content types
- Bulk content updates
- Technical issues
