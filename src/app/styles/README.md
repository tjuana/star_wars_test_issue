# Styles Guide

## Design Tokens
- All design tokens are defined in `@theme` section of `tailwind.css`
- Use CSS variables like `var(--color-secondary)` instead of hardcoded colors
- Colors, spacing, shadows, and animations are centralized

## Component Classes
Use these component classes from `@layer components` instead of utility chains:

### Cards
- `.card` - Base card styling
- `.card-hover` - Hover effects (lift + shadow)
- `.card-press` - Press effects (slight down movement)

### Sections
- `.section` - Page content blocks
- `.section-title` - Section headings with underline
- `.section-subtle` - Alternative background

### Buttons
- `.btn` - Base button styles
- `.btn-primary` - Primary action (blue)
- `.btn-outline` - Outlined button
- `.btn-ghost` - Text-only button
- `.btn-danger` - Destructive action (red)
- `.btn-sm` / `.btn-lg` - Size variants
- `.btn-full` - Full width

### Form Elements
- `.input` - Text inputs with consistent styling

### Layout
- `.people-grid` - Responsive grid for character cards (1/2/3/4 columns)
- `.people-grid-3` - Fixed 3-column grid for 9 items per page

### UI Components
- `.badge` - Small status indicators
- `.pill` - Larger status elements
- `.accordion` - Expandable content sections

## Rules
1. **No hardcoded colors** - Use design tokens from `@theme`
2. **No utility duplication** - Extract repeated patterns to component classes
3. **Consistent spacing** - Use component classes for common patterns
4. **Accessibility first** - Maintain focus states and contrast ratios
5. **Visual consistency** - Same patterns look the same across the app

## Migration
When refactoring:
1. Replace long utility chains with component classes
2. Remove hardcoded colors in favor of tokens
3. Ensure hover/focus states are preserved
4. Test accessibility and visual consistency
