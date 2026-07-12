import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/i18n/config";
import "../globals.css";
import { geistSans, geistMono } from "@/shared";
import { Header } from "@/components/ui";
import { ThemeProvider } from "@/components/ui";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Менеджер Заказов Литературы",
  description: "Система учета и распределения печатных изданий",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("theme")?.value;
  const isDark = savedTheme === "dark";

  const [session, messages] = await Promise.all([auth(), getMessages()]);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} antialiased ${isDark ? "dark" : ""}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Header session={session} />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
