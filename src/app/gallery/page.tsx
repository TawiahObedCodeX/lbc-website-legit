import { Metadata, Viewport } from "next";
import GalleryUI from "./GalleryUI";

// This is the ONLY place viewport settings should exist
export const viewport: Viewport = {
  themeColor: "#0F0C1E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Our Family | Lakeside Baptist Church Gallery",
  description: "Witness the vibrant life and community of Lakeside Community Baptist Church.",
};

export default function GalleryPage() {
  return <GalleryUI />;
}