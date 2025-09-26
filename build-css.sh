#!/bin/bash

# Build CSS from SCSS
# This script compiles SCSS to CSS

echo "Building CSS from SCSS..."

# Check if sass is installed globally
if command -v sass &> /dev/null
then
    echo "Using global Sass installation..."
    sass scss/main.scss styles.css --style=compressed --no-source-map
    echo "✅ CSS built successfully!"
else
    echo "❌ Sass not found. Please install Sass:"
    echo "npm install -g sass"
    echo "or use npm run build:css after running npm install"
    exit 1
fi