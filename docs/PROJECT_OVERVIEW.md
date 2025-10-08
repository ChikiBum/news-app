# News Feed Analytics Frontend

## 🎯 Project Overview

A comprehensive React-based frontend application for a news feed analytics and advertising platform. The application provides real-time news feed management, advanced data grid analytics, programmatic advertising integration, and user authentication with a modern, responsive design using TypeScript and Tailwind CSS.

## 🎨 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        News Feed Analytics Frontend                             │
└─────────────────────────────────────────────────────────────────────────────────┘

                                  ┌─────────────┐
                                  │   Browser   │
                                  │  (Client)   │
                                  └──────┬──────┘
                                         │ HTTP/HTTPS
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                               React Application                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Header    │  │   Footer    │  │ Auth Forms  │  │ Protected   │              │
│  │ Navigation  │  │  Component  │  │ (Login/Reg) │  │   Routes    │              │
│  │             │  │             │  │             │  │             │              │
│  │ User Menu   │  │ App Info    │  │ Form Mgmt   │  │ Route Guard │              │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ News Feed   │  │ Statistics  │  │ SSR Creative│  │ News Detail │              │
│  │    Page     │  │ Grid Page   │  │    Form     │  │    Page     │              │
│  │             │  │             │  │             │  │             │              │
│  │/news route  │  │/statistics  │  │/ssr-form    │  │/news/:id    │              │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ Feed Parser │  │ Grid Table  │  │ Grid Filters│  │ Export      │              │
│  │ Component   │  │ Component   │  │ Component   │  │ Buttons     │              │
│  │             │  │             │  │             │  │             │              │
│  │RSS Parsing  │  │Data Display │  │Filter Logic │  │CSV/Excel    │              │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘              │
└──────────────────────────────────────────────────────────────────────────────────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│    State Management     │  │    API Integration      │  │   Build & Dev Tools     │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │
│ │  Zustand Stores     │ │  │ │  TanStack Query     │ │  │ │      Vite          │ │
│ │  (Auth, Grid)       │ │  │ │  (Data Fetching)    │ │  │ │  (Build Tool)      │ │
│ └─────────────────────┘ │  │ └─────────────────────┘ │  │ └─────────────────────┘ │
│                         │  │                         │  │                         │
│ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │
│ │  React Context      │ │  │ │  RESTful APIs       │ │  │ │   TypeScript       │ │
│ │  (QueryProvider)    │ │  │ │  (CRUD Operations)  │ │  │ │  (Type Safety)     │ │
│ └─────────────────────┘ │  │ └─────────────────────┘ │  │ └─────────────────────┘ │
│                         │  │                         │  │                         │
│ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │
│ │ Local Storage       │ │  │ │ Cookie Management   │ │  │ │  Tailwind CSS      │ │
│ │ (Settings Persist)  │ │  │ │ (Auth Tokens)       │ │  │ │ (Styling System)   │ │
│ └─────────────────────┘ │  │ └─────────────────────┘ │  │ └─────────────────────┘ │
│                         │  │                         │  │                         │
│ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │
│ │ React Router        │ │  │ │ Form Validation     │ │  │ │     Biome          │ │
│ │ (Client Routing)    │ │  │ │ (Zod Schemas)       │ │  │ │ (Linting/Format)   │ │
│ └─────────────────────┘ │  │ └─────────────────────┘ │  │ └─────────────────────┘ │
│                         │  │                         │  │                         │
│                         │  │                         │  │ ┌─────────────────────┐ │
│                         │  │                         │  │ │ Virtual Modules     │ │
│                         │  │                         │  │ │ (Dynamic Loading)   │ │
│                         │  │                         │  │ └─────────────────────┘ │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘
                    │                      │                      │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
               ▼              ▼                         ▼              ▼
┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
│   Browser Storage   │ │   Backend APIs      │ │   Static Assets     │ │   CDN/External      │
│   (Client Cache)    │ │  (News/Auth/Grid)   │ │   (Images/Icons)    │ │   (Ad Networks)     │
├─────────────────────┤ ├─────────────────────┤ ├─────────────────────┤ ├─────────────────────┤
│ • LocalStorage      │ │ • Authentication    │ │ • Vite SVG Assets   │ │ • Google Ad Manager │
│ • SessionStorage    │ │ • News Management   │ │ • Static Resources  │ │ • Prebid.js         │
│ • Cookies (Auth)    │ │ • Feed Parsing      │ │ • Favicon           │ │ • Analytics Scripts │
│ • IndexedDB         │ │ • Statistics Data   │ │ • Bundle Assets     │ │ • External Libraries│
│ • Query Cache       │ │ • Grid Operations   │ │                     │ │                     │
│ • Component State   │ │ • Settings API      │ │                     │ │                     │
└─────────────────────┘ └─────────────────────┘ └─────────────────────┘ └─────────────────────┘
```

## 🔄 Module Interaction Flow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              Data Flow Patterns                                │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Authentication │     │   News Feed     │     │  Grid Analytics │
│      Flow       │     │     Flow        │     │      Flow       │
└─────────────────┘     └─────────────────┘     └─────────────────┘

     User Login              RSS Feed Data           Statistics Data
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   LoginPage     │     │  NewsFeedPage   │     │StatisticsGrid   │
│                 │     │                 │     │      Page       │
│ ┌─────────────┐ │     │ ┌─────────────┐ │     │ ┌─────────────┐ │
│ │  AuthForm   │ │     │ │FeedParser   │ │     │ │ GridTable   │ │
│ │ Component   │ │     │ │ Component   │ │     │ │ Component   │ │
│ └─────────────┘ │     │ └─────────────┘ │     │ └─────────────┘ │
│         │       │     │         │       │     │         │       │
│         ▼       │     │         ▼       │     │         ▼       │
│ ┌─────────────┐ │     │ ┌─────────────┐ │     │ ┌─────────────┐ │
│ │ React Hook  │ │     │ │TanStack     │ │     │ │ GridFilters │ │
│ │    Form     │ │     │ │  Query      │ │     │ │ Component   │ │
│ └─────────────┘ │     │ └─────────────┘ │     │ └─────────────┘ │
│         │       │     │         │       │     │         │       │
│         ▼       │     │         ▼       │     │         ▼       │
│ ┌─────────────┐ │     │ ┌─────────────┐ │     │ ┌─────────────┐ │
│ │Zod Schema   │ │     │ │  newsApi    │ │     │ │  gridApi    │ │
│ │ Validation  │ │     │ │   Module    │ │     │ │   Module    │ │
│ └─────────────┘ │     │ └─────────────┘ │     │ └─────────────┘ │
│         │       │     │         │       │     │         │       │
│         ▼       │     │         ▼       │     │         ▼       │
│ ┌─────────────┐ │     │ ┌─────────────┐ │     │ ┌─────────────┐ │
│ │  authApi    │ │     │ │   Fetch     │ │     │ │Zustand Store│ │
│ │   Module    │ │     │ │ News Data   │ │     │ │(Grid State) │ │
│ └─────────────┘ │     │ └─────────────┘ │     │ └─────────────┘ │
│         │       │     │         │       │     │         │       │
│         ▼       │     │         ▼       │     │         ▼       │
│ ┌─────────────┐ │     │ ┌─────────────┐ │     │ ┌─────────────┐ │
│ │Zustand Auth │ │     │ │  Component  │ │     │ │Export Tools │ │
│ │    Store    │ │     │ │  Re-render  │ │     │ │(CSV/Excel)  │ │
│ └─────────────┘ │     │ └─────────────┘ │     │ └─────────────┘ │
│         │       │     │                 │     │                 │
│         ▼       │     │                 │     │                 │
│ ┌─────────────┐ │     │                 │     │                 │
│ │Cookie Store │ │     │                 │     │                 │
│ │(Persist)    │ │     │                 │     │                 │
│ └─────────────┘ │     │                 │     │                 │
│         │       │     │                 │     │                 │
│         ▼       │     │                 │     │                 │
│ ┌─────────────┐ │     │                 │     │                 │
│ │Protected    │ │     │                 │     │                 │
│ │Route Guard  │ │     │                 │     │                 │
│ └─────────────┘ │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                           Component Hierarchy Flow                             │
└─────────────────────────────────────────────────────────────────────────────────┘

                                ┌─────────────┐
                                │     App     │
                                │ (Router)    │
                                └──────┬──────┘
                                       │
                     ┌─────────────────┼─────────────────┐
                     │                 │                 │
                     ▼                 ▼                 ▼
           ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
           │   Header    │    │  Main Routes│    │   Footer    │
           │ Component   │    │  Container  │    │ Component   │
           └─────────────┘    └──────┬──────┘    └─────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
          ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
          │  LoginPage  │   │ NewsFeedPage│   │StatisticsPage│
          │             │   │             │   │             │
          └──────┬──────┘   └──────┬──────┘   └──────┬──────┘
                 │                 │                 │
                 ▼                 ▼                 ▼
          ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
          │  AuthForm   │   │ FeedParser  │   │  GridTable  │
          │             │   │             │   │             │
          └─────────────┘   └─────────────┘   └──────┬──────┘
                                                     │
                                    ┌────────────────┼────────────────┐
                                    │                │                │
                                    ▼                ▼                ▼
                            ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
                            │GridFilters  │   │GridPaginate │   │ExportButtons│
                            │             │   │             │   │             │
                            └─────────────┘   └─────────────┘   └─────────────┘
```

