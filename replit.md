# Executive Disorder - Political Satire Game

## Overview

Executive Disorder is a humorous political decision-making web application where players choose a satirical political character and navigate decisions affecting popularity, stability, media perception, and economy. The game features a dual 2D/3D rendering approach, focusing on comedic, absurd political scenarios. Built with React, TypeScript, and Express, it aims to create an engaging satirical experience combining modern web technologies with game mechanics.

## Recent Changes

### October 11, 2025 - Ending Cinematics Generated
**5 High-Quality Dramatic Ending Videos**

Successfully generated 5 AI-powered ending cinematics for game conclusion sequences:

**Ending Cinematics (5 videos, 49.88 MB total):**
- `ending-victory-triumph.mp4` (10.45 MB) - Perfect victory celebration
- `ending-scandal-impeachment.mp4` (9.23 MB) - Political scandal and impeachment
- `ending-economic-collapse.mp4` (10.18 MB) - Economic catastrophe ending
- `ending-revolution-uprising.mp4` (9.29 MB) - Civil uprising and revolution
- `ending-nuclear-catastrophe.mp4` (10.74 MB) - Apocalyptic worst-case scenario

**Technical Specifications:**
- Format: MP4 (H.264), 1280x768 HD (16:9)
- Duration: 10 seconds each
- AI Model: Runway ML Gen3a Turbo
- Uploaded to Dropbox: `/Replit/ExecutiveDisorder_Assets/09_Video_Assets/Ending_Cinematics/`
- Game assets: `client/public/videos/ending-cinematics/`

**Trigger Conditions:**
- Victory: All resources >70
- Scandal: Media/Popularity <30
- Economic: Economy <20
- Revolution: Stability <20
- Nuclear: All resources <25

**Documentation:**
- Complete manifest: `ENDING_CINEMATICS_MANIFEST.md`
- Quick reference: `README.md`
- Integration logic and code examples included

### October 11, 2025 - Replay Loop Videos Generated
**9 High-Quality Seamless Background Loops**

Successfully generated 9 AI-powered seamless loop videos for dynamic gameplay backgrounds:

**Replay Loop Videos (9 videos, 112 MB total):**
- `government-office-ambient.mp4` (5.2 MB) - Formal office atmosphere
- `political-rally-crowd.mp4` (19 MB) - Energetic rally with supporters
- `breaking-news-ticker.mp4` (13 MB) - Newsroom with scrolling tickers
- `capitol-building-exterior.mp4` (12 MB) - Majestic government building
- `press-conference-room.mp4` (7.2 MB) - Official press briefing room
- `protest-demonstration.mp4` (18.7 MB) - Peaceful political protest
- `campaign-headquarters.mp4` (11.2 MB) - Busy campaign war room
- `stock-market-displays.mp4` (14.3 MB) - Wall Street trading floor
- `media-circus-exterior.mp4` (11.4 MB) - News vans and reporters

**Technical Specifications:**
- Format: MP4 (H.264), 1280x720 HD
- Duration: 8 seconds each (seamless loops)
- AI Model: Google Veo3 via Runway ML
- Uploaded to Dropbox: `/Replit/ExecutiveDisorder_Assets/09_Video_Assets/Replay_Loop_Videos/`
- Game assets: `client/public/videos/replay-loops/`

**Usage:** Event-triggered backgrounds, resource-based displays, phase-specific atmospheres

**Documentation:**
- Complete manifest: `REPLAY_LOOPS_MANIFEST.md`
- Quick reference: `README.md`
- Integration examples included

**Note:** 9 of 15 planned videos generated (API credit limit reached)

### October 11, 2025 - Final Opening Cinematics with Branding Complete
**Major Update: Professional Cinematics with Executive Disorder Logo + Grand Opening**

Successfully created branded opening cinematics with Executive Disorder logo overlays and a grand 48-second combined cinematic:

**Final Cinematics (5 videos, 39.8 MB total):**
- `opening-01-political-chaos-final.mp4` (5.0 MB) - With "CHAOS INCOMING" title + logo
- `opening-02-media-frenzy-final.mp4` (7.1 MB) - With "BREAKING NEWS" title + logo
- `opening-03-power-ascension-final.mp4` (4.6 MB) - With "RISE TO POWER" title + logo
- `opening-04-critical-decision-final.mp4` (3.8 MB) - With "CHOOSE WISELY" title + logo
- `grand-opening-cinematic.mp4` (19.5 MB) - All 4 scenes combined (48s epic narrative)

**Branding Features:**
- **Executive Disorder Logo** appears in last 3 seconds of each video
- **Scene-specific title cards** ("CHAOS INCOMING", "BREAKING NEWS", etc.)
- **Gold "EXECUTIVE DISORDER" text** with professional fade animations
- **Grand cinematic** tells complete story: Rise to Power → Chaos → Media → Decision

**Technical Specifications:**
- Format: MP4 (H.264), 1920x1080 Full HD
- Individual duration: 12 seconds each
- Grand cinematic: 47.7 seconds
- Uploaded to Dropbox cloud: `/Replit/ExecutiveDisorder_Assets/09_Video_Assets/Opening_Cinematics_Final/`
- Game assets: `client/public/videos/opening-cinematics-final/`

**Documentation:**
- Complete manifest: `FINAL_CINEMATICS_MANIFEST.md`
- Quick reference: `README.md` 
- Integration examples and 4 usage options

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