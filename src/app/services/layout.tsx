import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Our Specialized Services | Eagle Brain Auto",
  description: "Expert ECU programming, module cloning, and car harness restoration in Accra.",
};

export const viewport: Viewport = {
  themeColor: "#0F0C1E",
  width: "device-width",
  initialScale: 1,
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}