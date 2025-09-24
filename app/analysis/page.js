"use client";
import { useState } from "react";
import AnalysisLoading from "../../components/AnalysisLoading";

const AnalysisPage = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [readyToDownload, setReadyToDownload] = useState(false);

  const handleAnalyze = () => {
    if (!address.trim()) return alert("주소를 입력해주세요!");
    setLoading(true);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto font-sans h-[calc(100vh-170px)]">
      <h2 className="text-2xl font-bold mb-6 text-gray-600">
        📍 입지 분석을 하고 싶은 주소를 입력해 주세요
      </h2>

      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="예: 부산시 사하구 ..."
        className="w-full p-4 border-2 border-gray-200 rounded-xl mb-6 focus:outline-none focus:border-blue-500"
      />

      <button
        onClick={handleAnalyze}
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition"
      >
        분석하기
      </button>

      {loading && (
        <AnalysisLoading
          fileUrl="/sample_analysis.pdf"
          onFinish={() => {
            setLoading(false);
            setReadyToDownload(true);
          }}
        />
      )}

      {readyToDownload && (
        <a
          href="/sample_analysis.pdf"
          download
          className="mt-6 inline-block w-full text-center py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition"
        >
          PDF 다운로드
        </a>
      )}
    </main>
  );
};

export default AnalysisPage;
