# Design Guidelines: Chataru Craft - Wooden Craft Ecommerce

## Design Approach
**Reference-Based: Artisan E-commerce**
Drawing inspiration from Etsy's handcrafted marketplace aesthetics and Shopify's modern boutique patterns, with emphasis on showcasing craftsmanship authenticity and natural warmth.

## Core Design Principles
1. **Craftsmanship First**: Every design element celebrates handmade quality and natural materials
2. **Tactile Feel**: Create visual warmth that conveys wood's organic texture
3. **Trust Through Transparency**: Showcase product details, materials, and crafting process
4. **Effortless Shopping**: Streamlined cart and checkout experience

## Typography
- **Primary Font**: 'Lora' (serif) for headings - evokes traditional craftsmanship
- **Secondary Font**: 'Inter' (sans-serif) for body text and UI elements - modern clarity
- **Hierarchy**: 
  - Hero headlines: text-5xl to text-6xl, font-semibold
  - Section headers: text-3xl to text-4xl, font-medium
  - Product titles: text-xl to text-2xl, font-semibold
  - Body text: text-base, font-normal
  - Button text: text-sm to text-base, font-medium

## Layout System
**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 24 for consistent rhythm
- Component padding: p-4 (mobile) to p-8 (desktop)
- Section spacing: py-12 (mobile) to py-24 (desktop)
- Grid gaps: gap-6 to gap-8
- Container: max-w-7xl with px-4 to px-8

## Component Library

### Navigation
- Fixed header with logo, category menu, search bar, cart icon with item count badge
- Mobile: Hamburger menu with slide-out drawer
- Sticky on scroll with subtle shadow

### Hero Section
- Full-width hero (h-[600px] to h-[700px]) featuring workshop or featured product
- Overlay gradient for text readability
- Primary CTA button with blurred background (backdrop-blur-md bg-white/20)
- Headline + subheadline + CTA structure

### Product Grid
- 2-column (mobile), 3-column (tablet), 4-column (desktop) grid
- Product cards: Image (aspect-square), title, price, quick "Add to Cart" button
- Hover: Subtle lift (scale-105) and shadow enhancement
- Category filters as pills/tags above grid

### Product Detail Page
- Two-column layout: Image gallery (60%) + Product info (40%)
- Image gallery: Main image + thumbnail strip below
- Product info: Title, price, description, materials, dimensions, quantity selector, "Add to Cart" CTA
- Accordion sections: "Crafting Process", "Care Instructions", "Shipping Info"

### Shopping Cart
- Side drawer (slides from right) overlay
- Cart items: Thumbnail, title, price, quantity controls, remove button
- Cart summary: Subtotal, shipping estimate, total
- "Checkout" CTA button (prominent)

### Featured Sections
- "Featured Products" carousel/grid
- "About Our Craft" with story + workshop image
- "Customer Reviews" masonry grid with photos
- "Categories" with image cards (Furniture, Décor, Kitchenware, etc.)

### Footer
- Four-column layout: About, Shop (categories), Support, Contact
- Newsletter signup with email input + submit button
- Social media icons
- Payment method badges
- Copyright and links

## Interaction Patterns
- Add to cart: Item flies to cart icon with bounce animation
- Image zoom on product detail hover
- Smooth scroll to sections
- Form validation with inline error messages
- Loading states for Stripe checkout

## Images

### Hero Image
Large, high-quality workshop or craftsman image (1920x700px) showing wooden crafts being made or beautiful finished pieces in natural lighting. Warm, inviting atmosphere with wood grain visible.

### Product Images
- Square format (800x800px minimum) on white or natural wood background
- Multiple angles for each product
- Detail shots showing wood grain, joints, and craftsmanship

### Category Images
- Lifestyle shots showing products in use (600x400px)
- Natural lighting emphasizing wood texture

### About Section
- Workshop/studio photo showing tools and crafting process
- Artisan portrait for authenticity

## Responsive Behavior
- Mobile: Stack columns, hamburger menu, touch-optimized buttons (min 44px height)
- Tablet: 2-3 column grids, show partial desktop navigation
- Desktop: Full multi-column layouts, hover states active

## Accessibility
- ARIA labels for cart icon ("Shopping cart, X items")
- Keyboard navigation for all interactive elements
- Focus indicators on form inputs and buttons
- Alt text for all product images describing the craft item
- Color contrast minimum 4.5:1 for text

## Performance Considerations
- Lazy load product images below fold
- Optimize hero image (WebP format)
- Skeleton loaders for product grid during fetch
- Icons via Heroicons CDN

This design balances authentic artisan aesthetics with modern e-commerce functionality, creating a trustworthy shopping experience that honors the handcrafted nature of wooden products.