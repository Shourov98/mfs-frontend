'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { Provider } from 'react-redux';
import { store } from '../lib/store'; // Adjust path to your Redux store
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata = {
//   title: 'Mobile Finace Service',
//   description: 'Mobile Finace Service App',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}