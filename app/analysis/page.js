"use client";
import { useState } from "react";
import AnalysisLoading from "../components/AnalysisLoading";

const AnalysisPage = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [readyToDownload, setReadyToDownload] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
  };
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        입지 분석을 하고싶은 주소를 입력해 주세요
      </h2>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="예: 부산시 사하구 ..."
        className="w-full p-3 border rounded-xl mb-4"
      />
      <button
        onClick={handleAnalyze}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow"
      >
        분석하기
      </button>

      {loading && (
        <AnalysisLoading
          fileUrl="/sample_analysis.pdf"
          onFinish={() => alert("분석 완료!")}
        />
      )}

      {readyToDownload && (
        <a
          href="/sample_analysis.pdf"
          download
          className="mt-4 inline-block px-6 py-3 bg-green-600 text-white rounded-xl shadow"
        >
          PDF 다운로드
        </a>
      )}
    </main>
  );
};

export default AnalysisPage;
