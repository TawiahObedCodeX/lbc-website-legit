import { Suspense } from "react";
import DonatePageClient from "@/components/DonatePageClient";

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#06040d]" />}>
      <DonatePageClient />
    </Suspense>
  );
}