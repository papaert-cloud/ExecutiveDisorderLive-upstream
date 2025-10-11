# Executive Disorder - Political Satire Game

## Overview

Executive Disorder is a humorous political decision-making web application where players choose a satirical political character and navigate decisions affecting popularity, stability, media perception, and economy. The game features a dual 2D/3D rendering approach, focusing on comedic, absurd political scenarios. Built with React, TypeScript, and Express, it aims to create an engaging satirical experience combining modern web technologies with game mechanics.

## Recent Changes

### October 11, 2025 - PAGE-BASED ARCHITECTURE: Complete UI Redesign
**Transformed from Single-Page to Multi-Page Routing System**

Successfully redesigned the entire game with page-based navigation for better performance and asset management:

**New Page Structure (5 pages):**
- **Title Page (`/`):** Rainbow gradient title, animated particles, click-to-enter
- **Menu Page (`/menu`):** Modern card grid (New Game, Continue, Gallery, Settings), headline ticker
- **Character Select (`/character-select`):** Grid of 12 characters with hover effects, stat previews
- **Character Stats (`/character/:id`):** Full character bio, animated stats bars, abilities list, start button
- **Game Page (`/game`):** Side-by-side layout (background scene + decision cards), live HUD

**Complete Style Overhaul:**
- Title: Bold rainbow gradient typography (amber→red→pink→purple→blue)
- Menu: Dark gradient + animated grid overlay + scrolling ticker
- Characters: Card-based grid with portraits, hover glow effects
- Stats: Large 3:4 portrait, animated progress bars, yellow accents
- Game: Split view design for backgrounds + decision cards

**Technical Architecture:**
- Implemented wouter routing (no Router wrapper needed)
- Extended GameState: selectedCharacter, resources, setSelectedCharacter, startGame, makeDecision
- Safe navigation: useEffect-based redirects, deterministic particle rendering
- State flow: Character selection → Resource initialization → Game start

**Benefits:**
- Each page loads only needed assets (videos, audio, effects)
- No single bloated component
- Better performance and maintainability
- Clean transitions between scenes
- Ready for rich media integration

**Files Created:**
- `client/src/pages/TitlePage.tsx` - Rainbow title with particles
- `client/src/pages/MenuPage.tsx` - Card-based menu
- `client/src/pages/CharacterSelectPage.tsx` - Character grid
- `client/src/pages/CharacterStatsPage.tsx` - Character details
- `client/src/pages/GamePage.tsx` - Side-by-side gameplay
- `PAGE_BASED_ARCHITECTURE.md` - Complete documentation

**Files Modified:**
- `client/src/App.tsx` - Routing implementation
- `client/src/lib/stores/useGameState.tsx` - Extended state management

### October 11, 2025 - MAJOR EXPANSION: Comprehensive Game Scale-Up
**Pivoted to AI-Powered Content Generation & Expanded Game Scope**

Based on comprehensive backend configuration documentation, significantly expanded the game:

**Content Scale-Up:**
- **Decision Cards:** 50+ → 150 cards (3x expansion)
- **Characters:** 10 → 12 leaders (added Tech Disruptor, Conspiracy Chief)
- **Crisis Events:** Enhanced crisis system with 50 unique events
- **Endings:** 5 → 20 different endings (victory, disaster, chaos, special)
- **Factions:** Expanded to 10 political factions

**Enhanced Game Mechanics:**
- **Pandemonium System:** Chaos threshold at 85%, multiplier 1.5x
- **Advanced Reward/Punishment Matrix:** Excellent (1.5x) to Terrible (0.5x) multipliers
- **Consequence Chains:** Immediate, short-term, medium-term, long-term, endgame
- **Card Categories:** Normal (35%), Crisis (20%), Scandal (15%), Absurd (20%), Character (10%)