## 📊 Schema Architecture & Validation

### Form Validation Schema

```typescript
// Zod Schema Structure
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Validation Architecture                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐          │
│  │  loginSchema    │    │ registerSchema  │    │  gridSchema     │          │
│  │                 │    │                 │    │                 │          │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │          │
│  │ │    email    │ │    │ │  username   │ │    │ │   filters   │ │          │
│  │ │ (required)  │ │    │ │ (min: 3)    │ │    │ │ (optional)  │ │          │
│  │ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │          │
│  │                 │    │                 │    │                 │          │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │          │
│  │ │  password   │ │    │ │    email    │ │    │ │    sort     │ │          │
│  │ │ (min: 3)    │ │    │ │ (email fmt) │ │    │ │ (default)   │ │          │
│  │ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │          │
│  │                 │    │                 │    │                 │          │
│  └─────────────────┘    │ ┌─────────────┐ │    │ ┌─────────────┐ │          │
│                         │ │  password   │ │    │ │ pagination  │ │          │
│                         │ │ (min: 3)    │ │    │ │ (numbers)   │ │          │
│                         │ └─────────────┘ │    │ └─────────────┘ │          │
│                         │                 │    │                 │          │
│                         └─────────────────┘    └─────────────────┘          │
│                                                                             │
│  Form Integration Flow:                                                     │
│  React Hook Form → Zod Resolver → Schema Validation → Error Handling       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Flow Validation

- **Client-Side Validation**: Zod schemas provide real-time validation
  - **Why:** Immediate user feedback, reduced server load, better UX
  - **Benefits:** Type safety, declarative validation rules, internationalization support
  - **Features:** Custom error messages, async validation, schema composition

- **React Hook Form Integration**: Seamless form state management
  - **Why:** Performance optimization, minimal re-renders, easy validation integration
  - **Benefits:** Built-in validation, easy error handling, accessibility features
  - **Features:** Field-level validation, form submission handling, reset capabilities

## 🛠 Core Technologies & Libraries

### Frontend Framework
- **React 19.1.1** - JavaScript library for building user interfaces
  - **Why:** Component-based architecture, virtual DOM for performance, excellent ecosystem
  - **Benefits:** Reusable components, efficient updates, strong community support, concurrent features
  - **Features:** Hooks for state management, context API for prop drilling, lifecycle methods, JSX syntax

### Build Tool & Development
- **Vite 6.3.6** - Next-generation frontend build tool
  - **Why:** Lightning-fast HMR, modern ES modules, optimized production builds
  - **Benefits:** Instant server start, fast development experience, tree-shaking optimization
  - **Features:** TypeScript support, plugin ecosystem, dev server with HMR, bundle analysis

- **TypeScript ~5.8.3** - Typed superset of JavaScript
  - **Why:** Type safety, better IDE support, early error detection
  - **Benefits:** Reduced runtime errors, better refactoring, enhanced developer experience
  - **Features:** Static type checking, IntelliSense, interface definitions, generic types

### State Management
- **Zustand 5.0.8** - Lightweight state management solution
  - **Why:** Simple API, minimal boilerplate, great TypeScript support
  - **Benefits:** No providers needed, devtools support, middleware ecosystem
  - **Features:** Immer integration, persistence, subscriptions, slice pattern

### Data Fetching & Server State
- **TanStack Query 5.87.4** - Powerful data synchronization for React
  - **Why:** Automatic caching, background updates, optimistic updates
  - **Benefits:** Reduced boilerplate, automatic error retry, offline support
  - **Features:** Query invalidation, mutation handling, infinite queries, parallel queries

### Routing
- **React Router DOM 7.9.1** - Declarative routing for React
  - **Why:** Dynamic routing, nested routes, programmatic navigation
  - **Benefits:** Code splitting, route guards, search params handling
  - **Features:** Lazy loading, protected routes, history management, link components

### Form Management
- **React Hook Form 7.62.0** - Performant forms with easy validation
  - **Why:** Minimal re-renders, built-in validation, easy integration
  - **Benefits:** Better performance, less code, accessibility support
  - **Features:** Controller components, field arrays, custom validation, error handling

- **Hookform Resolvers 5.2.2** - Validation schema resolvers
  - **Why:** Integration with validation libraries, type safety
  - **Benefits:** Zod integration, consistent validation patterns
  - **Features:** Schema-based validation, async validation, custom resolvers

### Validation
- **Zod 4.1.8** - TypeScript-first schema validation
  - **Why:** Type inference, runtime validation, excellent error messages
  - **Benefits:** Type safety, schema composition, custom validation rules
  - **Features:** Parsing, transformation, async validation, internationalization

### Styling & UI
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
  - **Why:** Rapid development, consistent design system, mobile-first approach
  - **Benefits:** Reduced CSS bundle size, design system enforcement, responsive design
  - **Features:** Dark mode support, custom themes, JIT compilation, responsive utilities

### Authentication & Cookies
- **js-cookie 3.0.5** - Simple cookie handling library
  - **Why:** Lightweight, cross-browser compatibility, simple API
  - **Benefits:** Secure cookie handling, expiration management, path/domain control
  - **Features:** Cookie parsing, encoding/decoding, security options

### Data Processing
- **PapaParse 5.5.3** - Powerful CSV parser and writer
  - **Why:** Fast parsing, streaming support, error handling
  - **Benefits:** Large file handling, worker support, format detection
  - **Features:** CSV parsing, data transformation, download generation

- **XLSX 0.18.5** - Excel file processing library
  - **Why:** Comprehensive Excel support, multiple formats, data export
  - **Benefits:** Import/export capabilities, formula support, styling options
  - **Features:** Workbook creation, sheet manipulation, data formatting

### Development Tools
- **Biome 2.2.4** - Fast formatter and linter
  - **Why:** Performance, zero configuration, TypeScript support
  - **Benefits:** Fast execution, consistent formatting, comprehensive linting
  - **Features:** Code formatting, lint rules, import organization, VS Code integration

### CI/CD & Deployment
- **GitHub Actions** - Automated continuous integration and deployment
  - **Why:** Native GitHub integration, powerful workflow automation, free for public repos
  - **Benefits:** Automated testing, consistent deployments, parallel job execution
  - **Features:** Pull request checks, automated deployments, environment management

- **Vercel Platform** - Frontend deployment and hosting platform
  - **Why:** Optimized for frontend frameworks, global CDN, automatic HTTPS
  - **Benefits:** Zero-config deployments, preview deployments, edge functions
  - **Features:** Automatic builds, custom domains, environment variables, analytics

### Virtual Module System
- **Custom Virtual Modules Plugin** - Dynamic module loading system
  - **Why:** Conditional feature loading, environment-based modules, performance optimization
  - **Benefits:** Reduced bundle size, feature flagging, modular architecture
  - **Features:** Environment variable control, dynamic imports, plugin system

## 🏗 Project Structure & Architecture

```
src/
├── api/                    # API integration layer
│   ├── authApi.ts         # Authentication endpoints
│   ├── feedApi.ts         # RSS feed management
│   ├── gridApi.ts         # Statistics grid data
│   ├── newsApi.ts         # News data operations
│   └── settingsApi.ts     # User preferences
├── components/            # Reusable UI components
│   ├── AuthForm.tsx       # Authentication form
│   ├── FeedParser.tsx     # RSS feed parser UI
│   ├── Footer.tsx         # Application footer
│   ├── Header.tsx         # Navigation header
│   ├── ProtectedRoute.tsx # Route authentication guard
│   └── statisticGrid/     # Data grid components
│       ├── ExportButtons.tsx    # Data export functionality
│       ├── GridFilters.tsx      # Filter controls
│       ├── GridPagination.tsx   # Pagination controls
│       ├── GridTable.tsx        # Data table display
│       ├── GridToolbar.tsx      # Grid action toolbar
│       └── SavedViews.tsx       # View management
├── hooks/                 # Custom React hooks (empty - future use)
├── modules/              # Feature modules (dynamic loading)
│   ├── adsGamModule.ts   # Google Ad Manager integration
│   ├── adsPredibOnlyModule.ts # Prebid.js integration
│   ├── adStatsModule.ts  # Advertising analytics
│   └── ssrModule.ts      # Server-side rendering
├── pages/                # Route components
│   ├── ErrorPage.tsx     # 404 and error handling
│   ├── LoginPage.tsx     # Authentication page
│   ├── NewsDetailPage.tsx # Single news item view
│   ├── NewsFeedPage.tsx  # News feed dashboard
│   ├── SSRCreativeForm.tsx # Ad creative form
│   └── StatisticsGridPage.tsx # Analytics dashboard
├── plugins/              # Build-time plugins
│   └── virtual_modules.plugin.ts # Dynamic module loader
├── providers/            # React context providers
│   └── QueryProvider.tsx # TanStack Query setup
├── store/                # State management
│   ├── authStore.ts      # Authentication state
│   └── gridSettings.store.ts # Grid preferences
├── theme/                # Theme configuration (empty)
├── types/                # TypeScript definitions
│   └── index.ts          # Application type definitions
├── utils/                # Utility functions
│   └── auth.ts           # Authentication helpers
└── validation/           # Form validation schemas
    ├── loginSchema.ts    # Login form validation
    └── registerSchema.ts # Registration validation
