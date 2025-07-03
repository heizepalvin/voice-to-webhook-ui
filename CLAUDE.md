# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Preference

**Important**: Please respond in Korean (한국어) when working on this project.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

**Note:** No testing framework is currently configured in this project.

## Architecture Overview

This is a **Voice-to-Webhook UI** application that captures voice input in Korean, transcribes it to text, and sends it to a Make.com webhook.

### Core Functionality
1. **Voice Recognition**: Captures and transcribes speech using Web Speech API (`webkitSpeechRecognition`)
2. **Webhook Integration**: Sends transcribed text to Make.com webhooks via POST requests
3. **Real-time Feedback**: Visual audio level indicators and recording status
4. **Auto-send Feature**: Automatically sends transcription after speech with debouncing

### Technology Stack
- **React 18.3.1** with TypeScript
- **Vite** as build tool
- **shadcn/ui** component library (50+ pre-built components based on Radix UI)
- **Tailwind CSS** for styling
- **React Router v6** for routing
- No backend services or authentication

### Project Structure
```
/src
├── /components     # UI components (VoiceRecorder, WebhookSender, etc.)
│   └── /ui        # shadcn/ui component library
├── /data          # Static data (shortcuts.ts)
├── /hooks         # Custom React hooks
├── /pages         # Page components (Index, NotFound)
└── /lib           # Utility functions
```

## Key Technical Details

### Speech Recognition
- Language: Korean (`ko-KR`)
- Auto-stops after 3 seconds of silence
- Continuous recognition with interim results
- Browser compatibility check for `webkitSpeechRecognition`

### Webhook Integration
- Endpoint: Make.com webhooks
- Request mode: `no-cors` (important for cross-origin requests)
- Payload structure:
  ```typescript
  {
    text: string,
    timestamp: string,
    source: "voice-ui"
  }
  ```

### Custom Hooks
- `useSpeechRecognition`: Manages speech recognition lifecycle
- `useAutoSend`: Toggle state for auto-send feature
- `useAudioLevel`: Real-time microphone audio analysis using Web Audio API

## Development Patterns

### Component Architecture
- **Container Pattern**: `Index.tsx` manages state and passes props to child components
- **Single Responsibility**: Components are focused on specific functionality
- **TypeScript**: Strict typing throughout the application

### Configuration
- Path alias: `@/*` maps to `./src/*`
- Development server port: 8080
- No environment variables used
- Client-side only (no API keys or secrets)

### UI/UX Patterns
- Gradient-based visual design
- Korean language interface
- Toast notifications using Sonner
- Responsive grid layout for shortcuts (decorative only, no functionality)