---
name: Kinetic Flow
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#684000'
  on-tertiary: '#ffffff'
  tertiary-container: '#885500'
  on-tertiary-container: '#ffd4a4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 0.75rem
  md: 1rem
  lg: 1.5rem
  xl: 2.5rem
  gutter: 1.5rem
  margin: 2rem
---

## Brand & Style

The brand personality is efficient, decisive, and focused. It targets high-performance teams and individuals who require a tool that feels fast and reliable. The design style follows a **Corporate / Modern** aesthetic with **Minimalist** tendencies—prioritizing high-contrast information density without visual clutter. 

The UI should evoke a sense of "Flow State"—calm through organization, but energetic through precise interactions. By using a "Dark Mode" first approach (or high-contrast Light Mode), the system highlights task status and priorities using a vibrant semantic palette against a disciplined neutral backdrop. High contrast is used specifically for data points and status indicators to ensure zero ambiguity in task states.

## Colors

This design system utilizes a structured semantic palette to provide instant visual feedback on task status and priority levels.

- **Primary (Indigo):** Used for primary actions, selection states, and brand presence.
- **Success (Emerald):** Exclusively for "Done" or "Completed" states.
- **Active (Amber):** Highlights "In Progress" or "Current" tasks to demand attention without signaling danger.
- **Priority Scale:** Uses a high-visibility gradient from Rose (High) to Orange (Medium) and Slate (Low) to categorize urgency.
- **Neutrals:** A deep Slate/Zinc palette is used for text and borders to maintain a professional, high-contrast look that remains easy on the eyes during long sessions.

## Typography

The typography system relies on **Inter** to provide a systematic, utilitarian feel that excels in data-heavy environments. 

- **Hierarchy:** Dramatic contrast between headlines and body text ensures users can scan task lists quickly.
- **Readability:** Generous line heights are maintained for body text to prevent "wall of text" fatigue in task descriptions.
- **Labels:** Small caps or slightly tracked-out labels are used for metadata like tags, dates, and priority badges to distinguish them from actionable task titles.

## Layout & Spacing

The layout philosophy uses a **Fluid Grid** with a relaxed spacing rhythm to counteract the high information density typical of task managers.

- **The 8px Grid:** All spacing and dimensions are multiples of 4px/8px to ensure a clean, mathematical visual alignment.
- **Relaxed Padding:** Task items and sidebar links feature generous vertical padding (12px to 16px) to reduce accidental clicks and improve scanability.
- **Responsive Behavior:** 
  - **Desktop:** A fixed-width sidebar (240px-280px) with a fluid main content area.
  - **Tablet:** Sidebar collapses into a hamburger menu or narrow icon bar; content margins reduce to 24px.
  - **Mobile:** Single column layout with 16px horizontal margins. Task actions move to a bottom sheet or a sticky FAB (Floating Action Button).

## Elevation & Depth

Visual hierarchy is established using **Tonal Layers** combined with **Ambient Shadows**. 

- **Surface Levels:** The background uses the lightest neutral, while cards and the main work area use white (in light mode) or a slightly elevated slate (in dark mode).
- **Shadows:** Use a "soft-depth" approach. Shadows should be highly diffused with low opacity (e.g., `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)`).
- **Interactions:** When a task card is dragged, its elevation should increase using a larger, more spread shadow to simulate physical lift.
- **Modals:** Use a heavy backdrop blur (8px-12px) to keep the user focused on the task at hand while maintaining context of the list behind it.

## Shapes

The design system uses a **Rounded** shape language to soften the professional tone and make the interface feel modern and accessible.

- **Standard Elements:** Buttons, input fields, and checkboxes use a `0.5rem` (8px) radius.
- **Containers:** Task cards and project sections utilize the `rounded-xl` (12px) specification to create a distinct framing effect.
- **Badges:** Priority and status badges use a full pill-shape (9999px) to differentiate them from square-ish buttons and task cards.

## Components

### Buttons & Inputs
- **Primary Button:** Solid Indigo fill, white text, 8px border radius. On hover, darken the fill slightly.
- **Ghost Inputs:** Input fields should have a 1px border (`#E2E8F0`) that turns Indigo on focus. No inner shadow.

### Task Cards
- **Structure:** White background, 12px radius, 1px subtle border. 
- **Hover State:** Subtle lift with a soft shadow and a slight border-color shift to Indigo.

### Status & Priority Badges
- **Visuals:** Use a "soft-tint" background (10-15% opacity of the semantic color) with high-contrast text of the same hue.
- **Icons:** Use small 12px stroke icons (e.g., a circle for status, a flag for priority) within the badge for faster recognition.

### Lists & Navigation
- **Navigation Items:** Use a 4px "active indicator" bar on the left side of the active menu item.
- **Checkboxes:** Custom-styled square with a 4px radius. When checked, fill with Success Emerald and show a white checkmark.

### Progress Indicators
- **Linear Progress:** Use a thin (4px) track with rounded ends. The progress fill should be the Primary Indigo or Success Emerald depending on completion context.