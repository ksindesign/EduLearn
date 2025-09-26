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

- Sass (CSS preprocessor)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd EduLearn
   ```

2. Install Sass globally:
   ```bash
   npm install -g sass
   ```

   Or using other package managers:
   ```bash
   # Using Homebrew (macOS)
   brew install sass/sass/sass

   # Using Chocolatey (Windows)
   choco install sass
   ```

### Building CSS

To compile SCSS to CSS:

```bash
./build-css.sh
```

This script will:
- Compile `scss/main.scss` to `styles.css`
- Generate compressed CSS for production
- Check for Sass installation automatically

### Manual Compilation

You can also compile CSS manually using Sass:

```bash
# For development (expanded with source maps)
sass scss/main.scss styles.css --style=expanded --source-map

# For production (compressed)
sass scss/main.scss styles.css --style=compressed --no-source-map

# Watch mode for development
sass scss/main.scss styles.css --watch --style=expanded
```

## License

This project is licensed under the MIT License - see the package.json file for
details.
