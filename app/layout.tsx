import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI 问答机器人",
  description: "一个由 Vercel 部署的 AI 问答机器人",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <main className="container mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  );
}