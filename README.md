# Star Wars Characters SPA

A modern Single Page Application built with React 19, showcasing Star Wars characters from SWAPI with local editing capabilities.

## 🚀 Tech Stack

- **React 19** + **TypeScript** - Modern React with latest features
- **React Router 7** - Client-side routing
- **TanStack Query** - Server state management & caching
- **Zustand** - Local state with persistence
- **Tailwind CSS v4** - Styling with custom design tokens
- **Axios** - HTTP client
- **Vitest + RTL** - Testing framework
- **FSD** - Feature-Sliced Design architecture

## 🏗️ Architecture

Following **Feature-Sliced Design (FSD)** methodology:

```
src/
├── app/                    # App initialization
│   ├── App.tsx            # Main app component
│   ├── router.tsx         # React Router 7 configuration
│   ├── providers/         # Global providers
│   └── styles/            # Global Tailwind styles with @theme
├── pages/                 # Route pages
│   ├── HomePage.tsx       # Character list with search/pagination
│   └── PersonPage.tsx     # Character detail with local editing
├── widgets/               # Complex UI blocks
│   ├── PeopleList.tsx     # Character grid display
│   ├── SearchBox.tsx      # Debounced search input
│   └── Pagination.tsx     # Page navigation
├── entities/person/       # Person business logic
│   ├── api/               # TanStack Query hooks
│   └── ui/                # Person-specific components
├── features/person-edit/  # Local editing functionality
│   ├── model/             # Zustand store
│   └── lib/               # Merge utilities
└── shared/                # Reusable code
    ├── api/swapi/         # SWAPI client & types
    ├── ui/                # Base UI components
    └── lib/               # Utilities (debounce, test-utils)
```

## 🎯 Features

### ✅ Completed
- [x] Modern React 19 + TypeScript setup with Vite
- [x] Tailwind CSS v4 with custom design tokens
- [x] FSD architecture with path aliases
- [x] Axios SWAPI client with error handling
- [x] TanStack Query hooks for server data
- [x] Responsive character cards with navigation
- [x] GitHub Actions CI/CD pipeline

### 🚧 In Progress
- [ ] Home page with search & pagination
- [ ] Character detail page
- [ ] Local editing with Zustand persistence
- [ ] Comprehensive test coverage

### 📋 Planned
- [ ] Advanced filtering
- [ ] Accessibility improvements
- [ ] Performance optimizations

## 🛠️ Development

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm

### Setup
```bash
# Clone and install
git clone <repo-url>
cd star-wars-characters
npm install

# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview build
npm run type-check   # TypeScript check
npm run lint         # ESLint
npm test            # Run tests
```

### Environment
- **Dev server**: http://localhost:5173
- **API**: https://swapi.py4e.com/api
- **Dev tools**: API status widget (dev only)

## 🎨 Design System

Custom design tokens in `src/app/styles/tailwind.css`:

```css
@theme {
  --color-primary: #121c21;
  --color-secondary: #1a94e5;
  --color-background: #141C1F;
  --color-foreground: #335266;
  --color-accent: #B2D1E5;
  /* ... more tokens */
}
```

Reusable components: `.btn`, `.card`, `.input`

## 🧪 Testing Strategy

- **Unit tests**: Vitest + React Testing Library
- **Integration tests**: Component interactions
- **E2E tests**: User flows (planned)
- **TDD approach**: Tests first, implementation second

## 🚀 Deployment

Automatic deployment via GitHub Actions:
- **CI**: Type check, lint, test on every push/PR
- **CD**: Build and deploy to GitHub Pages on main branch
- **SPA routing**: 404.html fallback for client-side routes

## 📚 API

Using **Star Wars API (SWAPI)**:
- `GET /people/` - Character list with pagination & search
- `GET /people/{id}/` - Character details
- Local edits stored in browser with Zustand

---

*Built with ❤️ using modern React patterns and FSD architecture*