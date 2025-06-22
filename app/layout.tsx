import { Outfit } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/context/ThemeContext';
import ReactQueryProvider from '@/providers/react-query-provider';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`}>
        <ThemeProvider>
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
