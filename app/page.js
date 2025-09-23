"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-12 gap-8">
      {/* 상단 타이틀 */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center"
      >
        개원 입지 분석 및 <span className="text-blue-500">ALL-IN-ONE</span> 병원
        마케팅
      </motion.h1>

      {/* 설명 텍스트 */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-lg sm:text-xl text-gray-600 text-center"
      >
        AI 기반 병원 마케팅 솔루션,{" "}
        <span className="font-semibold text-green-500">메디브릿지</span>
      </motion.p>

      {/* CTA 버튼 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 mt-6"
      >
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
      </motion.div>

      {/* 이미지/서비스 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-12 w-full max-w-4xl flex justify-center"
      >
        {/* <img
          src="/service_sample.png"
          alt="메디브릿지 서비스"
          className="w-full rounded-xl shadow-lg border border-gray-200 aa"
        /> */}
        <div className="w-full h-[500px] bg-gray-600 rounded-md"></div>
      </motion.div>
    </main>
  );
}
