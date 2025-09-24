"use client";
import { Loader2, FileDown } from "lucide-react";
import { useState, useEffect } from "react";

const AnalysisLoading = ({ onFinish, fileUrl }) => {
  const messages = [
    "질병관리청 지역건강통계 데이터를 분석중입니다...",
    "주변 지역 상권 및 경쟁의원을 분석중입니다...",
  ];

  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (step < messages.length) {
      const timer = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 3000); // 각 메시지 3초씩 보여줌
      return () => clearTimeout(timer);
    } else {
      // 모든 메시지 끝나면 다운로드 상태로 전환
      const finishTimer = setTimeout(() => {
        setFinished(true);
        if (onFinish) onFinish();
      }, 1000);
      return () => clearTimeout(finishTimer);
    }
  }, [step, onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex flex-col items-center justify-center p-6">
      {!finished ? (
        <div className="flex flex-col items-center gap-4 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl">
          <Loader2 className="animate-spin text-blue-600 w-12 h-12" />
          <p className="text-gray-800 text-lg font-semibold text-center">
            {messages[Math.min(step, messages.length - 1)]}
          </p>
        </div>
      ) : (
        fileUrl && (
          <a
            href={fileUrl}
            download
            className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold text-lg shadow-lg transition"
          >
            <FileDown className="w-6 h-6" />
            PDF 다운로드
          </a>
        )
      )}
    </div>
  );
};

export default AnalysisLoading;
