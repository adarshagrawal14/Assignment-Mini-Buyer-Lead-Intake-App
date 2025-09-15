import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // Import the Toaster component
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buyer Lead Intake App",
  description: "Manage and track buyer leads efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}>
        <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight text-lg">Buyer Lead App</Link>
            <nav className="flex items-center gap-4">
              <Link href="/buyers" className="text-sm text-gray-700 hover:text-gray-900">Leads</Link>
              <Link href="/buyers/new" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">New Lead</Link>
            </nav>
          </div>
        </header>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <div className="min-h-[calc(100vh-4rem)]">{children}</div>
        <footer className="border-t bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center text-sm text-gray-600">
            © {new Date().getFullYear()} Buyer Lead App
          </div>
        </footer>
      </body>
    </html>
  );
}
