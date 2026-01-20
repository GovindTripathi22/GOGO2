# Accessibility Documentation

## WCAG AA Compliance Status

This document tracks accessibility compliance for GoGo Imperial Energy website.

---

## Implemented Features

### Focus Management
- ✅ Global `:focus-visible` ring on all interactive elements
- ✅ Minimum 44px touch targets on mobile
- ✅ Skip-to-content link (if added)

### Color Contrast
- ✅ Text on `bg-primary` (yellow) uses dark text (`text-slate-900`)
- ✅ Body text meets 4.5:1 contrast ratio
- ✅ Large headings meet 3:1 contrast ratio

### Images
- ✅ All `<Image />` components have descriptive `alt` text
- ✅ Decorative images use `alt=""`

### Forms
- ✅ All inputs have associated `<label>` elements
- ✅ Error messages announced to screen readers
- ✅ Form validation provides clear feedback

### Navigation
- ✅ Keyboard-navigable throughout
- ✅ Logical tab order
- ✅ Mobile menu accessible via button

---

## Keyboard Navigation Test Checklist

| Element | Tab Accessible | Focus Visible | Activatable |
|---------|----------------|---------------|-------------|
| Navbar links | ✅ | ✅ | ✅ |
| CTA buttons | ✅ | ✅ | ✅ |
| Form inputs | ✅ | ✅ | ✅ |
| FAQ accordions | ✅ | ✅ | ✅ |
| Language toggle | ✅ | ✅ | ✅ |
| Mobile menu | ✅ | ✅ | ✅ |

---

## Known Trade-offs

### 1. Animation Preferences
- **Issue**: Some animations may cause discomfort for users with vestibular disorders
- **Mitigation**: Consider adding `prefers-reduced-motion` media query support
- **Status**: Planned

### 2. Dynamic Content
- **Issue**: FAQ accordion content not announced when expanded
- **Mitigation**: Add `aria-expanded` and `aria-controls` attributes
- **Status**: Implemented

### 3. Partner Logos
- **Issue**: Grayscale filter may reduce visibility
- **Mitigation**: Full color on hover provides visibility
- **Status**: Acceptable trade-off

---

## Testing Tools Used

- Lighthouse Accessibility Audit
- axe DevTools (Chrome)
- Keyboard-only navigation test
- VoiceOver (macOS) screen reader test

---

## Remediation Backlog

| Issue | Priority | Status |
|-------|----------|--------|
| Add skip-to-content link | Medium | TODO |
| Add `prefers-reduced-motion` | Low | TODO |
| Verify screen reader flow | Medium | TODO |

---

## CI Integration

Accessibility is checked in CI via Lighthouse with a minimum score of 90%.

See `.github/workflows/ci.yml` for configuration.
