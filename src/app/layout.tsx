import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { Suspense } from "react";

// Professional Metadata for 2026 SEO
export const metadata: Metadata = {
  title: "Lakeside Baptist Church | Welcome Home",
  description: "A lighthouse for the lost, a home for the family, and a sanctuary for every soul seeking truth.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* --- CRITICAL: THE METAMASK ERROR KILLER --- */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('unhandledrejection', function(event) {
                // Silently catch and ignore MetaMask extension errors
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
        {/* --- END ERROR KILLER --- */}
      </head>
      <body className="antialiased bg-[#FDFCF8] text-primary overflow-x-hidden selection:bg-secondary selection:text-primary">
        <Suspense fallback={<LoadingScreen />}>
          {/* Main Site Structure */}
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-grow">
              {children}
            </main>
            
            <Footer />
          </div>
        </Suspense>
      </body>
    </html>
  );
}