```

### Architectural Patterns

#### Component Architecture
- **Atomic Design**: Components organized by complexity and reusability
- **Container/Presentational**: Separation of data logic and UI presentation
- **Compound Components**: Complex components built from smaller, focused parts

#### State Management Architecture
- **Global State**: Zustand stores for cross-component state (auth, grid settings)
- **Server State**: TanStack Query for API data caching and synchronization
- **Local State**: React useState for component-specific state
- **URL State**: React Router for navigation and route-based state

#### Module Loading Architecture
- **Static Imports**: Core application functionality
- **Dynamic Imports**: Feature modules loaded based on environment variables
- **Virtual Modules**: Build-time module generation for conditional features

## 📱 Component Overview

### Core Layout Components

#### Header Component
- **Purpose**: Navigation and user authentication status
- **Features**: Responsive navigation, user menu, authentication state display
- **Integration**: Connected to auth store for user state

#### Footer Component  
- **Purpose**: Application information and links
- **Features**: Static content, responsive layout
- **Benefits**: Consistent footer across all pages

#### ProtectedRoute Component
- **Purpose**: Route-level authentication guard
- **Features**: Automatic redirect for unauthenticated users
- **Integration**: Uses auth store to check authentication status

### Page Components

#### LoginPage
- **Purpose**: User authentication interface
- **Features**: Login/register forms, form validation, error handling
- **Integration**: AuthForm component, auth API, form validation

#### NewsFeedPage  
- **Purpose**: News feed management and display
- **Features**: RSS feed parsing, news list display, feed management
- **Integration**: TanStack Query for data fetching, FeedParser component

#### StatisticsGridPage
- **Purpose**: Advanced data analytics interface
- **Features**: Data grid, filtering, sorting, pagination, export functionality
- **Integration**: Multiple grid components, grid settings store

#### NewsDetailPage
- **Purpose**: Individual news item view
- **Features**: News content display, navigation
- **Integration**: Route parameters, news API

#### SSRCreativeForm
- **Purpose**: Ad creative management
- **Features**: Form handling, creative upload, validation
- **Integration**: Form management, file handling

### Grid Components

#### GridTable
- **Purpose**: Data display and interaction
- **Features**: Sortable columns, row selection, responsive design
- **Benefits**: Virtualized rendering for performance

#### GridFilters
- **Purpose**: Data filtering interface
- **Features**: Multiple filter types, real-time filtering, filter persistence
- **Integration**: Grid settings store, filter state management

#### GridPagination
- **Purpose**: Data pagination controls
- **Features**: Page navigation, page size selection, total count display
- **Integration**: Grid state management, API pagination

#### ExportButtons
- **Purpose**: Data export functionality
- **Features**: CSV export, Excel export, filtered data export
- **Integration**: PapaParse, XLSX libraries

### Form Components

#### AuthForm
- **Purpose**: Reusable authentication form
- **Features**: Dynamic field rendering, validation integration, error display
- **Benefits**: DRY principle, consistent styling, accessibility

#### FeedParser
- **Purpose**: RSS feed management interface
- **Features**: Feed URL input, parsing controls, feed list display
- **Integration**: Feed API, form validation

## 🔌 API Integration

### Authentication Flow
```
Client Request → authApi → Backend → Response → Auth Store → UI Update
     ↓              ↓         ↓         ↓         ↓           ↓
