import type { Metadata } from "next";
import "./globals.css";
import { Roboto_Slab } from "next/font/google";
import { cn } from "@/lib/utils";

const robotoSlab = Roboto_Slab({subsets:['latin'],variable:'--font-serif'});

export const metadata: Metadata = {
  title: "GearUp",
  description: "A sports and outdoor equipment rental service",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-serif", robotoSlab.variable)}
    >
      <body className="min-h-full flex flex-col">
        Navbar
        {children}
        </body>
    </html>
  );
}
