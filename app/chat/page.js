"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ChatPage() {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");

  function filterResponse(response) {
    return response.replaceAll("**", "");
  }

  const detectLanguage = (text) => {
    const koreanRegex = /[가-힣]/;
    const chineseRegex = /[一-龯]/;
    const japaneseRegex = /[ぁ-んァ-ン]/;
    const arabicRegex = /[ء-ي]/;
    const russianRegex = /[а-я]/i;

    if (koreanRegex.test(text)) return "Korean";
    if (chineseRegex.test(text)) return "Chinese";
    if (japaneseRegex.test(text)) return "Japanese";
    if (arabicRegex.test(text)) return "Arabic";
    if (russianRegex.test(text)) return "Russian";
    return "English";
  };

  const getUIText = (lang) => {
    const texts = {
      Korean: {
        title: "🏥 AI 의료 상담",
        subtitle: "증상을 입력하시면 AI가 상담을 도와드립니다.",
        disclaimer:
          "⚠️ 정확한 진단을 위해서는 반드시 의료진의 진료를 받으시기 바랍니다.",
        label: "증상을 자세히 설명해주세요:",
        placeholder: "예: 어제부터 머리가 아프고 열이 나며, 기침도 심해요...",
        submitBtn: "🤖 AI 상담 받기",
        loadingBtn: "상담 중...",
        clearBtn: "초기화",
        errorTitle: "❌ 오류",
        resultTitle: "💬 AI 상담 결과",
        warningTitle: "⚠️ 중요한 안내",
        warningItems: [
          "이 상담은 참고용이며 의학적 진단을 대체할 수 없습니다.",
          "심각한 증상이거나 응급상황이 의심되면 즉시 119에 신고하거나 응급실을 방문하세요.",
          "정확한 진단과 치료를 위해 반드시 의료진의 진료를 받으시기 바랍니다.",
        ],
        emptyError: "증상을 입력해주세요.",
        HospitalText: "당신의 주변의 병원을 추천해드릴까요?",
        HospitalLink: "네! 추천해주세요",
        sourceTitle: "📚 참고 자료",
      },
      English: {
        title: "🏥 AI Medical Consultation",
        subtitle: "Enter your symptoms and AI will help with consultation.",
        disclaimer:
          "⚠️ For accurate diagnosis, you must seek direct medical care from healthcare professionals.",
        label: "Please describe your symptoms in detail:",
        placeholder:
          "e.g., I have been experiencing headaches and fever since yesterday, and severe coughing...",
        submitBtn: "🤖 Get AI Consultation",
        loadingBtn: "Consulting...",
        clearBtn: "Clear",
        errorTitle: "❌ Error",
        resultTitle: "💬 AI Consultation Result",
        warningTitle: "⚠️ Important Notice",
        warningItems: [
          "This consultation is for reference only and cannot replace medical diagnosis.",
          "If you have serious symptoms or suspect an emergency, call emergency services immediately.",
          "For accurate diagnosis and treatment, you must seek direct medical care from healthcare professionals.",
        ],
        emptyError: "Please enter your symptoms.",
        HospitalText: "Would you like me to recommend hospitals near you?",
        HospitalLink: "Yes, please recommend.",
        sourceTitle: "📚 References",
      },
    };

    return texts[lang] || texts.English;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentLang = detectLanguage(symptoms);
    setDetectedLanguage(currentLang);
    const uiText = getUIText(currentLang);

    if (!symptoms.trim()) {
      setError(uiText.emptyError);
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");
    setSources([]);

    try {
      const res = await fetch("/api/medical-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, language: currentLang }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setResponse(filterResponse(data.response));
      setSources(data.sources || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setSymptoms("");
    setResponse("");
    setError("");
    setDetectedLanguage("");
    setSources([]);
  };

  const currentUILang =
    detectedLanguage || (symptoms ? detectLanguage(symptoms) : "Korean");
  const uiText = getUIText(currentUILang);

  return (
    <div className="max-w-[800px] mx-auto p-5 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-[2.2rem] text-[#2c3e50] mb-2 font-bold">
          {uiText.title}
        </h1>
        <p className="text-[#7f8c8d] text-base mb-1">{uiText.subtitle}</p>
        <p className="text-[#e74c3c] text-sm font-bold">{uiText.disclaimer}</p>

        {detectedLanguage && (
          <div className="inline-block bg-[#3498db] text-white px-3 py-1 rounded-full text-xs mt-3">
            🌍 Detected: {detectedLanguage}
          </div>
        )}
      </header>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="block mb-2 font-bold text-[#34495e]"
          >
            {uiText.label}
          </label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder={uiText.placeholder}
            className="w-full min-h-[140px] p-4 border-2 border-[#e1e8ed] rounded-lg text-base leading-relaxed resize-y focus:border-[#3498db] outline-none transition"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-bold text-white transition flex-1 min-w-[180px] ${
              loading
                ? "bg-[#95a5a6] cursor-not-allowed"
                : "bg-[#3498db] hover:bg-[#2980b9]"
            }`}
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            {loading ? uiText.loadingBtn : uiText.submitBtn}
          </button>

          <button
            type="button"
            onClick={clearForm}
            className="px-6 py-3 bg-[#e74c3c] hover:bg-[#c0392b] text-white rounded-lg font-bold transition min-w-[100px]"
          >
            {uiText.clearBtn}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-[#fee] border-l-4 border-[#e74c3c] rounded-md mb-6 shadow">
          <h4 className="text-[#e74c3c] font-semibold mb-1 text-base">
            {uiText.errorTitle}
          </h4>
          <p className="text-[#c0392b] text-sm">{error}</p>
        </div>
      )}

      {response && (
        <div className="p-6 bg-[#f8f9fa] border border-[#e1e8ed] rounded-xl shadow mb-6">
          <h3 className="text-lg font-bold text-[#2c3e50] border-b-2 border-[#3498db] pb-2 mb-4">
            {uiText.resultTitle}
          </h3>
          <p className="whitespace-pre-wrap text-[#34495e] leading-relaxed text-sm mb-4">
            {response}
          </p>

          {sources.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                {uiText.sourceTitle}
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-blue-600 text-sm">
                {sources.map((src, i) => (
                  <li key={i}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {src.title || src.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-2">
              {uiText.HospitalText}
            </h4>
            <Link
              href="/hospitalList"
              className="inline-block px-4 py-2 rounded-lg bg-blue-400 text-white text-sm font-medium shadow hover:bg-blue-500 transition"
            >
              {uiText.HospitalLink}
            </Link>
          </div>
        </div>
      )}

      {response && (
        <div className="p-5 bg-[#fff3cd] border border-[#ffeaa7] rounded-lg shadow">
          <h4 className="text-[#856404] font-semibold mb-2 text-base">
            {uiText.warningTitle}
          </h4>
          <ul className="list-disc pl-5 text-[#856404] space-y-1 text-sm">
            {uiText.warningItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
