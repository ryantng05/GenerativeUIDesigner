import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Generative UI Designer",
  description: "Generate production-ready React + Tailwind components from text prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}



