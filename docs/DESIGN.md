---
name: KiddoTour Design System
colors:
  surface: '#fcf8ff'
  surface-dim: '#dad6ff'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2ff'
  surface-container: '#efebff'
  surface-container-high: '#e9e5ff'
  surface-container-highest: '#e3dfff'
  on-surface: '#181445'
  on-surface-variant: '#4a4455'
  inverse-surface: '#2d2a5b'
  inverse-on-surface: '#f3eeff'
  outline: '#7b7487'
  outline-variant: '#ccc3d8'
  surface-tint: '#732ee4'
  primary: '#630ed4'
  on-primary: '#ffffff'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#d2bbff'
  secondary: '#8127cf'
  on-secondary: '#ffffff'
  secondary-container: '#9c48ea'
  on-secondary-container: '#fffbff'
  tertiary: '#7d3d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#a15100'
  on-tertiary-container: '#ffe0cd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb784'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#713700'
  background: '#fcf8ff'
  on-background: '#181445'
  surface-variant: '#e3dfff'
typography:
  display:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-xs: 4px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
  stack-xl: 80px
---

## Brand & Style
The design system focuses on a **Premium SaaS** aesthetic that balances the warmth of early childhood education with the high-precision engineering of top-tier technology platforms. It draws inspiration from the utility of Linear, the polish of Apple, and the vibrancy of Stripe.

The core visual narrative is built on **Translucent Sophistication**. By utilizing glassmorphism and multi-layered depth, the interface feels light and approachable while maintaining a rigorous professional structure. The emotional goal is to instill immediate trust in parents and administrators through "high-fidelity" visual cues—subtle gradients, micro-interactions, and expansive whitespace.

## Colors
The palette is anchored by a deep, authoritative violet, supported by softer purples and an optimistic sky blue. 

- **Primary & Secondary**: Used for brand moments, primary actions, and progress indicators.
- **Accent**: Reserved for highlights, badges, and secondary interactive elements to provide visual relief.
- **Surface Strategy**: The background is not a flat white; it uses a soft lavender tint (#FAFAFF) to reduce eye strain and provide a "premium paper" feel. Mesh gradients in the background should be extremely subtle, with a blur radius of at least 120px and opacity between 5-8%.

## Typography
The system employs **Geist** for headlines to leverage its technical precision and tight kerning, while **Inter** is used for body copy to ensure maximum legibility and a friendly, familiar tone.

Large headlines must use negative letter-spacing to achieve that "Apple-style" high-density look. For mobile, headline sizes scale down aggressively to maintain readability without excessive line-breaking. All labels and functional text (buttons, chips) use Geist for a sharper, more modern appearance.

## Layout & Spacing
This design system follows a **Fluid Fixed Grid**. Content is housed in a centered container with a maximum width of 1280px. 

The spacing rhythm is based on an 8px base unit, favoring generous "Apple-level" padding to allow elements to breathe.
- **Desktop**: 12-column grid, 24px gutters, 64px side margins.
- **Tablet**: 8-column grid, 20px gutters, 32px side margins.
- **Mobile**: 4-column grid, 16px gutters, 20px side margins.

Use `stack-xl` (80px) for separating major sections on landing pages to emphasize the minimalist, premium feel.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and high-diffusion shadows rather than solid fills.

- **The Glass Sheet**: Floating cards must use a `backdrop-filter: blur(20px)` with a semi-transparent white background (`rgba(255, 255, 255, 0.7)`).
- **Gradient Borders**: Elements should feature a 1px border. Use a subtle linear gradient (Top-Left to Bottom-Right) from `white/40%` to `white/10%` to simulate a light-catching edge.
- **Shadows**: Use "Deep Soft" shadows. Instead of one heavy shadow, stack two: 
  1. A tight 2px blur for definition.
  2. A wide 40px blur with 4% opacity of the Primary color (#7C3AED) to create an ambient glow.

## Shapes
The shape language is consistently **Rounded**, reflecting the friendly nature of a preschool-oriented platform. 

- Standard components (Inputs, Buttons) use **0.5rem (8px)**.
- Cards and main containers use **1rem (16px)**.
- Feature sections and large imagery use **1.5rem (24px)**.
- Buttons may occasionally use a full pill-shape (999px) for specific CTAs like "Book a Tour" to differentiate them from functional UI buttons.

## Components

### Buttons
Primary buttons use a subtle vertical gradient from Secondary to Primary. They feature a `box-shadow` that matches the button color at 20% opacity, which expands on hover. Transitions should be `200ms cubic-bezier(0.4, 0, 0.2, 1)`.

### Cards
Cards are the primary container. They must appear to float. Ensure the glass effect is visible against the background mesh gradients. Content inside cards should have a minimum of 32px internal padding.

### Input Fields
Inputs use a "floating label" pattern. The default state is a light grey border; on focus, the 1px gradient border activates, and a 4px soft violet outer glow (ring) appears. Validation feedback (success/error) should use small, high-quality icons paired with Geist-font labels.

### Chips & Badges
Chips use the Accent color (#38BDF8) with 10% opacity for the background and 100% opacity for the text. This creates a soft, legible highlight that doesn't compete with primary actions.

### Progress Indicators
For the booking funnel, use a stepped progress bar with "soft glow" active states. Completed steps should utilize the Success color (#22C55E) with a small checkmark icon.