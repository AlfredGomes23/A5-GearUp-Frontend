import type { Metadata } from "next";
import "./globals.css";
import { Roboto_Slab } from "next/font/google";
import { cn } from "@/lib/utils";
import NavbarHandler from "@/components/shared/NavbarHandler";
import FooterHandler from "@/components/shared/FooterHandler";
import { Toaster } from "@/components/ui/sonner";

const robotoSlab = Roboto_Slab({subsets:['latin'],variable:'--font-serif'});

export const metadata: Metadata = {
  title: "GearUp",
  description: "A sports and outdoor equipment rental service",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", robotoSlab.variable)}
    >
      <body className="min-h-screen flex flex-col mx-auto max-w-7xl">
        <NavbarHandler/>
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <FooterHandler/>
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
