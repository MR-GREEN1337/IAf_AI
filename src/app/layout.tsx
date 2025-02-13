import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ChatBubble, { ChatBubbleWrapper } from '@/components/global/ChatBubble';
import "./globals.css";
import TextWrapper from "@/components/global/TextWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IAf AI",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TextWrapper>
        {children}
        </TextWrapper>
        <ChatBubbleWrapper />
      </body>
    </html>
  );
}