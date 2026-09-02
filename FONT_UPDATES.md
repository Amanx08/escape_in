# Font Family Updates - India Escapes

## Overview
Updated font families across the website for a consistent, professional look:
- **Headings**: Playfair Display (elegant serif)
- **Subheadings & Body Text**: Inter (clean, modern sans-serif)

## Changes Made

### 1. CSS Foundation (`src/app/globals.css`)
- **Google Fonts Import**: Both Playfair Display and Inter are imported
- **CSS Variables**: `--font-playfair` and `--font-inter`
- **Base Styles**: 
  - All `h1-h6` tags automatically use Playfair Display
  - Body text uses Inter by default
  - Proper font smoothing applied

### 2. Tailwind Configuration (`tailwind.config.ts`)
- Extended theme with:
  - `font-display` utility class for Playfair Display
  - `font-sans` utility class for Inter (default)
- Supports responsive design out of the box

### 3. Utility Component Classes (New)
Added semantic CSS classes in `src/app/globals.css` for consistent usage:

#### Heading Utilities (Playfair Display)
```css
.heading-h1  /* Largest heading (text-4xl → text-6xl) */
.heading-h2  /* Major section heading (text-3xl → text-5xl) */
.heading-h3  /* Subsection heading (text-2xl → text-4xl) */
.heading-h4  /* Card/small heading (text-xl → text-3xl) */
```

#### Subheading Utilities (Inter)
```css
.subheading-lg  /* Large subheading (text-lg → text-xl) */
.subheading-md  /* Medium subheading (text-base → text-lg) */
.subheading-sm  /* Small subheading (text-sm → text-base) */
```

#### Body Text Utilities (Inter)
```css
.body-lg   /* Large body text (text-base → text-lg) */
.body-md   /* Standard body text (text-sm → text-base) */
.body-sm   /* Small body text (text-xs → text-sm) */
```

### 4. Updated Components

#### Footer Component (`src/components/layout/Footer.tsx`)
- Main heading: Uses `.heading-h2`
- Body text: Uses `.body-lg`
- Removed inline font-family styles

#### Hero Section (`src/components/hero/HeroSection.tsx`)
- Page heading: Uses `.heading-h1`
- Subheading: Uses `.subheading-lg`
- Cleaner, more maintainable code

#### Blog Hub (`src/components/blog/BlogHub.tsx`)
- Page heading: Uses `.heading-h1`
- Body content: Uses `.body-lg`

#### Enquiry Form (`src/components/forms/EnquiryForm.tsx`)
- Form headings: Uses `.heading-h2` and `.heading-h3`
- Body text: Uses `.body-md`

#### Contact Form (`src/components/forms/ContactForm.tsx`)
- Success message heading: Uses `.heading-h2`
- Body text: Uses `.body-md`

#### Collections Section (`src/components/sections/CollectionsSection.tsx`)
- Card headings: Uses `.heading-h4`

#### Tour Template (`src/components/tours/TourTemplate.jsx`)
- Tour title: Uses `.heading-h1`

## Usage Guide

### For New Components
Use the utility classes instead of inline styles:

```jsx
// ❌ Don't do this
<h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
  Heading
</h2>

// ✅ Do this
<h2 className="heading-h2">Heading</h2>
```

### For Paragraphs
```jsx
// Regular body text
<p className="body-md">This is a paragraph.</p>

// Larger body text
<p className="body-lg">Important paragraph.</p>

// Small body text
<p className="body-sm">Fine print.</p>
```

### For Subheadings/Emphasis
```jsx
// Important subtitle (not a full heading)
<p className="subheading-md">Important Information</p>
```

## Responsive Sizing
All utility classes include responsive breakpoints (sm, md, lg) for optimal sizing across devices:
- Mobile phones: Smaller sizes
- Tablets: Medium sizes
- Desktops: Larger sizes

## Accessibility
- Maintains proper heading hierarchy
- Font sizes follow WCAG guidelines
- Good contrast ratios with backgrounds
- Proper line-height for readability

## Font Weights
- **Playfair Display**: 400 (regular), 600 (semibold), 700 (bold)
- **Inter**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## Build Status
✅ All components compile successfully with the new font configuration
✅ All 114 pages build without errors
✅ No TypeScript errors
