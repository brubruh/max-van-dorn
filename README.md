# Maxim Van Dorn - Personal Portfolio Website

A modern, responsive personal portfolio website featuring a dynamic video background and clean, scalable design.

## 🌟 Key Features

✨ **Full-screen video background** with `explore.mp4` looping continuously  
📱 **Responsive design** - zooms to left side on mobile for better composition  
🎨 **Interactive color filters** - invert, grayscale, sepia, blur, contrast, brightness  
🎯 **Customizable color mask** with color picker  
🚀 **Clean, modern aesthetic** with glassmorphism effects  
⚡ **Dynamic content loading** from JSON for easy project management  
♿ **Fully accessible** with keyboard navigation and screen reader support  

## 🏗️ Architecture

This website has been completely rebuilt with:
- **Modern CSS Grid & Flexbox** layouts
- **Mobile-first responsive design** 
- **ES6+ JavaScript** with modular architecture
- **JSON-driven content** for easy updates
- **Performance optimized** for all devices

## 🔧 Quick Updates

### Adding New Projects
Simply edit `data/projects.json`:

```json
{
  "id": 4,
  "title": "New Project",
  "description": "Description here...",
  "link": "https://project-url.com",
  "technologies": ["React", "Node.js"],
  "status": "Completed"
}
```

### Customizing Appearance
- **Colors**: Edit CSS variables in `styles.css`
- **Content**: Update respective HTML files
- **Video**: Replace `images/explore.mp4`

## 📱 Mobile-First Design

The website scales beautifully across all devices:
- **Mobile** (≤768px): Video positioned for left-side focus
- **Tablet** (≤1024px): Balanced layouts 
- **Desktop** (>1024px): Full-featured experience

---
*A modern portfolio built for the future of web development*