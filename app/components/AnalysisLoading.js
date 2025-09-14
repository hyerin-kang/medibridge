"use client";

import { Loader } from "lucide-react";
import { useState, useEffect } from "react";

const AnalysisLoading = ({ onFinish, fileUrl }) => {
  const [showDownload, setShowDownload] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDownload(true);
      if (onFinish) onFinish();
    }, 3000); // 3초 후 다운로드 버튼 표시

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex flex-col items-center justify-center">
      <button
        className="absolute top-4 right-4 text-white text-xl font-bold"
        onClick={() => setVisible(false)}
      >
        ✕
      </button>
      {!showDownload && (
        <>
          {" "}
          <Loader />
          <div className="text-white text-xl font-semibold mb-4 text-center">
            분석 중입니다... 잠시만 기다려주세요.
          </div>
        </>
      )}

      {showDownload && fileUrl && (
        <a
          href={fileUrl}
          download
          className="px-6 py-3 bg-green-600 text-white rounded-xl shadow"
        >
          엑셀 다운로드
        </a>
      )}
    </div>
  );
};

export default AnalysisLoading;
