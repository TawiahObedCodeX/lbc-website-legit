import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { Suspense } from "react";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('unhandledrejection', function(event) {
                if (event.reason && (
                  event.reason.message?.includes('MetaMask') ||
                  event.reason.message?.includes('nkbihfbeogaeaoehlefnkodbefgpgknn')
                )) {
                  event.preventDefault();
                  console.warn("LBC Dev Alert: Extension error suppressed to prevent UI crash.");
                }
              });
            `,
          }}
        />
      </head>
      <body className="antialiased bg-background text-primary overflow-x-hidden selection:bg-secondary selection:text-primary">
        <Suspense fallback={<LoadingScreen />}>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </Suspense>
      </body>
    </html>
  );
}