import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://agent-lcm.com"),
  title: "Agent LCM — One shared memory for coding agents",
  description: "Shared local-first lossless context memory for Codex, Cursor, VS Code, GitHub Copilot, Kiro, and Claude Code.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Agent LCM — Every coding agent. One shared memory.",
    description: "Shared local-first lossless context memory for agent harnesses.",
    url: "/",
    siteName: "Agent LCM",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Coding-agent sessions converging into Agent LCM shared memory" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent LCM — Every coding agent. One shared memory.",
    description: "Shared local-first lossless context memory for agent harnesses.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
