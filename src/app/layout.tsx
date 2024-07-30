// src/app/layout.tsx
import React from 'react';
import { CssBaseline } from '@mui/material';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}