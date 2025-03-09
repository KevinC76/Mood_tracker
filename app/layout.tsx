import type { Metadata } from 'next';
import { Fugaz_One, Geist } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import Head from './head';
import Logout from '@/components/Logout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const fugaz = Fugaz_One({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Mood Tracker',
  description: 'Track Your Mood Right Now',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={'/'}>
        <h1 className={`text-base sm:text-lg textGradient ${fugaz.className}`}>
          Broodl
        </h1>
      </Link>
      <Logout />
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={`${fugaz.className} text-indigo-500 h-auto`}>
        Made With Love
      </p>
    </footer>
  );

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body
          className={`${geistSans.variable}  w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex-col text-slate-800 flex`}
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
