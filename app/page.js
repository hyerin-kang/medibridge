"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-12 gap-8">
      {/* 상단 타이틀 */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center">
        개원 입지 분석 및 <span className="text-blue-500">ALL-IN-ONE</span> 병원
        마케팅
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 text-center">
        AI 기반 병원 마케팅 솔루션,{" "}
        <span className="font-semibold text-green-500">메디브릿지</span>
      </p>

      {/* CTA 버튼 */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link
          href="/analysis"
          className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-lg font-semibold transition"
        >
          입지 분석하기
        </Link>
        <Link
          href="/chat"
          className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl text-lg font-semibold transition"
        >
          환자 상담 체험
        </Link>
      </div>

      {/* 이미지/서비스 섹션 */}
      <div className="mt-12 w-full max-w-4xl flex justify-center">
        <img
          src="/service_sample.png" // 실제 서비스 사진 경로
          alt="메디브릿지 서비스"
          className="w-full rounded-xl shadow-lg border border-gray-200"
        />
      </div>
    </main>
  );
}
