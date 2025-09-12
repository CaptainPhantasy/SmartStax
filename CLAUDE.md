# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo React Native application with TypeScript, using NativeWind (Tailwind) for styling and React Navigation for navigation.

## Development Commands

```bash
# Install dependencies (use bun)
bun install

# Start development
bun start

# Platform-specific
bun run ios       # iOS simulator
bun run android   # Android emulator
bun run web       # Web browser

# Run linting
bun run eslint .

# Type checking
bun run tsc --noEmit
```

## Architecture

### Core Stack
- **Expo SDK 53** with React Native 0.79.2
- **TypeScript** with strict mode enabled
- **NativeWind v4** for Tailwind CSS styling
- **React Navigation v7** for navigation
- **Zustand** for state management

### Key Directories
- `src/api/` - Pre-built API clients for AI services (OpenAI, Anthropic, Grok)
- `src/components/` - Reusable UI components
- `src/screens/` - App screens
- `src/navigation/` - Navigation configuration
- `src/state/` - State management with Zustand
- `src/utils/` - Utility functions including `cn.ts` for className merging

### Pre-built API Implementations

The project includes ready-to-use API implementations:
- **`chat-service.ts`** - Functions for getting text responses from LLMs with image input support
- **`transcribe-audio.ts`** - Audio transcription using OpenAI's gpt-4o-transcribe model
- **`image-generation.ts`** - Image generation using OpenAI's gpt-image-1 model
- **`anthropic.ts`, `openai.ts`, `grok.ts`** - Pre-configured API clients

## Important Guidelines

### Camera Implementation
Use the new CameraView API, not the deprecated Camera:
```tsx
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
// Use style prop, not className for CameraView
<CameraView style={{ flex: 1 }} facing={facing} />
```

### Navigation & Safe Areas
- App.tsx already wraps the app with SafeAreaProvider
- Use View (not SafeAreaView) in screens to avoid double safe area handling
- StatusBar should be placed before TabNavigator, not inside screens

### Asset Generation
- Use `generate-asset-script.ts` for generating app assets (max 3 per run)
- Request PNG or JPEG formats only, not SVG
- Save generated assets to the `assets/` folder

### Forbidden Files
Do not modify: `tsconfig.json`, `babel.config.js`, `metro.config.js`, `app.json`, patches folder, `.eslintrc.js`, `.prettierrc`, `.gitignore`, `nativewind-env.d.ts`

## API Usage Notes

- **Audio Transcription**: Use the existing `transcribeAudio` function from `src/api/transcribe-audio.ts`
- **Image Generation**: Use the existing `generateImage` function from `src/api/image-generation.ts`
- **LLM Chat**: Use functions from `src/api/chat-service.ts` which support image inputs
- All API keys are pre-configured in the environment