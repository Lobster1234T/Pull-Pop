import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "./i18n/LanguageProvider";
import ChatWidget from "./components/ChatWidget";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Footer from "./components/Footer";
import GlobalErrorBoundary from "./components/GlobalErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AVATAR Gaming Club",
  description: "AVATAR Gaming Club - Premium gaming club in Bishkek",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark-theme`}
    >
      <head>
        <meta name="theme-color" content="#0f172a" />
        <meta name="description" content="AVATAR Gaming Club - Premium gaming club in Bishkek" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <GlobalErrorBoundary>
          <LanguageProvider>
            <div className="flex-grow">{children}</div>
            <ChatWidget />
            <ThemeSwitcher />
            <Footer />
          </LanguageProvider>
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}

