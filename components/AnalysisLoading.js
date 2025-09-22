"use client";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const AnalysisLoading = ({ onFinish, fileUrl }) => {
  const [showDownload, setShowDownload] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDownload(true);
      if (onFinish) onFinish();
    }, 3000); // 3초 후 다운로드 버튼 표시

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex flex-col items-center justify-center p-6">
      {!showDownload && (
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-white w-12 h-12 mb-4" />
          <p className="text-white text-lg font-semibold text-center">
            분석 중입니다... 잠시만 기다려주세요.
          </p>
        </div>
      )}

      {showDownload && fileUrl && (
        <a
          href={fileUrl}
          download
          className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-lg transition"
        >
          PDF 다운로드
        </a>
      )}
    </div>
  );
};

export default AnalysisLoading;
