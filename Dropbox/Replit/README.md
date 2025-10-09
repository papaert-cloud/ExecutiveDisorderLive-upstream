# Executive Disorder - Asset Archive

This folder contains all generated and approved assets for the Executive Disorder game.

## Folder Structure

### `/characters/main-portraits/`
Contains the 10 approved main character portraits used in the "Choose Your Leader" selection screen:
- alexandria-sanders.png
- diana-newsworthy.png
- donald-executive.png
- dr-technocrat.png
- general-steel.png
- johnny-public.png
- potus-9000.png
- rex-scaleston.png
- richard-moneybags.png
- senator-tradition.png

### `/characters/variations/`
Contains 50 emotional variations (5 per character):
- Each character has: neutral, happy, angry, stressed, confident versions
- Used for dynamic character expressions during gameplay

### `/logos/`
Contains game branding assets:
- executive-disorder-logo.png - Main game logo

### `/generated-images/`
Contains all raw generated images from the AI image generation tool with original filenames for reference and backup.

## Usage
- Main portraits are deployed to `client/public/characters/{character-id}.png`
- Variations are deployed to `client/public/characters/{character-id}-{emotion}.png`
- Logo is deployed to `client/public/logo.png`

## Date Created
October 9, 2025
