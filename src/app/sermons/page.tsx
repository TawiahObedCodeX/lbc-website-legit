import { Metadata, Viewport } from "next";
import SermonsUI from "./SermonsUI";

export const viewport: Viewport = {
  themeColor: "#0F0C1E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Watch & Listen | Lakeside Sermons",
  description: "Deep dive into the Word. Stream our latest sermon series, powerful messages, and life-changing teachings.",
};

export default function SermonsPage() {
  return <SermonsUI />;
}