Login Form → POST /auth/login → JWT Token → Store Token → Redirect
```

### Data Fetching Pattern
```
Component → TanStack Query → API Module → Fetch → Cache → Component Update
    ↓           ↓              ↓          ↓      ↓         ↓
News Page → useQuery → newsApi → GET /news → Cache → Re-render
```

### API Modules Structure

#### authApi.ts
- **Purpose**: Authentication endpoint integration
- **Features**: Login, register, token management
- **Error Handling**: Custom error messages, status code handling

#### newsApi.ts  
- **Purpose**: News data operations
- **Features**: Fetch news, filter operations, CRUD operations
- **Caching**: TanStack Query automatic caching

#### gridApi.ts
- **Purpose**: Statistics grid data management
- **Features**: Paginated data fetching, filtering, sorting
- **Performance**: Optimized queries, data transformation

#### feedApi.ts
- **Purpose**: RSS feed management
- **Features**: Feed parsing, feed CRUD operations, validation
- **Integration**: Backend RSS parser, feed validation

#### settingsApi.ts
- **Purpose**: User preferences and settings
- **Features**: Save/load grid views, user preferences
- **Persistence**: Backend storage, local caching

### Request/Response Patterns

#### Standard Response Format
```typescript
{
  data: T,           // Response payload
  message?: string,  // Optional message
  error?: string     // Error information
}
```

#### Error Handling Strategy
- **Network Errors**: Automatic retry with exponential backoff
- **HTTP Errors**: Status code specific error messages
- **Validation Errors**: Field-specific error display
- **Timeout Handling**: Request timeout configuration

## ⚡ System Features

### Authentication System
- **JWT Token Management**: Secure token storage in HTTP-only cookies
- **Route Protection**: Automatic redirect for unauthenticated routes
- **Session Persistence**: Maintain login state across browser sessions
- **Security Features**: Token expiration handling, automatic logout

### News Feed Management
- **RSS Integration**: Real-time RSS feed parsing and display
- **Feed Parser**: Add multiple RSS sources, validate feed URLs
- **Content Display**: Responsive news cards, pagination, search
- **Navigation**: Direct links to full articles, category filtering

### Advanced Data Grid
- **Dynamic Columns**: Configurable column visibility and ordering
- **Multi-level Filtering**: Text, date, number, and custom filters
- **Sorting**: Multi-column sorting with visual indicators
- **Pagination**: Efficient large dataset handling
- **Export Functionality**: CSV and Excel export with applied filters
- **Saved Views**: User-defined grid configurations
- **Real-time Updates**: Automatic data refresh

### Advertising Integration
- **Creative Management**: Upload and manage ad creatives
- **SSR Form**: Server-side rendering creative configuration
- **Analytics Integration**: Performance tracking and reporting
- **Dynamic Loading**: Conditional ad module loading

### User Experience Features
- **Responsive Design**: Mobile-first responsive layout
- **Dark Mode Ready**: Theme system prepared for dark mode
- **Loading States**: Skeleton loading and progress indicators
- **Error Boundaries**: Graceful error handling and recovery
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 🚀 Performance Optimizations

### Build-Time Optimizations
- **Tree Shaking**: Eliminate unused code from bundles
- **Code Splitting**: Route-based and component-based splitting
- **Bundle Analysis**: Visualize bundle composition and size
- **Asset Optimization**: Image optimization, SVG optimization
- **Module Federation**: Shared dependencies across applications

### Runtime Optimizations
- **Virtual Scrolling**: Efficient rendering of large datasets
- **Memoization**: React.memo for component optimization
- **Query Caching**: Intelligent data caching with TanStack Query
- **Lazy Loading**: Component and route lazy loading
- **Debounced Inputs**: Prevent excessive API calls

### State Management Optimizations
- **Selective Subscriptions**: Subscribe only to needed state slices
- **Computed Values**: Derived state calculations
- **Persistence Strategy**: Selective state persistence
- **Memory Management**: Automatic cleanup of unused state

### Network Optimizations
- **Request Deduplication**: Prevent duplicate API calls
- **Background Refetching**: Keep data fresh automatically
- **Offline Support**: Cache-first strategies
- **Compression**: Gzip compression for API responses
- **CDN Integration**: Static asset delivery optimization

### Developer Experience Optimizations
- **Hot Module Replacement**: Instant development feedback
- **TypeScript Integration**: Compile-time error detection
- **Fast Refresh**: Preserve component state during development
- **Source Maps**: Debugging support in production

## 🔒 Security Features

### Authentication Security
- **JWT Token Management**: Secure token storage and rotation
- **HTTP-Only Cookies**: Prevent XSS token theft
- **CSRF Protection**: Cross-site request forgery prevention
- **Session Timeout**: Automatic logout after inactivity
- **Secure Headers**: Security-focused HTTP headers

### Input Validation & Sanitization
- **Client-Side Validation**: Zod schema validation
- **XSS Prevention**: Input sanitization and output encoding
- **SQL Injection Prevention**: Parameterized queries (backend)
- **File Upload Security**: Type and size validation
- **URL Validation**: RSS feed URL verification

### Data Protection
- **Sensitive Data Handling**: No sensitive data in localStorage
- **API Security**: Authorization headers, request validation
- **Error Information**: Limited error details in production
- **Logging Security**: No sensitive data in client logs

### Content Security
- **CSP Headers**: Content Security Policy implementation
- **HTTPS Enforcement**: Secure connection requirements
- **Resource Integrity**: Subresource integrity checks
- **Dependency Security**: Regular security audits

## 📊 Monitoring & Observability

### Error Handling Strategy
- **Error Boundaries**: React error boundary implementation
- **Global Error Handler**: Catch and log uncaught errors
- **API Error Handling**: Standardized error response handling
- **User-Friendly Messages**: Clear error communication
- **Error Recovery**: Automatic retry mechanisms

### Performance Monitoring
- **Core Web Vitals**: Performance metrics tracking
- **Bundle Size Monitoring**: Bundle analysis and alerts
- **Runtime Performance**: Component render timing
- **Memory Usage**: Memory leak detection
- **Network Performance**: API response time monitoring

### User Analytics
- **User Journey Tracking**: Navigation and interaction patterns
- **Feature Usage**: Component and feature utilization
- **Error Analytics**: Error frequency and patterns
- **Performance Analytics**: User experience metrics

### Development Observability
- **Development Tools**: React DevTools integration
- **State Debugging**: Zustand DevTools support
- **Query DevTools**: TanStack Query debugging
- **Console Logging**: Structured development logging
- **Hot Reload Monitoring**: Development server health

### Production Monitoring
- **Application Health**: Service availability monitoring
- **Error Rate Tracking**: Error frequency analysis
- **User Feedback**: Error reporting and user feedback
- **Performance Alerting**: Threshold-based alerts
- **Uptime Monitoring**: Service availability tracking

## 🚀 CI/CD Pipeline & Deployment Strategy

### GitHub Actions Workflow

```yaml
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            CI/CD Pipeline Architecture                         │
└─────────────────────────────────────────────────────────────────────────────────┘

    Trigger Events                 Pipeline Stages                 Deployment
         │                              │                             │
         ▼                              ▼                             ▼
