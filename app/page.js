"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import mainImg from "@/public/service_sample.png";

import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-12 gap-8">
        {/* 상단 타이틀 */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center"
        >
          개원 입지 분석 및 <span className="text-blue-500">ALL-IN-ONE</span>{" "}
          병원 마케팅
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
          className="mt-12 w-full max-w-4xl flex flex-col justify-center"
        >
          <Image src={mainImg} alt="메디브릿지 서비스" className="w-full" />
        </motion.div>
      </div>
      <div className="w-full bg-blue-400">
        <div className="container m-auto flex flex-col items-center text-center p-10 gap-5">
          <p className="text-white text-2xl font-bold">
            남들보다 앞서나가는 병원만들기,
            <br />
            5분 상담을 통해 지금 바로 시작해보세요!
          </p>
          <Link
            href="https://naver.me/G8hId90X"
            target="_blank"
            alt="신청 폼 바로가기"
            className="px-8 py-3 bg-white hover:bg-blue-600 transition hover:text-white text-blue-500 rounded-xl text-lg font-semibold transition"
          >
            상담 신청 하기 &#8640;
          </Link>
        </div>
      </div>
    </main>
  );
}
