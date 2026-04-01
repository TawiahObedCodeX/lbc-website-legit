import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Lakeside Baptist Church | Welcome Home",
  description:
    "A lighthouse for the lost, a home for the family, and a sanctuary for every soul seeking truth.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-background text-primary">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}