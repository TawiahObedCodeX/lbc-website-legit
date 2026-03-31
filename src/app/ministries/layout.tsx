import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Ministries | Lakeside Baptist Church",
  description: "Discover our specialized ministries designed to impact every generation.",
};

export const viewport: Viewport = {
  themeColor: "#0F0C1E",
  width: "device-width",
  initialScale: 1,
};

export default function MinistriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}