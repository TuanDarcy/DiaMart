# AI UI/UX Guidance for DiaMart

## Purpose

This document turns the local reference repository at `docs/references/ui-ux-pro-max-skill` into a practical design and implementation guide for AI coding assistants working on DiaMart UI.

The goal is to help Copilot, DeepSeek, and similar assistants produce UI code that is:

- aligned with DiaMart product direction,
- consistent with the existing design system,
- safe for a marketplace UI,
- and compatible with the current Next.js + TypeScript + Tailwind codebase.

## What the reference repo contributes

The downloaded reference repository provides a curated knowledge base for UI/UX work, including:

- UI style guidance and anti-patterns,
- industry-specific reasoning rules,
- color palette recommendations,
- typography pairing suggestions,
- accessibility and UX principles,
- responsive layout guidance.

For DiaMart, these materials should be used as decision support, not as a replacement for the project’s confirmed product requirements.

## DiaMart UI profile

### Product context

DiaMart is a premium, trustworthy Roblox item marketplace. The UI should feel:

- professional,
- fast and reliable,
- polished but not overly luxurious,
- modern and slightly aggressive,
- never childish, cluttered, or fake-looking.

### Recommended design direction

Use the following as the default UI direction for storefront work:

- Pattern: hero-centric + trust-driven + clear CTA,
- Style: premium dark UI with restrained purple-magenta accents,
- Mood: confident, modern, safe, and high-value,
- Motion: subtle and polished, never flashy or distracting,
- Copy: English only, concise and product-focused.

### Visual direction

- Background: very dark warm charcoal (`#08080F`),
- Surfaces: elevated dark panels with controlled purple accent borders,
- Primary action: clean purple-to-magenta gradient for modern, premium feel,
- Secondary accent: amber (`#F59E0B`) for warm highlights and trust signals,
- Success: green only for true success states,
- Warning: amber for preview or limited states,
- Error: red only for real errors or unavailable actions,
- Text: high-contrast with strong readability (purple-white primary).

### Typography direction

- Headings and prominent UI labels: Bricolage Grotesque,
- Body copy and supporting text: Fira Sans Regular,
- Buttons and strong labels: Fira Sans Bold.

If the exact font files are not available yet, the implementation should use the existing fallback variables and keep the hierarchy consistent.

## Rules for AI-generated UI work

### 1. Read the source of truth before editing

Before creating or changing UI, AI should read:

- `docs/project-overview.md`
- `docs/architecture.md`
- `docs/ui-components.md`
- the relevant feature document in `docs/features/` or `docs/ui/`

Do not rely only on the reference repo when the current code already has a different implementation approach.

### 2. Reuse existing components first

Prefer existing components and shared CSS tokens over creating new abstractions.

Examples:

- reuse the current storefront layout primitives,
- use existing tokens instead of inventing new color values,
- reuse the current money formatter and shared UI patterns.

### 3. Keep the UI honest

Do not invent fake metrics, fake orders, fake urgency, or fake social proof.

For DiaMart, the following are not allowed in UI copy or visuals:

- fake stock pressure,
- fake review counts,
- fake delivery proof claims,
- misleading countdown urgency,
- false payment success states.

### 4. Keep accessibility in mind

Every interactive UI should provide:

- visible focus states,
- sufficient contrast,
- keyboard-friendly behavior,
- responsive layout for mobile and desktop,
- reduced-motion support when animations are used.

### 5. Respect implementation scope

For this repository, the current UI scope is storefront planning and preview flows. Avoid introducing real payment, real delivery backend behavior, or other system logic unless the relevant docs explicitly confirm it.

## UI implementation checklist for AI

When generating or editing UI, confirm all of the following:

- The work matches the current DiaMart product direction.
- The component uses the existing design tokens and shared UI conventions.
- The layout is responsive and accessible.
- The copy is English and consistent with the current brand voice.
- The implementation avoids unsupported claims.
- The UI remains compatible with the Next.js App Router structure.
- The change does not place important business logic inside UI components.

## Prompt guidance for Copilot and DeepSeek

### Recommended prompt structure

Use prompts that include:

1. the target page or component,
2. the product context,
3. the visual direction,
4. the required behavior,
5. the constraints.

### Example prompt

"Implement a premium dark storefront card for DiaMart using the existing design tokens. Keep the UI trustworthy and modern, reuse the current component patterns, use English copy, support mobile responsiveness, and avoid fake urgency or unsupported claims."

### Stronger prompt for UI tasks

"For DiaMart, update the home page hero section to feel premium and trustworthy. Use the existing storefront theme, reuse current layout patterns, keep copy in English, preserve accessibility, and follow the project’s UI rules from docs/project-overview.md and docs/ui-components.md."

## Suggested working order for AI

1. Read the project docs and current component implementation.
2. Identify whether the task is a small UI tweak or a larger feature flow.
3. Reuse existing UI primitives and tokens.
4. Implement the UI with loading, empty, and error states where appropriate.
5. Verify accessibility and responsive behavior.
6. Check that the result matches the DiaMart direction instead of generic or overly trendy aesthetics.

## Quick rules to keep in mind

- Prefer polished and trustworthy over flashy.
- Prefer clarity over novelty.
- Prefer reuse over duplication.
- Prefer safe, factual presentation over hype.
- Prefer subtle motion over aggressive animation.
- Prefer inclusive design and strong readability.
