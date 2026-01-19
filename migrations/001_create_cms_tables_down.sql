-- ============================================================================
-- GoGo CMS Database Schema — Migration DOWN (Rollback)
-- Version: 001
-- Created: 2026-01-17
-- ============================================================================

-- Drop triggers first
DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
DROP TRIGGER IF EXISTS update_page_translations_updated_at ON page_translations;
DROP TRIGGER IF EXISTS update_faqs_updated_at ON faqs;
DROP TRIGGER IF EXISTS update_faq_translations_updated_at ON faq_translations;
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
DROP TRIGGER IF EXISTS update_blog_translations_updated_at ON blog_translations;
DROP TRIGGER IF EXISTS update_media_meta_updated_at ON media_meta;
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;

-- Drop function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop tables in dependency order (children first)
DROP TABLE IF EXISTS admin_sessions CASCADE;
DROP TABLE IF EXISTS lead_notifications CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS content_audit CASCADE;
DROP TABLE IF EXISTS media_meta CASCADE;
DROP TABLE IF EXISTS blog_translations CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS faq_translations CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS content_history CASCADE;
DROP TABLE IF EXISTS page_translations CASCADE;
DROP TABLE IF EXISTS pages CASCADE;

-- ============================================================================
-- End of Migration DOWN
-- ============================================================================