┌─────────────────┐     ┌─────────────────────────┐     ┌─────────────────────┐
│  Pull Request   │────▶│    Biome Lint Check     │────▶│   Quality Gates     │
│   (PR to main)  │     │                         │     │                     │
│                 │     │ ┌─────────────────────┐ │     │ ┌─────────────────┐ │
│ Code Changes    │     │ │   Checkout Code     │ │     │ │  Lint Success   │ │
│ New Features    │     │ │   Node.js 20 Setup  │ │     │ │  Build Success  │ │
│ Bug Fixes       │     │ │   Install Biome     │ │     │ │  No Errors      │ │
└─────────────────┘     │ │   Run Lint Check    │ │     │ └─────────────────┘ │
                        │ │   TypeScript Build  │ │     │                     │
                        │ └─────────────────────┘ │     └─────────────────────┘
                        └─────────────────────────┘                 │
                                    │                              │
                                    ▼                              ▼
┌─────────────────┐     ┌─────────────────────────┐     ┌─────────────────────┐
│   Push Event    │────▶│   Production Deploy     │────▶│   Vercel Platform   │
│  (main branch)  │     │                         │     │                     │
│                 │     │ ┌─────────────────────┐ │     │ ┌─────────────────┐ │
│ Merged PR       │     │ │   Checkout Code     │ │     │ │  Global CDN     │ │
│ Direct Push     │     │ │   Vercel Deploy     │ │     │ │  Auto Scaling   │ │
│ Hotfix          │     │ │   Production Args   │ │     │ │  HTTPS/SSL      │ │
└─────────────────┘     │ │   Environment Vars  │ │     │ │  Edge Functions │ │
                        │ └─────────────────────┘ │     │ └─────────────────┘ │
                        └─────────────────────────┘     └─────────────────────┘
