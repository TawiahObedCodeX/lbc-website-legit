import { Metadata, Viewport } from "next";
import AboutUI from "./AboutUI";

export const viewport: Viewport = {
  themeColor: "#0F0C1E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "The Legacy | Lakeside Baptist Church",
  description: "Experience the history and mission of Lakeside through a new lens.",
};

export default function AboutPage() {
  return <AboutUI />;
}