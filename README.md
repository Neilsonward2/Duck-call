# DuckCall Master

DuckCall Master is a mobile-first web application designed for duck hunters to learn and perfect their calling techniques. Built with React, Tailwind CSS, and Capacitor, it provides a seamless mobile experience for training in the field or at home.

## Features

-   **Learn Section**: Expert-curated video tutorials covering basic quacks, greeting calls, feed chuckles, and advanced techniques.
-   **Voice Trainer**: Record your duck calls directly in the app.
-   **Performance Analysis**: Get instant feedback and scoring on your calls with actionable recommendations for improvement.
-   **Mobile Ready**: Optimized for mobile devices with a native look and feel.

## Tech Stack

-   **Frontend**: React 19, TypeScript, Vite
-   **Styling**: Tailwind CSS
-   **Animations**: Framer Motion
-   **Mobile Bridge**: Capacitor
-   **Native Features**: `capacitor-voice-recorder` for high-quality audio capture.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm

### Installation

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```

### Running the App

#### Development Mode
```bash
npm run dev
```

#### Production Build
```bash
npm run build
```

### Mobile Deployment

To build for mobile (iOS/Android), you will need to add the respective platforms using Capacitor:

```bash
npx cap add ios
npx cap add android
npx cap sync
```

## How it Works

1.  **Watch**: Head to the **Learn** tab to watch tutorials.
2.  **Record**: Go to the **Train** tab and tap the microphone icon to start recording your call.
3.  **Analyze**: After stopping the recording, the app will automatically analyze your performance and provide tips on how to improve your tone, rhythm, and breath control.
4.  **Playback**: Listen back to your recording to hear exactly what needs adjustment.

---

*Happy Hunting!*
