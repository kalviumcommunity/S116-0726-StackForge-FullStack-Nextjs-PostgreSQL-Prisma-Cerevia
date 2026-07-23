import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cerevia.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Cerevia V2 — Premium AI-Powered Education Platform for Engineers',
  description: 'Master full-stack engineering, distributed systems, and AI LLM architecture with interactive labs, streak motivation, verified specialization certificates, and real-time AI mentoring.',
  keywords: [
    'nextjs 15',
    'typescript',
    'full stack engineering',
    'ai mentor',
    'coursera light theme',
    'gamified education',
    'verified certificates',
    'postgresql',
    'prisma orm',
    'redis leaderboards'
  ],
  authors: [{ name: 'Cerevia Engineering Board' }],
  openGraph: {
    title: 'Cerevia V2 — Premium AI-Powered Education Platform',
    description: 'Master full-stack software architecture with real-time AI mentoring, verified specialization certificates, and competitive leaderboards.',
    url: baseUrl,
    siteName: 'Cerevia Education',
    images: [
      {
        url: '/images/coursera/hero-student.webp',
        width: 1200,
        height: 630,
        alt: 'Cerevia V2 Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cerevia V2 — AI-Powered Education Platform',
    description: 'Interactive full-stack learning platform for software engineers.',
    images: ['/images/coursera/hero-student.webp'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0056D2',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <ThemeProvider defaultTheme="light">
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