**New Content Themes (48 total):**
- Political: executive_overreach, bureaucratic_nightmare, legislative_chaos, etc.
- Economic: market_manipulation, fiscal_insanity, cryptocurrency_chaos, etc.
- Social: viral_phenomena, social_media_meltdown, cultural_wars, etc.
- Environmental: climate_catastrophe, renewable_rebellion, extinction_event, etc.
- Technology: ai_uprising, cyber_warfare, digital_dystopia, etc.
- Military: defense_dilemma, surveillance_state, space_force_shenanigans, etc.
- Media: fake_news_frenzy, propaganda_push, meme_warfare, etc.
- Absurd: time_travel_taxes, alien_diplomacy, sentient_buildings, etc.

**Art & Audio Direction:**
- 4 Art Palettes: satirical_poster, corporate_dystopia, media_frenzy, tech_nightmare
- 8 Voice Profiles: authoritative_leader, cynical_narrator, doom_prophet, etc. (ElevenLabs ready)
- 7 Tone Modifiers: darkly_comedic, painfully_ironic, deadpan_absurd, etc.

**Technical Implementation:**
- Created `client/src/config/gameConfig.ts` - Comprehensive game configuration
- Created `client/src/data/additionalCharacters.ts` - 2 new satirical leaders
- Created `client/src/data/expandedEndings.ts` - 20 unique ending scenarios
- Enhanced pandemonium mechanics and consequence chains
- AI provider configuration for future content generation (OpenAI, ElevenLabs, Stability, Anthropic)

**Files Created/Modified:**
- `client/src/config/gameConfig.ts` - Game balance, content counts, art/audio configs
- `client/src/data/additionalCharacters.ts` - Silicon Valleyson, Truther McQuestion
- `client/src/data/expandedEndings.ts` - 20 endings with S to F rankings

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

### Content Generation Workflow

**⚠️ IMPORTANT: Two-Phase Architecture**

**Phase 1: Pre-Generation (One-time, before deployment):**
- Run backend generation system to create all 242+ assets (cards, leaders, crises, endings)
- Export everything to Dropbox/Replit folder as JSON/YAML files
- Generate all images, portraits, audio using AI APIs (ElevenLabs, Runway ML, etc.)
- **AI APIs used ONLY in this phase, NOT during gameplay**

**Phase 2: Game Runtime (What players use):**
- Load pre-generated assets from static JSON/TypeScript files
- Player tracking saves stats to localStorage/Dropbox
- Game saves/loads work with pre-generated content
- **NO API calls during gameplay - all assets are static**

### Frontend Architecture

-   **Framework & Build System:** React 18 with TypeScript, Vite for bundling, and GLSL shader support.
-   **Routing System:** Page-based architecture using wouter for clean scene transitions. 5 distinct pages: Title, Menu, Character Select, Character Stats, Game.
-   **UI Component System:** Radix UI primitives, Tailwind CSS for styling, custom HSL-based color tokens, and shadcn/ui patterns.
-   **Game Rendering:** Multi-page approach with dedicated pages for each game phase. Future: Dual 2D DOM-based and 3D WebGL (Three.js via React Three Fiber) rendering.
-   **State Management:** Zustand for game state (selectedCharacter, resources, turn, gamePhase) with extended actions. React Query for server state. Local storage for persistence.
-   **Game Flow:** Title → Menu → Character Selection (grid) → Character Stats (detailed view) → Game (side-by-side cards + backgrounds). Turn-based progression with multiple endings.
-   **Asset Loading:** Each page loads only needed assets. All game content (cards, characters, endings, videos, images) from static files - NO runtime API calls.

### Backend Architecture

-   **Server Framework:** Express.js with TypeScript, ESM modules, and tsx for development.
-   **API Design:** RESTful API with centralized route registration, error handling middleware, and request/response logging.
-   **Storage Layer:** Abstract storage interface with in-memory implementation (`MemStorage`) as default, designed for database-agnostic operations.
-   **Pre-Generation Services:** ElevenLabs, Runway ML APIs used ONLY for asset pre-generation, disabled during gameplay.

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