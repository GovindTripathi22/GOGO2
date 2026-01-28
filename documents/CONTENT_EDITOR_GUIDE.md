# Content Editor Guide

This guide explains how to manage content on the GoGo Imperial Energy website using Contentful.

## Accessing the CMS

1. **Login**: Go to [app.contentful.com](https://app.contentful.com) and log in.
2. **Select Space**: Choose "GoGo Imperial Energy".
3. **Environment**: Ensure you are editing the "Master" environment unless testing features.

---

## Content Types

### 1. Translation (Global Text)
Used for hardcoded UI text like buttons, labels, and headlines.

| Field | Description | Do Not Edit |
|-------|-------------|-------------|
| **Key** | Unique ID (e.g., `hero.title`) | ⛔ YES |
| **Context** | Where this text appears | ⛔ NO |
| **EN** | English text | ⛔ NO |
| **FR** | French text | ⛔ NO |

> **Warning**: Changing the `Key` will break the website.

### 2. FAQ (Frequently Asked Questions)
Questions appearing on the homepage accordion.

- **Question**: Localized question text.
- **Answer**: Localized answer text.
- **Order**: Numeric value (1, 2, 3...) to control sort order.
- **Is Active**: Toggle to false to hide without deleting.
- **Tags**: Optional categorization (e.g., 'fuel', 'billing').

### 3. Partner (Trusted By Logos)
Logos in the trust strip.

- **Name**: Company name.
- **Logo**: SVG or PNG image (transparent background preferred).
- **Website URL**: Optional link to partner site.

### 4. Blog Post (Articles)
News and SEO content.

- **Title**: Article headline.
- **Slug**: URL-friendly ID (e.g., `fuel-saving-tips`).
- **Body**: Rich text content.
- **Published Date**: Controls sort order.
- **SEO Title**: optimized for Google search (50-60 chars).
- **SEO Description**: optimized summary (150-160 chars).
- **Featured Image**: Social sharing image (1200x630px).

### 5. Page (Generic Pages)
For simple informational pages (Terms, Privacy).

- **Title**: Page title.
- **Slug**: URL path.
- **Content**: Rich text body.

---

## Workflow

### Creating New Content
1. Click **Content** tab.
2. Click **Add entry** (top right).
3. Select type (e.g., Blog Post).
4. Fill in fields.
5. Click **Publish**.

### Updating Existing Content
1. Search for the entry.
2. Make changes.
3. Click **Publish** (changes appear in ~60s).

### Previewing Drafts
1. Make changes but click **Save** (not Publish).
2. Ask developers to enable Preview Mode on the site to see drafts.

---

## Media Guidelines

- **Formats**: Use JPG/WebP for photos, SVG/PNG for logos.
- **Size**: Keep images under 500KB for performance.
- **Alt Text**: Always add a description in the media asset settings.

---

## Troubleshooting

- **"Changes not showing"**: Wait 60 seconds (ISR cache). Hard refresh browser.
- **"Broken layout"**: Check if text length is too long for the design.
- **"Missing translation"**: Ensure both EN and FR fields are filled.
