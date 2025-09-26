# SCSS Structure

This project uses SCSS (Sass) for styling with a modular architecture.

## Folder Structure

```
scss/
├── base/
│   └── _reset.scss          # CSS reset and base styles
├── components/
│   ├── _buttons.scss        # Button styles
│   ├── _contact.scss        # Contact form and CTA styles
│   ├── _courses.scss        # Course cards and related styles
│   └── _features.scss       # Feature cards and grid
├── layout/
│   ├── _footer.scss         # Footer styles
│   ├── _hero.scss           # Hero section with animations
│   └── _navigation.scss     # Navigation and mobile menu
├── utils/
│   ├── _animations.scss     # Keyframe animations and utilities
│   ├── _mixins.scss         # Reusable mixins
│   └── _variables.scss      # Color, typography, and spacing variables
└── main.scss                # Main file that imports all modules
```

## Building CSS

### Option 1: Using npm (recommended)
```bash
npm install
npm run build:css      # Build compressed CSS for production
npm run watch:css      # Watch for changes and rebuild
npm run dev           # Development mode with source maps
```

### Option 2: Using the build script
```bash
./build-css.sh        # Requires global Sass installation
```

### Option 3: Manual compilation
```bash
sass scss/main.scss styles.css --style=compressed
```

## Key Features

- **Modular Architecture**: Organized into logical components
- **SCSS Variables**: Centralized color, typography, and spacing
- **Mixins**: Reusable styling patterns
- **Responsive Design**: Mobile-first approach with breakpoint mixins
- **Component-based**: Easy to maintain and extend

## Variables

All design tokens are defined in `utils/_variables.scss`:
- Colors (primary, secondary, text, etc.)
- Typography (font families, sizes)
- Spacing and sizing
- Breakpoints
- Shadows and border radius

## Mixins

Common patterns are defined in `utils/_mixins.scss`:
- Button styling
- Flexbox centering
- Responsive breakpoints
- Card styling
- Animations

## Development Workflow

1. Make changes to SCSS files
2. Run `npm run dev` for development with file watching
3. CSS is automatically compiled to `styles.css`
4. For production, run `npm run build:css` for optimized output