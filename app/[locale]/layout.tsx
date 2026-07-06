import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/i18n/config";
import "../globals.css";
import { geistSans, geistMono } from "@/shared";
import { Header } from "@/components/ui";

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

  const [session, messages] = await Promise.all([auth(), getMessages()]);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
        <NextIntlClientProvider messages={messages}>
          <Header session={session} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
