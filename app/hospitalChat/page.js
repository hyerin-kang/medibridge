"use client";
export const dynamic = "force-dynamic";

import HospitalChatContent from "@/components/HospitalChatContent";
import { Suspense } from "react";

export default function HospitalChatPage() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <HospitalChatContent />
    </Suspense>
  );
}