```

### CI/CD Pipeline Stages

#### Stage 1: Code Quality Assurance
- **Trigger**: Pull requests and pushes to main/master branches
- **Purpose**: Ensure code quality and prevent broken builds
- **Tools**: Biome linter, TypeScript compiler
- **Process**:
  1. **Checkout Code**: Get latest repository state
  2. **Environment Setup**: Node.js 20 installation
  3. **Dependency Installation**: Install Biome linter
  4. **Code Linting**: Run comprehensive code analysis
  5. **Type Checking**: TypeScript compilation and validation
  6. **Build Verification**: Ensure production build success

#### Stage 2: Automated Deployment
- **Trigger**: Successful push to main/master branch
- **Purpose**: Deploy validated code to production
- **Platform**: Vercel hosting platform
- **Process**:
  1. **Code Checkout**: Fresh repository clone
  2. **Vercel Integration**: Automated deployment trigger
  3. **Build Process**: Vite production build
  4. **Asset Optimization**: Bundle optimization and compression
  5. **Global Distribution**: CDN deployment across edge locations
  6. **Health Checks**: Post-deployment verification

### CI/CD Configuration Details

#### GitHub Actions Setup
```yaml
# Workflow Configuration
name: CI/CD
on:
  pull_request:
    branches: [main, master]  # PR validation
  push:
    branches: [main, master]  # Production deployment

