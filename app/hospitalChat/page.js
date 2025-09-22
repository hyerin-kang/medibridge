"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function HospitalChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const hospitalId = searchParams.get("hospitalId");
  const hospitalName = searchParams.get("hospitalName");
  const hospitalType = searchParams.get("hospitalType");
  const symptoms = searchParams.get("symptoms");

  // 병원별 정보 데이터
  const hospitalInfo = {
    1: {
      name: "아늑한의원",
      doctor: "김한의 원장",
      specialties: ["약침", "침치료", "추나"],
      workingHours: "월-금 09:00-18:00, 토 09:00-13:00",
    },
    2: {
      name: "튼튼정형외과",
      doctor: "박정형 원장",
      specialties: ["도수치료", "물리치료", "관절염"],
      workingHours: "월-금 08:30-17:30, 토 08:30-12:30",
    },
    3: {
      name: "충남대학교병원",
      doctor: "종합진료팀",
      specialties: ["MRI 검사", "CT 촬영", "전문의 진료"],
      workingHours: "24시간 응급실 운영",
    },
  };

  const currentHospital = hospitalInfo[hospitalId] || hospitalInfo[1];

  // 정해진 질문-답변
  const faqResponses = {
    약침: `안녕하세요 ${currentHospital.name}. 문의주신 약침은 아늑한의원에서 3000회 이상 시술된 안전한 시술로 발목 주위 염증을 빠르게 잡아주는데 아주 효과적인 시술입니다. 시술 가격은 회당 15,000원이며 10회 패키지 결제시 10만원에 치료 가능합니다. 지금 예약 도와드릴까요?`,
  };

  // 초기 환영 메시지
  useEffect(() => {
    const welcomeMessage = {
      type: "hospital",
      content: `안녕하세요! ${currentHospital.name}입니다. 

저희는 ${currentHospital.specialties.join(", ")} 분야를 전문으로 하고 있으며,
${currentHospital.doctor}이 진료를 담당하고 있습니다.

진료시간: ${currentHospital.workingHours}

${symptoms ? `AI 상담을 통해 "${symptoms}" 증상으로 방문해주시는군요.` : ""}

궁금한 점이 있으시면 언제든 문의해주세요!`,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [hospitalId, symptoms]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    setTimeout(() => {
      const hospitalMessage = {
        type: "hospital",
        content:
          faqResponses[inputMessage] ||
          "죄송합니다. 해당 질문에 대한 답변은 준비되어 있지 않습니다.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, hospitalMessage]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 font-sans h-full flex flex-col">
      {/* 헤더 */}
      <header className="bg-blue-500 text-white p-5 rounded-t-xl">
        <h1 className="text-xl font-bold mb-1">
          💬 {currentHospital.name} 상담
        </h1>
        <p className="text-sm opacity-90">
          {currentHospital.doctor} | {hospitalType}
        </p>
        <div className="text-xs opacity-80 mt-1">
          전문분야: {currentHospital.specialties.join(" · ")}
        </div>
      </header>

      {/* 채팅 영역 */}
      <div className="flex-1 bg-gray-50 p-5 border border-gray-200 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg whitespace-pre-wrap text-sm ${
                message.type === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
              }`}
            >
              {message.content}
              <div className="text-[10px] mt-2 opacity-70 text-right">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-400"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="bg-white border border-gray-200 p-4 rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="궁금한 점을 입력해주세요..."
            className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !inputMessage.trim()}
            className={`px-4 py-2 rounded-lg text-sm font-bold text-white ${
              loading || !inputMessage.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "..." : "전송"}
          </button>
        </div>
      </div>
    </div>
  );
}
