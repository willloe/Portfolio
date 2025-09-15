# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features a stunning design, smooth animations, and comprehensive functionality for showcasing projects, skills, and experience.

## ✨ Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Beautiful UI**: shadcn/ui components with custom design system
- **Smooth Animations**: Framer Motion with reduced-motion support
- **Dark/Light Theme**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first approach with perfect scaling
- **SEO Optimized**: Meta tags, structured data, sitemap, robots.txt
- **PWA Ready**: Service worker, manifest, offline support
- **Accessibility**: WCAG AA compliant with keyboard navigation
- **Performance**: Lighthouse scores 95+ across all categories
- **Testing**: Comprehensive unit and e2e test coverage
- **CI/CD**: GitHub Actions with automated testing and deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── layout/         # Layout components (Header, Footer, etc.)
├── features/           # Feature-specific components
│   ├── hero/           # Hero section
│   ├── about/          # About section
│   ├── projects/       # Projects showcase
│   ├── experience/     # Work experience
│   ├── skills/         # Skills and technologies
│   ├── testimonials/   # Client testimonials
│   └── contact/        # Contact form
├── pages/              # Page components
├── routes/             # React Router configuration
├── lib/                # Utilities and configurations
│   ├── schemas.ts      # Zod validation schemas
│   ├── theme.ts        # Theme management
│   ├── motion.ts       # Animation variants
│   └── utils.ts        # Helper functions
├── data/               # JSON data files
├── styles/             # Global styles and CSS
├── assets/             # Static assets
└── tests/              # Test files
    ├── unit/           # Unit tests
    └── e2e/            # End-to-end tests
```

## 🛠️ Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Testing

```bash
npm run test         # Run unit tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
npm run e2e          # Run e2e tests
npm run e2e:ui       # Run e2e tests with UI
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
```

## 🎨 Customization

### Content Management

All content is managed through JSON files in the `src/data/` directory:

- **`profile.json`**: Personal information and social links
- **`projects.json`**: Project portfolio data
- **`experience.json`**: Work experience and education
- **`skills.json`**: Skills and technologies
- **`testimonials.json`**: Client testimonials

### Theme Customization

The theme system uses CSS variables defined in `src/styles/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  --accent: 210 40% 96%;
  /* ... more variables */
}
```

### Adding New Sections

1. Create a new feature component in `src/features/`
2. Add the section to `src/pages/home.tsx`
3. Update navigation in `src/components/layout/header.tsx`
4. Add corresponding data schema in `src/lib/schemas.ts`

### Styling Guidelines

- Use Tailwind CSS classes for styling
- Follow the design system tokens
- Use CSS variables for theme values
- Maintain responsive design principles
- Follow accessibility guidelines

## 🧪 Testing

### Unit Tests

- **Framework**: Vitest + React Testing Library
- **Coverage**: 80%+ threshold
- **Location**: `src/tests/unit/`

### E2E Tests

- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, WebKit
- **Location**: `src/tests/e2e/`

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run e2e

# All tests
npm run test && npm run e2e
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** (if needed)
3. **Deploy automatically** on push to main branch

### Netlify

1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. **Deploy automatically** on push to main branch

### Docker

1. **Build the image**

   ```bash
   docker build -t portfolio-website .
   ```

2. **Run the container**

   ```bash
   docker run -p 3000:3000 portfolio-website
   ```

3. **Using Docker Compose**
   ```bash
   docker-compose up -d
   ```

### Manual Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your hosting provider

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
VITE_APP_TITLE=Your Portfolio
VITE_APP_DESCRIPTION=Your portfolio description
VITE_APP_URL=https://yourdomain.com
```

### Feature Flags

Control optional features with environment variables:

```env
ENABLE_3D=true          # Enable 3D background effects
ENABLE_PWA=true         # Enable PWA features
```

### Vite Configuration

The project uses Vite with custom configuration in `vite.config.ts`:

- Path aliases for clean imports
- PWA plugin for offline support
- Build optimization
- Development server settings

## 📱 PWA Features

The portfolio includes Progressive Web App capabilities:

- **Service Worker**: Caches resources for offline use
- **Web App Manifest**: App-like installation
- **Offline Support**: Basic offline functionality
- **Install Prompt**: Native app installation

## ♿ Accessibility

The website follows WCAG AA guidelines:

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and roles
- **Color Contrast**: Meets accessibility standards
- **Focus Management**: Clear focus indicators
- **Reduced Motion**: Respects user preferences

## 🎯 Performance

Optimized for performance with:

- **Code Splitting**: Lazy loading of routes
- **Image Optimization**: Responsive images with proper sizing
- **Bundle Analysis**: Optimized bundle size
- **Caching**: Strategic resource caching
- **Lighthouse Score**: 95+ across all categories

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm run test && npm run e2e
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vite](https://vitejs.dev/) for fast development and building
- [React](https://reactjs.org/) for the amazing framework

## 📞 Support

If you have any questions or need help:

- **Open an issue** on GitHub
- **Contact me** through the portfolio contact form
- **Email**: your-email@example.com

---

**Made with ❤️ by [Your Name](https://yourwebsite.com)**
