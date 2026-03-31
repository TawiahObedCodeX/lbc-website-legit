"use client";

import dynamic from "next/dynamic";

const ContactUI = dynamic(() => import("./ContactUI"), { 
  ssr: false, 
  loading: () => <div className="min-h-screen bg-[#0F0C1E]" /> 
});

export default function ContactPage() {
  return <ContactUI />;
}