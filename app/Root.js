// Root.js
import React, { useState } from 'react';
import Welcome from './Welcome';
import App from './App';
import { ThemeProvider } from './themecontext';

export default function Root() {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return (
      <ThemeProvider>
        <Welcome onContinue={() => setShowApp(true)} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
