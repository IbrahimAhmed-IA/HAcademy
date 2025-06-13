import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "HebaAbozaid Academy - Transform Your Life Through Nutrition",
  description: "Join HebaAbozaid Academy for expert-led nutrition courses, personalized wellness education, and transformative health coaching. Start your journey to a healthier lifestyle today.",
  keywords: "nutrition, wellness, education, courses, health, fitness, sports nutrition, weight management, health coaching, personalized nutrition",
  authors: [{ name: "Heba Abozaid" }],
  openGraph: {
    title: "HebaAbozaid Academy - Transform Your Life Through Nutrition",
    description: "Expert-led nutrition courses and wellness education to transform your life",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
