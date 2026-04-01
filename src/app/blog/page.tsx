import { Metadata, Viewport } from "next";
import BlogUI from "./BlogUI";

export const viewport: Viewport = {
  themeColor: "#0F0C1E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "The Pulse | Lakeside Baptist Church Blog",
  description: "Stories of grace, theological insights, and community updates.",
};

export default function BlogPage() {
  return <BlogUI />;
}