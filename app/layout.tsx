import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MomentClipper – Online Video Timeline Cutter",
  description: "MomentClipper is a simple browser-based video clipping tool. Upload a video, select timeline segments, and instantly download clips without uploading your file to a server.",
  keywords: ["video clipper", "video cutter", "timeline video editor", "clip video online", "browser video editor", "ffmpeg wasm video cutter"],
  authors: [{ name: "MomentClipper" }],
  openGraph: {
    title: "MomentClipper – Online Video Timeline Cutter",
    description: "Cut video moments instantly in your browser.",
    type: "website",
    siteName: "MomentClipper",
  },
  twitter: {
    card: "summary_large_image",
    title: "MomentClipper – Online Video Timeline Cutter",
    description: "Cut video moments instantly in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MomentClipper",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "description": "Browser-based video clipper that cuts timeline segments locally using FFmpeg WASM.",
  };

  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