jobs:
  biome-lint:                 # Quality assurance job
    name: Biome lint PR check
    runs-on: ubuntu-latest
    steps:
      - Checkout repository
      - Setup Node.js environment
      - Install development dependencies
      - Execute linting process
      - Validate TypeScript compilation
      
  deploy-vercel:             # Deployment job
    name: Deploy to Vercel
    needs: biome-lint        # Dependency on lint success
    runs-on: ubuntu-latest
    if: github.event_name == 'push'  # Only on push events
    steps:
      - Checkout repository
      - Execute Vercel deployment
```

#### Quality Gates & Checks
- **Linting Standards**: Biome formatting and code quality rules
- **Type Safety**: TypeScript strict mode compilation
- **Build Validation**: Production build success requirement
- **Dependency Blocking**: Deployment blocked on failed quality checks
- **Parallel Execution**: Optimized workflow performance

### Deployment Infrastructure

#### Vercel Platform Integration
- **Automatic Deployments**: Git-based deployment triggers
- **Preview Deployments**: Branch and PR preview environments
- **Production Deployments**: Main branch automatic deployment
- **Rollback Capability**: Instant rollback to previous versions
- **Environment Management**: Secure environment variable handling

#### Deployment Features
- **Zero Downtime**: Seamless deployment updates
- **Global CDN**: Worldwide content distribution network
- **Edge Computing**: Serverless functions at edge locations
- **SSL/TLS**: Automatic HTTPS certificate management
- **Custom Domains**: Professional domain configuration
- **Performance Monitoring**: Real-time deployment analytics

### Environment Configuration

#### Production Environment
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Node.js Version**: 20.x
- **Framework Preset**: Vite
- **Environment Variables**: Secure secret management

#### Security Configuration
- **Secret Management**: GitHub Secrets integration
- **Token Security**: Vercel deployment tokens
- **Organization Settings**: Vercel org/project ID management
- **Access Control**: Repository-based deployment permissions

### Deployment Process Flow

#### Development Workflow
```
Developer → Feature Branch → Pull Request → CI Checks → Code Review → Merge
     ↓             ↓              ↓           ↓            ↓           ↓
Local Dev → Push Changes → PR Creation → Lint/Build → Team Review → Main Branch
```

#### Production Deployment
```
Main Branch → GitHub Action → Vercel Build → CDN Distribution → Live Site
     ↓              ↓              ↓              ↓              ↓
Merge PR → Trigger Deploy → Vite Build → Global Deploy → User Access
```

### Performance & Reliability

#### Build Optimization
- **Caching Strategy**: Node modules and build cache
- **Parallel Processing**: Concurrent job execution
- **Fast Builds**: Optimized dependency installation
- **Incremental Builds**: Only rebuild changed components

#### Monitoring & Alerting
- **Build Status**: GitHub status checks integration
- **Deployment Notifications**: Automated team notifications
- **Error Reporting**: Failed build/deployment alerts
- **Performance Metrics**: Build time and deployment tracking

### Branch Strategy & Workflows

#### Git Flow Integration
- **Main Branch**: Production-ready code
- **Feature Branches**: Development and testing
- **Pull Requests**: Code review and validation
- **Protected Branches**: Prevent direct pushes to main

#### Release Management
- **Continuous Deployment**: Automatic production releases
- **Preview Environments**: PR-based testing environments
- **Hotfix Deployment**: Emergency fix deployment capability
- **Version Control**: Git-based version management

---

This comprehensive frontend architecture provides a robust, scalable foundation for modern web applications with excellent performance characteristics, comprehensive feature sets, and maintainable codebase structure optimized for both developer experience and end-user performance.