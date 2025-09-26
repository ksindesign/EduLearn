# JavaScript Modules Structure

This project uses ES6 modules for better code organization and maintainability.

## Folder Structure

```
js/
├── components/
│   ├── contactForm.js       # Contact form functionality
│   └── courseCards.js       # Course enrollment and cards
├── modules/
│   ├── animations.js        # Scroll animations and effects
│   └── navigation.js        # Navigation and mobile menu
├── utils/
│   ├── buttons.js           # Button effects and interactions
│   ├── pageLoader.js        # Page loading utilities
│   └── scrollToTop.js       # Scroll to top functionality
├── main.js                  # Main entry point (ES6 modules)
├── legacy.js                # Fallback for older browsers
└── README.md                # This file
```

## Architecture

### Components
Self-contained UI components that handle specific functionality:
- **ContactForm**: Form validation, submission, notifications
- **CourseCards**: Enrollment tracking, success messages

### Modules
Larger feature modules that handle complex functionality:
- **Navigation**: Mobile menu, smooth scrolling, navbar effects
- **Animations**: Scroll animations, parallax, counter animations

### Utils
Utility classes for reusable functionality:
- **ButtonEffects**: Ripple effects, loading states
- **PageLoader**: Page load animations, loading spinners
- **ScrollToTop**: Floating scroll to top button

## Usage

### Modern Browsers (ES6 Modules)
The main.js file uses ES6 import/export syntax and automatically initializes all modules:

```javascript
import { Navigation } from './modules/navigation.js';
import { ContactForm } from './components/contactForm.js';
// ... other imports

const app = new EduLearnApp();
```

### Legacy Browser Support
For browsers that don't support ES6 modules, legacy.js provides essential functionality without module syntax.

## Key Features

- **Modular Architecture**: Each feature is self-contained
- **Class-based Design**: Object-oriented approach for better organization
- **ES6 Modules**: Modern import/export syntax
- **Legacy Fallback**: Support for older browsers
- **Error Handling**: Graceful error handling and logging
- **Debug-friendly**: Global app instance for debugging

## Adding New Modules

1. Create a new file in the appropriate folder (components/, modules/, or utils/)
2. Export your class:
   ```javascript
   export class MyNewModule {
     constructor() {
       this.init();
     }
     init() {
       // Your initialization code
     }
   }
   ```

3. Import and initialize in main.js:
   ```javascript
   import { MyNewModule } from './path/to/MyNewModule.js';

   // In initializeModules():
   this.modules.myNewModule = new MyNewModule();
   ```

## Development

### Debugging
Access the app instance in browser console:
```javascript
// Get app instance
window.EduLearnApp

// Get specific module
window.EduLearnApp.getModule('navigation')

// Reinitialize a module
window.EduLearnApp.reinitModule('contactForm')
```

### Browser Compatibility
- **Modern browsers**: Use ES6 modules (Chrome 61+, Firefox 60+, Safari 10.1+)
- **Older browsers**: Use legacy.js fallback
- **Mobile**: Full support on modern mobile browsers

## Performance Benefits

- **Tree Shaking**: Only used code is loaded
- **Lazy Loading**: Modules can be loaded on demand
- **Better Caching**: Individual files can be cached separately
- **Maintainability**: Easier to debug and maintain
- **Scalability**: Easy to add new features without affecting existing code