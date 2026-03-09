# Shaq Studio - Design Portfolio

A modern, scalable design portfolio platform built with React, TypeScript, and Tailwind CSS. Showcase your design work with a professional interface featuring project galleries, dedicated project pages, and powerful filtering.

## ✨ Features

- 🎨 **Professional Portfolio**: Showcase 11+ design projects
- 📱 **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- 🔍 **Advanced Search**: Find projects by title, description, or tags
- 🏷️ **Category Filtering**: Browse by design type (branding, posters, print, etc.)
- 📸 **Image Gallery**: Multi-image galleries for each project
- 🔭 **Image Lightbox**: Full-screen image viewer with keyboard & touch controls
- 🚀 **Fast Navigation**: Dedicated project pages with smooth transitions
- ♥️ **Favorites System**: Save favorite projects to localStorage
- 📊 **Rich Metadata**: Display client, year, tools, and tags for each project

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── layout/         # Header, Footer
│   ├── gallery/        # Gallery cards, grid, lightbox
│   ├── project/        # Project hero, gallery, details
│   └── ui/             # Button, Tag, Badge
├── pages/              # Route components
│   ├── Home.tsx        # Homepage
│   ├── Projects.tsx    # Projects gallery
│   ├── ProjectPage.tsx # Project detail
│   └── CategoryPage.tsx # Category filter
├── data/
│   └── projects.ts     # Project data & utilities
├── types/
│   └── DesignProject.ts # TypeScript interfaces
├── hooks/
│   └── useFavourite.ts # Favorites management
├── App.tsx             # Main router
└── main.tsx            # Entry point
```

## 🛣️ Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Featured projects & categories |
| `/projects` | Projects | All projects with search/filter |
| `/projects/:slug` | Project Detail | Full project showcase |
| `/categories/:category` | Category | Category-filtered gallery |

## 🎨 Tech Stack

- **React** 19.2.0 - UI library
- **TypeScript** 5.9.3 - Type safety
- **React Router** 7.10.1 - Client-side routing
- **Tailwind CSS** 3.4.18 - Styling
- **Vite** 7.2.4 - Build tool
- **Lucide React** - Icons
- **React Toastify** - Notifications
- **Cloudinary** - Image hosting

## 🎯 Key Components

### Gallery
- `GalleryCard` - Individual project card
- `GalleryGrid` - Responsive grid layout
- `ImageLightbox` - Full-screen image viewer

### Project
- `ProjectHero` - Hero banner section
- `ProjectGallery` - Project image grid
- `ProjectDetails` - Metadata display

### UI
- `Button` - Reusable button with variants
- `Badge` - Category badge
- `Tag` - Project tag

### Layout
- `Header` - Navigation header
- `Footer` - Footer section

## 📊 Project Data

### Current Portfolio (11 Projects)
1. **TURINEX Branding Series** - Complete brand identity
2. **YOU Book Cover** - Elegant book design
3. **Whispers Movie Poster** - Cinematic poster
4. **Trifold Brochure** - Professional print collateral
5. **ROLFY Poster Collection** - Diverse poster series
6. **Smartphone UI Designs** - Mobile interface prototypes
7. **Wedding Stationery** - Event design suite
8. **QUENCHIL Brand** - Brand identity system
9. **Pizza Restaurant Marketing** - Food/restaurant branding
10. **EVRUS Branding** - Corporate brand system
11. **CHICHI Brand System** - Visual system

### Data Model
```typescript
interface DesignProject {
  id: string;
  slug: string;
  title: string;
  category: "branding" | "logo" | "poster" | "flyer" | "print" | "other";
  coverImage: string;
  gallery: string[];
  description?: string;
  client?: string;
  year?: number;
  tools?: string[];
  tags?: string[];
  featured?: boolean;
}
```

## 🎮 Usage Examples

### View All Projects
Navigate to `/projects` to see all projects with search and filtering

### Browse by Category
Click category cards on homepage or use filters on projects page

### View Project Details
Click any project card to see dedicated project page with full gallery

### Search Projects
Use the search bar to find projects by:
- Title
- Description
- Tags

### View Image Gallery
Click any image to open full-screen lightbox with:
- Next/Previous buttons
- Keyboard navigation (← → ESC)
- Touch swipe support
- Image counter

## 🌐 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `ESC` | Close lightbox |
| `→` | Next image (lightbox) |
| `←` | Previous image (lightbox) |

## 📱 Responsive Breakpoints

- **Mobile**: 1 column
- **Tablet** (768px+): 2 columns
- **Desktop** (1024px+): 3 columns

## 🚀 Performance

- ✅ Lazy image loading
- ✅ Optimized Cloudinary URLs
- ✅ Code-split routes
- ✅ Minimal bundle size
- ✅ CSS-in-JS with Tailwind

## 🎨 Color Palette

```
Primary Gradient: #FB923C (Orange) → #FF2E88 (Pink)
Purple: #A020F0
White: rgba(255, 255, 255, 0.x)
```

## 📚 Documentation

- [Refactoring Guide](./REFACTORING_GUIDE.md) - Detailed architecture overview
- [Setup & Testing Guide](./SETUP_TESTING_GUIDE.md) - Testing procedures

## 🔧 Available Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## 🤝 Contributing

This is a personal portfolio project. For modifications:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Shaq Studio** - Creative Design & Development

- Portfolio: [View Live](https://design-catalogue-demo.vercel.app)
- Instagram: [@shaqstudio](https://instagram.com/shaqstudio)

## 🙏 Acknowledgments

- Design assets from Cloudinary
- Icons from Lucide React
- UI inspired by Dribbble & Behance

---

**Version**: 2.0 (Refactored)  
**Last Updated**: March 2026  
**Status**: ✅ Production Ready
