import { Metadata, Viewport } from "next";

// 1. Separate Metadata
export const metadata: Metadata = {
  title: "Give | Lakeside Baptist Church",
  description: "Secure giving portal.",
};

// 2. Separate Viewport Export (This stops the yellow warning)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06040d",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}