# Avnik Gupta - Premium Web Developer Portfolio

## Project Overview
A modern, responsive portfolio website built to showcase frontend development skills with a premium, polished light brand identity. The site emphasizes smooth animations, clean design, and professional presentation.

## Tech Stack
- **Frontend Framework**: React 18.3.1 + Vite 5.4.10
- **Styling**: Tailwind CSS 3.4.14 + PostCSS
- **Animations**: Framer Motion 11.11.9 + GSAP 3.12.5
- **Icons**: React Icons 5.0.1
- **Email Service**: EmailJS 3.2.0
- **Build Tool**: Vite with React plugin

## Project Structure
```
avnik-portfolio/
├── index.html                    # Main HTML entry point
├── resume.html                   # Resume page
├── styles.css                    # Global styles & animations
├── script.js                     # Vanilla JS for interactions
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Dependencies & scripts
├── public/
│   ├── robots.txt               # SEO robots file
│   └── sitemap.xml              # XML sitemap
└── src/
    ├── App.jsx                  # React root component
    ├── main.jsx                 # React entry point
    └── index.css                # React component styles
```

## Key Features
- **Hero Section**: Eye-catching landing with animated effects (orbs & particles)
- **Responsive Navigation**: Mobile-friendly menu toggle
- **Smooth Animations**: Loading screen, scroll progress indicator
- **SEO Optimized**: Meta tags, sitemap, robots.txt
- **Multiple Sections**: Home, About, Skills, Services, Projects, Journey, Reviews, Contact
- **Resume Page**: Dedicated resume display
- **Email Integration**: Contact form via EmailJS

## Design Philosophy
- **Premium Light Brand**: Clean, minimal aesthetic with warm neutral tones (#FDF6ED)
- **Polished UX**: Smooth transitions and professional animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## Development Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Production-optimized build
- `npm run preview` - Preview production build locally

## Key Files to Modify
1. **index.html** - Update meta tags, site title, section content
2. **styles.css** - Global animations, color scheme, layout tweaks
3. **src/App.jsx** - React component structure
4. **resume.html** - Resume content and styling
5. **tailwind.config.js** - Customize Tailwind theme

## Best Practices
- Use Tailwind CSS utility classes for styling
- Leverage Framer Motion for React component animations
- Keep animations smooth (60fps target)
- Maintain semantic HTML structure
- Test responsive design on mobile, tablet, desktop
- Optimize images for web
- Keep loading time under 2s

## Common Tasks
- **Add New Section**: Create section in HTML with class="section", style with Tailwind
- **Add Animation**: Use Framer Motion components in React or GSAP in vanilla JS
- **Update Colors**: Modify Tailwind config or CSS variables
- **Add Project**: Update projects section with new project card
- **Customize Fonts**: Already using DM Sans & Space Grotesk from Google Fonts

## Performance Tips
- Lazy load images
- Minimize CSS/JS bundles
- Use production build for deployment
- Test with Chrome DevTools Lighthouse
- Consider image optimization tools

---
**Note**: This is a professional portfolio - maintain high code quality and design standards.
