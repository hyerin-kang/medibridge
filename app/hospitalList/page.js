// app/hospitalList/page.js
"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import HospitalListContent from "@/components/HospitalListContent";

export default function HospitalListPage() {
  return (
    <Suspense fallback={<div>Loading hospitals...</div>}>
      <HospitalListContent />
    </Suspense>
  );
}
