# Shivaay Design System

A comprehensive design system inspired by the Shivaay landing page aesthetics, featuring glassmorphism effects, smooth animations, and gradient styling.

## 🎨 Design Philosophy

The Shivaay design system is built around these core principles:

- **Glassmorphism**: Beautiful translucent effects with backdrop blur
- **Smooth Animations**: Carefully crafted motion that enhances user experience
- **Gradient Aesthetics**: Rich color gradients inspired by modern design trends
- **Consistent Spacing**: Systematic approach to layout and typography
- **Responsive Design**: Mobile-first approach with seamless scaling

## 🚀 Key Features

### Color System
- **Primary Gradients**: Blue to purple (`#667eea` → `#764ba2`)
- **Secondary Gradients**: Pink to red (`#f093fb` → `#f5576c`)  
- **Accent Gradients**: Cyan to blue (`#4facfe` → `#00f2fe`)
- **Semantic Colors**: Consistent color palette for different UI states

### Visual Effects
- **Glass Effects**: Three levels of glassmorphism (light, medium, strong)
- **Glow Animations**: Pulsing glow effects for emphasis
- **Shimmer Effects**: Animated shimmer overlays
- **Float Animations**: Subtle floating movements
- **Hover Transformations**: Scale and translate effects

### Typography
- **Primary Font**: Red Hat Display
- **Monospace**: Red Hat Mono
- **Display**: Orbitron
- **Body Text**: DMSans

## 📦 Components

### Core Components

#### AnimatedButton
Enhanced button component with multiple variants and animations.

```tsx
import AnimatedButton from '../components/ui/AnimatedButton/AnimatedButton';

<AnimatedButton 
  variant="primary" 
  size="lg" 
  shimmer 
  glow
>
  Get Started
</AnimatedButton>
```

**Variants**: `primary` | `secondary` | `success` | `warning` | `danger` | `ghost` | `outline` | `glass` | `gradient`
**Sizes**: `sm` | `md` | `lg` | `xl` | `icon` | `icon-sm` | `icon-lg`

#### Card
Flexible card component with glassmorphism effects.

```tsx
import Card from '../components/ui/Card/Card';

<Card 
  variant="glass" 
  hoverable 
  glow 
  className="p-6"
>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

**Variants**: `default` | `elevated` | `glass` | `gradient` | `feature` | `interactive`
**Padding**: `none` | `sm` | `md` | `lg` | `xl`

### Utility Components

#### GlassContainer
Glassmorphism container with customizable blur levels.

```tsx
import { GlassContainer } from '../lib/styled-components';

<GlassContainer 
  variant="medium" 
  rounded="xl" 
  glow
  className="p-6"
>
  Content with glass effect
</GlassContainer>
```

#### GradientText
Text with gradient color effects.

```tsx
import { GradientText } from '../lib/styled-components';

<GradientText 
  as="h1" 
  variant="hero" 
  className="text-4xl font-bold"
>
  Beautiful Gradient Text
</GradientText>
```

#### FeatureCard
Specialized card for showcasing features.

```tsx
import { FeatureCard } from '../lib/styled-components';

<FeatureCard
  icon="🚀"
  title="Fast Performance"
  description="Optimized for speed and smooth experience"
  color="blue"
/>
```

#### GlowingButton
Button with enhanced glow and shimmer effects.

```tsx
import { GlowingButton } from '../lib/styled-components';

<GlowingButton 
  variant="primary" 
  size="lg" 
  shimmer
>
  Launch App
</GlowingButton>
```

## 🎭 Animations

### Animation Variants
Pre-defined animation variants for consistent motion.

```tsx
import { 
  containerVariants, 
  itemVariants, 
  featureVariants,
  buttonHoverVariants 
} from '../lib/animations';

