# EduLearn

An online learning platform website built with modern web technologies.

## Overview

EduLearn is a responsive educational website designed to provide an engaging
online learning experience. The platform features a clean, modern interface
built with HTML, CSS/SCSS, and JavaScript.

## Features

- Responsive design that works on desktop and mobile devices
- Modern CSS architecture using SCSS/Sass
- Clean and intuitive user interface
- User authentication (login/signup pages)
- Course browsing and management
- Fast loading with optimized CSS

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3/SCSS** - Styling with Sass preprocessing
- **JavaScript** - Interactive functionality
- **Font Awesome** - Icon library
- **Google Fonts** - Inter font family

## Project Structure

```
EduLearn/
├── index.html          # Main homepage
├── login.html          # User login page
├── signup.html         # User registration page
├── 404.html           # Error page
├── css/               # Compiled CSS files
│   ├── main.css       # Development CSS
│   └── main.min.css   # Production CSS
├── js/                # JavaScript files
│   ├── main.js        # Main application logic
└── README.md          # Project description
```

## Getting Started

### Prerequisites

- Node.js (for development tools)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd EduLearn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start development with automatic CSS compilation:

```bash
npm run dev
```

This will watch for SCSS changes and automatically compile them with source
maps.

### Building for Production

To build optimized CSS for production:

```bash
npm run build
```

## Available Scripts

- `npm run dev` - Start development mode with file watching and source maps
- `npm run build` - Build optimized CSS for production
- `npm run build:css` - Compile SCSS to compressed CSS
- `npm run watch:css` - Watch SCSS files and compile on changes

## License

This project is licensed under the MIT License - see the package.json file for
details.
