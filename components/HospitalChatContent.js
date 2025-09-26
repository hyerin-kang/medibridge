// app/hospitalChat/page.js

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import icoKakao from "@/public/ico-kakao.png";
import Image from "next/image";

export default function HospitalChatContent() {
  const searchParams = useSearchParams();
  const [hospitalId, setHospitalId] = useState(null);
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalType, setHospitalType] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [showReservationButton, setShowReservationButton] = useState(false);
  const [showKakaoButton, setShowKakaoButton] = useState(false);

  // searchParams를 state에 세팅
  useEffect(() => {
    setHospitalId(searchParams.get("hospitalId"));
    setHospitalName(searchParams.get("hospitalName") || "");
    setHospitalType(searchParams.get("hospitalType") || "");
    setSymptoms(searchParams.get("symptoms") || "");
  }, [searchParams]);

  // 병원 정보
  const hospitalInfo = {
    1: {
      name: "아늑한의원",
      doctor: "차정훈 원장",
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

  // FAQ 응답
  const faqResponses = {
    약침: `안녕하세요 ${currentHospital.name} 입니다. 문의주신 약침은 아늑한의원에서 3000회 이상 시술된 안전한 시술로 발목 주위 염증을 빠르게 잡아주는데 아주 효과적인 시술입니다. 시술 가격은 회당 15,000원이며 10회 패키지 결제시 10만원에 치료 가능합니다. 지금 예약 도와드릴까요?`,
  };

  // 초기 메시지
  useEffect(() => {
    if (!hospitalId) return;
    const welcomeMessage = {
      type: "hospital",
      content: `안녕하세요! ${
        currentHospital.name
      }입니다.\n\n저희는 ${currentHospital.specialties.join(
        ", "
      )} 분야를 전문으로 하고 있으며, ${
        currentHospital.doctor
      }이 진료를 담당하고 있습니다。\n\n진료시간: ${
        currentHospital.workingHours
      }\n\n${
        symptoms
          ? `AI 상담을 통해 "${symptoms}" 증상으로 방문해주시는군요.`
          : ""
      }\n\n궁금한 점이 있으시면 언제든 문의해주세요!`,
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

  if (!hospitalId) return <div className="p-5">Loading hospital info...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 font-sans h-full flex flex-col">
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

      <div className="flex-1 bg-gray-50 p-5 border border-gray-200 overflow-y-auto">
        {messages.map((message, idx) => (
          <div
            key={idx}
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
                <div className="w-2 h-2 bg-blue-500 rounded-full delay-200 animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full delay-400 animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        {/* 예약버튼 */}
        {messages.length > 0 &&
          messages[messages.length - 1].type === "hospital" &&
          messages[messages.length - 1].content.includes("예약 도와드릴까요") &&
          !showReservationButton && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => {
                  setShowReservationButton(true); // "예" 버튼 클릭 후 카톡 버튼 활성화
                  setShowKakaoButton(true);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600"
              >
                네, 예약할게요
              </button>
            </div>
          )}

        {/* 예 버튼 클릭 후 카톡 알림 버튼 */}
        {showKakaoButton && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => alert("카톡 알림이 설정되었습니다!")}
              className="bg-[#fee500] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#FFD700] flex flex-wrap gap-4 items-center"
            >
              <Image src={icoKakao} width={20} height={10} alt="ico-kakao" />
              <span>카카오톡으로 다음 방문일을 챙겨드릴까요?</span>
            </button>
          </div>
        )}
      </div>

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