// Container with staggered children
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item, index) => (
    <motion.div key={index} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### CSS Animations
Utility classes for common animations.

```css
/* Float animation */
.animate-float

/* Glow animation */  
.animate-glow

/* Tilt animation */
.animate-tilt

/* Shimmer effect */
.animate-shimmer

/* Pulse glow */
.animate-pulse-glow
```

## 🎨 Styling System

### CSS Custom Properties
The design system uses CSS custom properties for consistent theming.

```css
:root {
  /* Colors */
  --primary-gradient-start: #667eea;
  --primary-gradient-end: #764ba2;
  
  /* Glass Effects */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  
  /* Shadows */
  --glow-primary: 0 0 20px rgba(139, 92, 246, 0.3);
  --shadow-primary: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

### Utility Classes

#### Glass Effects
```css
.glass                /* Light glassmorphism */
.glass-strong         /* Strong glassmorphism */
```

#### Gradients
```css
.gradient-primary     /* Primary blue-purple gradient */
.gradient-secondary   /* Secondary pink-red gradient */
.gradient-accent      /* Accent cyan-blue gradient */
```

#### Text Gradients
```css
.text-gradient-primary    /* Primary gradient text */
.text-gradient-secondary  /* Secondary gradient text */
.text-gradient-accent     /* Accent gradient text */
.text-gradient-hero       /* Hero section gradient text */
```

## 🔧 Usage Guidelines

### Component Structure
Follow this pattern for consistent component implementation:

```tsx
"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";

export interface ComponentProps {
  // Props interface
}

const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          // Base classes
          // Variant classes
          // Custom classes
        )}
        // Animation props
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Component.displayName = "Component";
export default Component;
```

### Animation Guidelines
- Use consistent easing: `[0.25, 0.46, 0.45, 0.94]`
- Keep durations between 150ms-500ms for UI interactions
- Use staggered animations for lists and grids
- Implement proper reduced motion handling

### Color Usage
- Primary: Main actions, navigation, key UI elements
- Secondary: Support actions, less critical elements  
- Accent: Highlights, call-to-action elements
- Semantic: Success, warning, error states

### Spacing System
Follow the 4px grid system:
- `4px` increments for small spacing
- `8px` increments for medium spacing  
- `16px` increments for large spacing
- `32px` increments for section spacing

## 🛠 Development

### Adding New Components
1. Create component in `src/components/ui/[ComponentName]/`
2. Follow the established pattern and interface design
3. Add variants to `src/lib/variants.ts` if needed
4. Export from `src/components/ui/index.ts`
5. Add animation variants to `src/lib/animations.ts` if needed

### Customizing Animations
Add new animation variants to `src/lib/animations.ts`:

```tsx
export const customVariants: Variants = {
  hidden: { /* initial state */ },
  visible: { /* animated state */ },
};
```

### Extending Theme
Update `src/lib/theme.ts` to add new design tokens:

```tsx
export const theme = {
  colors: {
    // Add new colors
  },
  gradients: {
    // Add new gradients
  },
  // Other design tokens
};
```

## 📱 Responsive Design

The design system is built mobile-first with these breakpoints:
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

All components include responsive classes and scale appropriately across devices.

## ⚡ Performance

### Optimization Features
- GPU-accelerated animations with `transform3d`
- Efficient backdrop-filter usage
- Optimized animation timing
- Lazy loading for complex effects
- Reduced motion support

### Best Practices
- Use `will-change` for animated elements
- Prefer `transform` over layout properties
- Implement proper cleanup for animations
- Use `transform-gpu` for hardware acceleration

## 🎯 Examples

See `src/examples/DesignSystemExample.tsx` for comprehensive usage examples of all components and patterns.

## 🚀 Migration Guide

### From Basic Components
1. Replace basic buttons with `AnimatedButton`
2. Wrap content in `GlassContainer` for glassmorphism
3. Use `GradientText` for enhanced typography
4. Apply motion variants for animations

### From Other Design Systems
1. Map existing color tokens to Shivaay theme
2. Replace animation libraries with built-in variants
3. Update component props to match new interfaces
4. Implement glassmorphism gradually

---

*This design system brings the beautiful aesthetics of the Shivaay landing page to your entire application, creating a cohesive and engaging user experience.*
