-- CMS Tables Migration
-- Run this script in your PostgreSQL database (Neon or AWS RDS)

-- 1. Leads Table (if not exists)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    fleet_size VARCHAR(50) NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email_status VARCHAR(50) DEFAULT 'pending',
    email_error TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CMS Settings (Single row)
CREATE TABLE IF NOT EXISTS cms_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    site_name VARCHAR(255) DEFAULT 'GoGo',
    tagline VARCHAR(255) DEFAULT 'Fuel Delivery Made Easy',
    primary_color VARCHAR(50) DEFAULT '#FED75F',
    accent_color VARCHAR(50) DEFAULT '#ED6A21',
    contact_email VARCHAR(255) DEFAULT 'hello@gogo.bj',
    contact_phone VARCHAR(50) DEFAULT '+229 XX XX XX XX',
    default_language VARCHAR(10) DEFAULT 'en',
    CONSTRAINT single_row CHECK (id = 1)
);

-- Initialize default settings
INSERT INTO cms_settings (id, site_name)
VALUES (1, 'GoGo')
ON CONFLICT (id) DO NOTHING;

-- 3. CMS Pages (Content)
CREATE TABLE IF NOT EXISTS cms_pages (
    slug VARCHAR(50) PRIMARY KEY,
    content JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. CMS SEO (Metadata)
CREATE TABLE IF NOT EXISTS cms_seo (
    slug VARCHAR(50) PRIMARY KEY,
    title_en VARCHAR(255),
    title_fr VARCHAR(255),
    desc_en TEXT,
    desc_fr TEXT,
    keywords TEXT[], -- array of strings
    og_image VARCHAR(255),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. CMS Blog Posts
CREATE TABLE IF NOT EXISTS cms_posts (
    slug VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    seo_description TEXT,
    published_date TIMESTAMP WITH TIME ZONE NOT NULL,
    author VARCHAR(100),
    tags TEXT[],
    body TEXT NOT NULL, -- Markdown content
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Admin Users (for future use)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Bcrypt hash
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
