"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold">MEDIBRIDGE</h1>
      <p className="text-gray-600">AI기반 로컬 병원 컨설팅 서비스</p>
      <div className="flex gap-4">
        <Link
          href="/analysis"
          className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow"
        >
          입지 분석하기
        </Link>
        <Link
          href="/chat"
          className="px-6 py-3 bg-green-500 text-white rounded-xl shadow"
        >
          환자 상담 체험
        </Link>
      </div>
    </main>
  );
}
