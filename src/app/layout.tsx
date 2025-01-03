import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import "./globals.css";
import { ToastProvider } from "@/providers/ToastProvider"
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = GeistSans
const geistMono = GeistMono

export const metadata: Metadata = {
  title: "Reekon Robot Management",
  description: "Reekon Robot Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
