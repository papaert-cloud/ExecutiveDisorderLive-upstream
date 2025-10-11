# Executive Disorder - Political Satire Game

## Overview

Executive Disorder is a humorous political decision-making web application where players choose a satirical political character and navigate decisions affecting popularity, stability, media perception, and economy. The game features a dual 2D/3D rendering approach, focusing on comedic, absurd political scenarios. Built with React, TypeScript, and Express, it aims to create an engaging satirical experience combining modern web technologies with game mechanics.

## User Preferences

**Communication Style:** Simple, everyday language.

**Asset Management Workflow:**
- **Primary Storage:** All generated assets automatically saved to `Dropbox/Replit/ExecutiveDisorder_Assets/`
- **Organized by 12 categories:**
  - `01_Characters/` - Character portraits, emotions, expressions, and character cards
  - `02_Decision_Cards/` - Card visuals (future)
  - `03_Endings/` - Ending screens (future)
  - `04_UI_Elements/` - Logo, backgrounds, buttons
  - `05_Backgrounds/` - Scene images and variations
  - `06_Audio/` - Sound effects and music
  - `07_Effects/` - Visual effects (future)
  - `08_Data_Files/` - Documentation and tracking
  - `09_Video_Assets/` - Animated backgrounds and events
  - `10_AI_Generated/` - Generation logs and attribution
  - `11_Localization/` - Multi-language assets (future)
  - `12_Marketing/` - Promotional materials (future)
- **Naming Convention:** Lowercase-hyphen-separated (e.g., `character-name-emotion.png`)
- **Documentation:** Complete manifest in `ASSET_MANIFEST.md`
- **Dropbox Backend:** All assets synced to `/Replit/ExecutiveDisorder_Assets/`

## System Architecture

### Frontend Architecture

-   **Framework & Build System:** React 18 with TypeScript, Vite for bundling, and GLSL shader support.
-   **UI Component System:** Radix UI primitives, Tailwind CSS for styling, custom HSL-based color tokens, and shadcn/ui patterns.
-   **Game Rendering:** Dual 2D DOM-based and 3D WebGL (Three.js via React Three Fiber) rendering, supporting GLTF/GLB models and GLSL shaders.
-   **State Management:** Zustand for game state (game phase, characters, resources) and React Query for server state. Local storage for persistence.
-   **Game Flow:** Character selection, card-based decisions affecting resources, turn-based progression, and multiple ending scenarios based on resource scores.

### Backend Architecture

-   **Server Framework:** Express.js with TypeScript, ESM modules, and tsx for development.
-   **API Design:** RESTful API with centralized route registration, error handling middleware, and request/response logging.
-   **Storage Layer:** Abstract storage interface with in-memory implementation (`MemStorage`) as default, designed for database-agnostic operations.

### Data Storage Solutions

-   **Database Configuration:** Drizzle ORM for PostgreSQL via `@neondatabase/serverless`, with schema defined in `/shared/schema.ts`.
-   **Data Models:** User table with id, unique username, and password, using type-safe schema inference and Zod for validation.
-   **Session Management:** Connect-pg-simple for PostgreSQL session storage with cookie-based handling.

## External Dependencies

-   **Database & ORM:** Neon serverless PostgreSQL, Drizzle ORM.
-   **3D Graphics & Rendering:** Three.js, React Three Fiber, Drei, Postprocessing.
-   **UI & Styling:** Radix UI, Tailwind CSS, Inter font, Class Variance Authority (CVA).
-   **Utilities & Tooling:** date-fns, cmdk, nanoid, Zod.
-   **Development Tools:** Replit-specific Vite plugin, TypeScript, Path aliases, vite-plugin-glsl.
-   **Asset Support:** Standard web image formats, GLTF/GLB 3D models, MP3/OGG/WAV audio, JSON-based fonts.