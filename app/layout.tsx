import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "GearUp",
  description: "A sports and outdoor equipment rental service",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        Navbar
        {children}
        </body>
    </html>
  );
}
