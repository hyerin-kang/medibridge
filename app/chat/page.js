"use client";

import { useState } from "react";

export default function MedicalConsultation() {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");

  // 언어 감지 함수
  const detectLanguage = (text) => {
    const koreanRegex = /[가-힣]/;
    const chineseRegex = /[一-龯]/;
    const japaneseRegex = /[ぁ-んァ-ヶ]/; // 일본어 정규식 수정
    const arabicRegex = /[ء-ي]/;
    const russianRegex = /[а-я]/i;

    if (koreanRegex.test(text)) return "Korean";
    if (chineseRegex.test(text)) return "Chinese";
    if (japaneseRegex.test(text)) return "Japanese";
    if (arabicRegex.test(text)) return "Arabic";
    if (russianRegex.test(text)) return "Russian";
    return "English";
  };

  // 언어별 UI 텍스트
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
        testBtn: "🔧 API 테스트",
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
        testBtn: "🔧 API Test",
      },
      Chinese: {
        title: "🏥 AI医疗咨询",
        subtitle: "输入您的症状，AI将协助进行咨询。",
        disclaimer: "⚠️ 为了准确诊断，您必须寻求医疗专业人员的直接诊疗。",
        label: "请详细描述您的症状：",
        placeholder: "例如：从昨天开始头痛发烧，咳嗽也很严重...",
        submitBtn: "🤖 获取AI咨询",
        loadingBtn: "咨询中...",
        clearBtn: "清除",
        errorTitle: "❌ 错误",
        resultTitle: "💬 AI咨询结果",
        warningTitle: "⚠️ 重要通知",
        warningItems: [
          "此咨询仅供参考，不能替代医学诊断。",
          "如果您有严重症状或怀疑是紧急情况，请立即拨打急救电话。",
          "为了准确诊断和治疗，您必须寻求医疗专业人员的直接诊疗。",
        ],
        emptyError: "请输入您的症状。",
        testBtn: "🔧 API测试",
      },
      Japanese: {
        title: "🏥 AI医療相談",
        subtitle: "症状を入力すると、AIが相談をサポートします。",
        disclaimer:
          "⚠️ 正確な診断のためには、必ず医療専門家の診察を受けてください。",
        label: "症状を詳しく説明してください：",
        placeholder: "例：昨日から頭痛と発熱があり、咳もひどいです...",
        submitBtn: "🤖 AI相談を受ける",
        loadingBtn: "相談中...",
        clearBtn: "クリア",
        errorTitle: "❌ エラー",
        resultTitle: "💬 AI相談結果",
        warningTitle: "⚠️ 重要なお知らせ",
        warningItems: [
          "この相談は参考用であり、医学的診断に代わるものではありません。",
          "重篤な症状や緊急事態が疑われる場合は、すぐに救急サービスに連絡してください。",
          "正確な診断と治療のためには、必ず医療専門家の診察を受けてください。",
        ],
        emptyError: "症状を入力してください。",
        testBtn: "🔧 APIテスト",
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

    try {
      console.log("API 요청 시작...");
      console.log("감지된 언어:", currentLang);

      const res = await fetch("/api/medical-consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms,
          language: currentLang,
        }),
      });

      console.log("응답 상태:", res.status);

      if (res.status === 404) {
        const text = await res.text();
        console.error("404 에러 상세:", text);
        throw new Error(
          "API 라우트를 찾을 수 없습니다. app/api/medical-consultation/route.js 파일이 존재하는지 확인해주세요."
        );
      }

      if (!res.ok) {
        const errorText = await res.text();
        console.error("에러 응답:", errorText);

        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || "Server error occurred.");
        } catch (jsonError) {
          throw new Error(
            `Server error (${res.status}): ${errorText.substring(0, 100)}...`
          );
        }
      }

      const data = await res.json();
      setResponse(data.response);

      if (data.isTestResponse) {
        console.log("🧪 테스트 모드로 실행됨");
      }
    } catch (error) {
      console.error("요청 에러:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setSymptoms("");
    setResponse("");
    setError("");
    setDetectedLanguage("");
  };

  // API 테스트 함수
  const testAPI = async () => {
    try {
      const testRes = await fetch("/api/medical-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms: "API Test / API 테스트",
          language: "Korean",
        }),
      });
      console.log("API 테스트 결과:", testRes.status);
      const testData = await testRes.json();
      console.log("API 테스트 데이터:", testData);
      alert("API 테스트 완료! 콘솔을 확인하세요.");
    } catch (err) {
      console.error("API 테스트 실패:", err);
      alert("API 테스트 실패: " + err.message);
    }
  };

  // 현재 언어에 맞는 UI 텍스트 가져오기
  const currentUILang =
    detectedLanguage || (symptoms ? detectLanguage(symptoms) : "Korean");
  const uiText = getUIText(currentUILang);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1
          style={{ color: "#2c3e50", marginBottom: "10px", fontSize: "2.2rem" }}
        >
          {uiText.title}
        </h1>
        <p style={{ color: "#7f8c8d", fontSize: "16px", marginBottom: "5px" }}>
          {uiText.subtitle}
        </p>
        <p style={{ color: "#e74c3c", fontSize: "14px", fontWeight: "bold" }}>
          {uiText.disclaimer}
        </p>

        {/* 감지된 언어 표시 */}
        {detectedLanguage && (
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#3498db",
              color: "white",
              padding: "4px 12px",
              borderRadius: "15px",
              fontSize: "12px",
              marginTop: "10px",
            }}
          >
            🌍 Detected: {detectedLanguage}
          </div>
        )}

        {/* 디버깅용 버튼 */}
        <div style={{ marginTop: "15px" }}>
          <button
            onClick={testAPI}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f39c12",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "13px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {uiText.testBtn}
          </button>

          <button
            onClick={() => {
              console.log("Current symptoms:", symptoms);
              console.log("Detected language:", detectLanguage(symptoms));
              console.log("Response:", response);
            }}
            style={{
              padding: "8px 16px",
              backgroundColor: "#9b59b6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            🔍 디버그 정보
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="symptoms"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#34495e",
            }}
          >
            {uiText.label}
          </label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder={uiText.placeholder}
            style={{
              width: "100%",
              minHeight: "140px",
              padding: "16px",
              border: "2px solid #e1e8ed",
              borderRadius: "10px",
              fontSize: "16px",
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
              lineHeight: "1.5",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3498db")}
            onBlur={(e) => (e.target.style.borderColor = "#e1e8ed")}
          />
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "14px 28px",
              backgroundColor: loading ? "#95a5a6" : "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              flex: 1,
              minWidth: "180px",
              transition: "background-color 0.2s ease",
            }}
          >
            {loading ? uiText.loadingBtn : uiText.submitBtn}
          </button>

          <button
            type="button"
            onClick={clearForm}
            style={{
              padding: "14px 24px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              minWidth: "100px",
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
          >
            {uiText.clearBtn}
          </button>
        </div>
      </form>

      {error && (
        <div
          style={{
            padding: "18px",
            backgroundColor: "#fee",
            borderLeft: "5px solid #e74c3c",
            borderRadius: "6px",
            marginBottom: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h4 style={{ margin: "0 0 8px", color: "#e74c3c", fontSize: "16px" }}>
            {uiText.errorTitle}
          </h4>
          <p
            style={{
              margin: 0,
              color: "#c0392b",
              fontSize: "14px",
              lineHeight: "1.4",
            }}
          >
            {error}
          </p>
        </div>
      )}

      {response && (
        <div
          style={{
            padding: "24px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #e1e8ed",
            borderRadius: "12px",
            marginBottom: "20px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              margin: "0 0 18px",
              color: "#2c3e50",
              fontSize: "18px",
              borderBottom: "2px solid #3498db",
              paddingBottom: "8px",
            }}
          >
            {uiText.resultTitle}
          </h3>
          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.7",
              color: "#34495e",
              fontSize: "15px",
            }}
          >
            {response}
          </div>
        </div>
      )}

      {response && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "10px",
            marginTop: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <h4
            style={{
              margin: "0 0 12px",
              color: "#856404",
              fontSize: "16px",
            }}
          >
            {uiText.warningTitle}
          </h4>
          <ul style={{ margin: 0, paddingLeft: "20px", color: "#856404" }}>
            {uiText.warningItems.map((item, index) => (
              <li
                key={index}
                style={{ marginBottom: "6px", lineHeight: "1.4" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <footer
        style={{
          textAlign: "center",
          marginTop: "50px",
          paddingTop: "25px",
          borderTop: "1px solid #e1e8ed",
        }}
      >
        <p style={{ color: "#7f8c8d", fontSize: "13px", margin: 0 }}>
          © MEDIBRIDGE
        </p>
        <p style={{ color: "#bdc3c7", fontSize: "11px", marginTop: "5px" }}>
          🌍 Multi-language support: Korean, English, Chinese, Japanese, and
          more
        </p>
      </footer>
    </div>
  );
}
