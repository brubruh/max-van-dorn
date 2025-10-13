# Portfolio Website - Project Management Guide

## Overview
This portfolio website is designed to be scalable, dynamic, and fully responsive. It uses a modern architecture that separates content from presentation, making it easy to add new projects and maintain the site.

## Architecture

### File Structure
```
/
├── index.html              # Landing page with video background
├── about.html              # About page with personal information
├── projects.html           # Dynamic projects showcase
├── styles.css              # Main stylesheet with responsive design
├── function.js             # Core JavaScript functionality
├── data/
│   └── projects.json       # Project data (easy to edit!)
├── js/
│   ├── projects.js         # Dynamic project loading system
│   └── utils.js            # Performance and accessibility utilities
└── images/
    ├── projects/           # Project screenshots folder
    └── ...                 # Other site images

```

## Adding New Projects

### Step 1: Add Project Data
Edit `data/projects.json` and add a new project object:

```json
{
  "id": 3,
  "title": "Your New Project",
  "description": "A detailed description of what this project does and the technologies used.",
  "link": "https://yourproject.com",
  "image": "images/projects/your-project.jpg",
  "technologies": ["React", "Node.js", "MongoDB"],
  "status": "Completed",
  "featured": true
}
```

### Step 2: Add Project Image
1. Create a screenshot of your project (recommended: 800x400px)
2. Optimize the image (keep under 500KB)
3. Save it as `images/projects/your-project.jpg`
4. Update the `image` field in your project data

### Project Status Options
- `"Completed"` - Green badge, project is finished
- `"In Progress"` - Yellow badge, currently working on it
- `"Planned"` - Gray badge, future project

## Responsive Design

The website is fully responsive with breakpoints for:
- **Desktop**: 1025px and up
- **Tablet**: 769px - 1024px
- **Mobile**: 768px and below
- **Small Mobile**: 480px and below

## Key Features

### Dynamic Project Loading
- Projects load from JSON file automatically
- No need to edit HTML for new projects
- Supports images, technology tags, and status badges
- Lazy loading for optimal performance

### Modern Navigation
- Hamburger menu with smooth animations
- Keyboard navigation support
- Click-outside-to-close functionality
- ARIA labels for accessibility

### Visual Effects (Homepage)
- Interactive blend mode and color controls
- Keyboard shortcuts (B for blend, C for color)
- Video background with overlay effects

### Performance Optimizations
- Lazy loading for images
- Preloading of critical resources
- Smooth scrolling
- Reduced motion support for accessibility

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Mobile-First Design
The CSS uses a mobile-first approach with progressive enhancement for larger screens. This ensures fast loading and great UX on all devices.

## Accessibility Features
- Keyboard navigation support
- ARIA labels and roles
- Focus management
- Reduced motion preferences
- High contrast support

## Customization

### Colors
Main color variables are defined in the CSS. Key colors:
- Primary: `#03a9f4` (blue)
- Background: `#111` (dark)
- Text: `#fff` (white)
- Accent: `#9f9f9f` (gray)

### Fonts
Uses Google Fonts "Spline Sans Mono" for a modern, clean look.

### Animations
All transitions use CSS `ease` functions for smooth, natural movement.

## Future Enhancements

Potential additions:
- Blog system
- Contact form
- Dark/light theme toggle
- Project filtering and search
- Analytics integration

## Support

For questions or issues, check:
1. Browser console for JavaScript errors
2. Network tab for loading issues
3. Ensure all files are properly linked
4. Validate JSON syntax in `projects.json`