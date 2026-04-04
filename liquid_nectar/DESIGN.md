# Design System Document: Liquid Gastronomy

## 1. Overview & Creative North Star: "The Fluid Market"
This design system rejects the rigid, boxy constraints of traditional e-commerce. Our Creative North Star is **"The Fluid Market"**—a digital experience that feels as fresh, organic, and vibrant as a cold-pressed juice. We achieve this through a "Liquid Editorial" approach: a high-end, tactile interface where elements don't just sit on a grid; they float, flow, and interact like physical objects in a premium space.

To break the "template" look, we utilize:
*   **Intentional Asymmetry:** Overlapping "liquid" blobs and off-center imagery to create a sense of movement.
*   **Hyper-Roundedness:** Utilizing the `xl` (3rem) and `lg` (2rem) scales to mimic the soft curves of fruit and glassware.
*   **Editorial Scaling:** Dramatically large display type paired with generous whitespace to elevate street food into a gourmet experience.

---

## 2. Colors & The Surface Philosophy
The palette is a high-contrast blend of "Zest" (Mango/Orange) and "Freshness" (Mint), anchored by a sophisticated "Soft Cream" base.

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited.** Separation of concerns must be achieved through:
1.  **Background Shifts:** Placing a `surface-container-low` card on a `surface` background.
2.  **Tonal Transitions:** Using the subtle difference between `surface-container` and `surface-bright`.
3.  **Glassmorphism:** Using `backdrop-blur` (12px–20px) to define boundaries via texture rather than lines.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of frosted glass. 
*   **Base:** `surface` (#FFF9F0) – The primary canvas.
*   **Level 1:** `surface-container-low` – Used for large section groupings.
*   **Level 2:** `surface-container` – For secondary interactive elements.
*   **Top Tier:** `surface-container-highest` – For critical floating actions (e.g., "Add to Cart").

### Signature Textures & Liquid Gradients
To inject "soul," use liquid gradients for CTAs and Hero sections.
*   **The "Mango Melt":** `primary` (#705D00) to `primary_container` (#FFD93D) at a 135-degree angle.
*   **The "Mint Spritz":** `secondary` (#006E29) to `secondary_container` (#93F59C).

---

## 3. Typography: The Friendly Authority
We pair the geometric playfulness of **Poppins** with the surgical precision of **Inter**.

*   **Display & Headlines (Poppins):** Set to Bold (700). These are your "shouting" flavors. Use `display-lg` for hero titles with tight letter-spacing (-0.02em) to give it a premium, editorial punch.
*   **Body & Labels (Inter):** Set to Regular (400) or Medium (500). Inter provides the "utility" and legibility required for menus and nutritional info. 
*   **Hierarchy Tip:** Never use Poppins for body text; it loses its "signature" feel when used for long-form reading. Keep Poppins reserved for the "Brand Voice."

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "dirty" for this aesthetic. We use **Ambient Depth**.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` card on a `surface-container-low` background. The shift in tone creates a "soft lift."
*   **Ambient Shadows:** When an element must float (e.g., a Bottom Sheet), use: 
    *   `box-shadow: 0 20px 40px rgba(112, 93, 0, 0.08);` (A tinted shadow using the `primary` hue).
*   **Glassmorphism (The "Frost" Rule):** For overlays, use `surface` at 70% opacity with a `backdrop-filter: blur(16px)`. This allows the vibrant food photography to "bleed" through the UI, creating a lush, integrated feel.
*   **Ghost Borders:** If a boundary is required for accessibility, use `outline-variant` at 15% opacity. Never use 100% opacity.

---

## 5. Components: Tactile & Bouncy

### Buttons (The "Juicy" CTA)
*   **Primary:** Uses the "Mango Melt" gradient, `xl` (3rem) corner radius, and a subtle 4% inner-glow on the top edge.
*   **Secondary:** Glassmorphic. Semi-transparent `secondary_container` with a heavy backdrop blur.
*   **Interaction:** On press, scale the button down to 0.96 with a `cubic-bezier(0.34, 1.56, 0.64, 1)` (Bouncy) transition.

### Cards & Lists (The "Anti-Grid")
*   **Forbid Dividers:** Use `spacing-6` (2rem) of vertical whitespace to separate menu items.
*   **The Card:** Must use `rounded-lg` (2rem). Content should feel "padded"—never let text get within 24px of the card edge.
*   **Image Treatment:** Food images should "break" the container, slightly overlapping the card boundaries to create 3D depth.

### Chips (Flavor Tags)
*   **Style:** Pill-shaped (`rounded-full`). Use `tertiary_container` for spicy items and `secondary_container` for vegan/fresh items. 
*   **Motion:** Selection should feel like a "pop"—a quick scale-up and snap back.

### Input Fields
*   **Style:** `surface-container-low` background, no border. On focus, the background shifts to `surface-bright` with a 2px `primary` "Ghost Border" (20% opacity).

---

## 6. Do’s and Don’ts

### Do:
*   **DO** use "Liquid Motion": Elements should slide in with a slight overshoot (bounce).
*   **DO** use high-quality photography with the background removed for hero sections to facilitate overlapping.
*   **DO** lean into the `xl` (3rem) spacing for margins to give the "Premium" feel. Space = Luxury.

### Don’t:
*   **DON'T** use pure black (#000000). Use `on-surface` (#1D1B16) for all text to maintain the warmth of the Soft Cream base.
*   **DON'T** use 90-degree corners. Even "small" elements should have at least `rounded-sm` (0.5rem).
*   **DON'T** stack more than three layers of glass; the interface will become muddy and lose its "frosted" clarity.