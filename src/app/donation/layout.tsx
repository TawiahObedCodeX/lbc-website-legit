import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Give | Lakeside Baptist Church",
  description: "Secure giving portal.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06040d",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}