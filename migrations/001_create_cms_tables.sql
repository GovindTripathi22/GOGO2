-- ============================================================================
-- GoGo CMS Database Schema — Migration UP
-- Version: 001
-- Created: 2026-01-17
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PAGES — Slug-based content containers
-- ============================================================================
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    page_type VARCHAR(50) DEFAULT 'page',
    fr_required BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_type ON pages(page_type);

COMMENT ON TABLE pages IS 'Content containers identified by slug';
COMMENT ON COLUMN pages.fr_required IS 'If true, French translation must be published for page to be visible in FR';

-- ============================================================================
-- PAGE_TRANSLATIONS — Versioned, per-locale content
-- ============================================================================
CREATE TABLE IF NOT EXISTS page_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    locale VARCHAR(5) NOT NULL CHECK (locale IN ('en', 'fr')),
    title VARCHAR(255),
    body JSONB,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_image_url TEXT,
    version INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    scheduled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (page_id, locale)
);

CREATE INDEX IF NOT EXISTS idx_translations_page ON page_translations(page_id);
CREATE INDEX IF NOT EXISTS idx_translations_published ON page_translations(is_published) WHERE is_published = true;

COMMENT ON TABLE page_translations IS 'Localized content for pages with publish workflow';
COMMENT ON COLUMN page_translations.body IS 'JSON structure containing all editable content fields';
COMMENT ON COLUMN page_translations.scheduled_at IS 'If set, content will auto-publish at this time';

-- ============================================================================
-- CONTENT_HISTORY — Version snapshots (last 3 per translation)
-- ============================================================================
CREATE TABLE IF NOT EXISTS content_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    translation_id UUID NOT NULL REFERENCES page_translations(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    body JSONB,
    title VARCHAR(255),
    changed_by VARCHAR(255),
    change_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_history_translation ON content_history(translation_id, version DESC);

COMMENT ON TABLE content_history IS 'Stores last 3 versions of each translation for rollback';

-- ============================================================================
-- FAQS — FAQ entries with categories
-- ============================================================================
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(50) DEFAULT 'general',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(is_active) WHERE is_active = true;

-- ============================================================================
-- FAQ_TRANSLATIONS — Localized FAQ content with full-text search
-- ============================================================================
CREATE TABLE IF NOT EXISTS faq_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faq_id UUID NOT NULL REFERENCES faqs(id) ON DELETE CASCADE,
    locale VARCHAR(5) NOT NULL CHECK (locale IN ('en', 'fr')),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    is_published BOOLEAN DEFAULT false,
    search_vector TSVECTOR GENERATED ALWAYS AS (
        to_tsvector('english', coalesce(question, '') || ' ' || coalesce(answer, ''))
    ) STORED,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (faq_id, locale)
);

CREATE INDEX IF NOT EXISTS idx_faq_translations_faq ON faq_translations(faq_id);
CREATE INDEX IF NOT EXISTS idx_faq_search ON faq_translations USING GIN(search_vector);

COMMENT ON COLUMN faq_translations.search_vector IS 'Full-text search vector for fast FAQ search';

-- ============================================================================
-- BLOG_POSTS — Blog entries
-- ============================================================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(200) UNIQUE NOT NULL,
    author VARCHAR(255),
    featured_image_url TEXT,
    tags TEXT[],
    published_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_date ON blog_posts(published_date DESC);

-- ============================================================================
-- BLOG_TRANSLATIONS — Localized blog content
-- ============================================================================
CREATE TABLE IF NOT EXISTS blog_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    locale VARCHAR(5) NOT NULL CHECK (locale IN ('en', 'fr')),
    title VARCHAR(255) NOT NULL,
    body TEXT,
    excerpt TEXT,
    seo_title VARCHAR(255),
    seo_description TEXT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (post_id, locale)
);

CREATE INDEX IF NOT EXISTS idx_blog_translations_post ON blog_translations(post_id);

-- ============================================================================
-- MEDIA_META — Video/image settings (CDN-ready)
-- ============================================================================
CREATE TABLE IF NOT EXISTS media_meta (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    url TEXT,
    cdn_url TEXT,
    is_enabled BOOLEAN DEFAULT true,
    caption_en TEXT,
    caption_fr TEXT,
    alt_text_en VARCHAR(255),
    alt_text_fr VARCHAR(255),
    file_type VARCHAR(50),
    file_size_bytes BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_key ON media_meta(key);

COMMENT ON TABLE media_meta IS 'Metadata for videos/images. Files stored in public/ or CDN, not in DB';
COMMENT ON COLUMN media_meta.cdn_url IS 'CDN URL for production (S3, Cloudinary, etc.)';

-- ============================================================================
-- AUDIT_LOGS — Audit log for all system actions
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255),
    action VARCHAR(50) NOT NULL,
    details JSONB,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_logs(user_email);
CREATE INDEX IF NOT EXISTS idx_audit_date ON audit_logs(created_at DESC);

COMMENT ON TABLE audit_logs IS 'Audit log tracking all system actions';

-- ============================================================================
-- LEADS — Enhanced with idempotency
-- ============================================================================
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    idempotency_key VARCHAR(100) UNIQUE,
    company_name VARCHAR(255),
    fleet_size VARCHAR(50),
    fuel_type VARCHAR(50),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    source VARCHAR(100) DEFAULT 'website',
    status VARCHAR(50) DEFAULT 'new',
    notes TEXT,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_idempotency ON leads(idempotency_key);

COMMENT ON COLUMN leads.idempotency_key IS 'Prevents duplicate submissions (email+timestamp hash)';

-- ============================================================================
-- LEAD_NOTIFICATIONS — Email send tracking
-- ============================================================================
CREATE TABLE IF NOT EXISTS lead_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    notification_type VARCHAR(50) DEFAULT 'email',
    recipient VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    sendgrid_message_id VARCHAR(255),
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    last_retry_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    sent_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_notifications_lead ON lead_notifications(lead_id);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON lead_notifications(status);

-- ============================================================================
-- ADMIN_USERS — Authorized admin emails
-- ============================================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- Nullable for now to support migration, but code will enforce it
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_email ON admin_users(email);

-- ============================================================================
-- AUTH_TOKENS — Magic link hash storage (Zero Trust)
-- ============================================================================
CREATE TABLE IF NOT EXISTS auth_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_auth_hash ON auth_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_auth_email ON auth_tokens(email);

-- ============================================================================
-- SEED: Initial hero video entry
-- ============================================================================
INSERT INTO media_meta (key, url, is_enabled, caption_en, caption_fr, file_type)
VALUES ('hero_video', '/assets/videos/hero-loop.mp4', false, 'GoGo Fuel Delivery', 'Livraison GoGo', 'video/mp4')
ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- FUNCTIONS: Auto-update updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_translations_updated_at BEFORE UPDATE ON page_translations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_translations_updated_at BEFORE UPDATE ON faq_translations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_translations_updated_at BEFORE UPDATE ON blog_translations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_meta_updated_at BEFORE UPDATE ON media_meta
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- End of Migration UP
-- ============================================================================
