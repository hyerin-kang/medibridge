// app/hospitalList/page.js
"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function HospitalListContent() {
  const searchParams = useSearchParams();
  const [symptoms, setSymptoms] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  const mockHospitals = [
    {
      id: 1,
      name: "아늑한의원",
      type: "한의원",
      distance: "300m",
      specialties: ["약침", "침치료", "추나"],
      rating: 4.8,
      reviews: 124,
      phone: "042-123-4567",
      address: "대전시 중구 은행동 123-45",
    },
    {
      id: 2,
      name: "튼튼정형외과",
      type: "정형외과",
      distance: "520m",
      specialties: ["도수치료", "물리치료", "관절염"],
      rating: 4.6,
      reviews: 89,
      phone: "042-234-5678",
      address: "대전시 중구 대흥동 234-56",
    },
    {
      id: 3,
      name: "충남대학교병원",
      type: "종합병원",
      distance: "700m",
      specialties: ["MRI 검사", "CT 촬영", "전문의 진료"],
      rating: 4.5,
      reviews: 256,
      phone: "042-280-7000",
      address: "대전시 중구 문화로 282",
    },
  ];

  useEffect(() => {
    setSymptoms(searchParams.get("symptoms") || "");
    setAiResponse(searchParams.get("aiResponse") || "");
  }, [searchParams]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setTimeout(() => {
            setHospitals(mockHospitals);
            setLoading(false);
          }, 2000);
        },
        () => {
          setTimeout(() => {
            setHospitals(mockHospitals);
            setLoading(false);
          }, 2000);
        }
      );
    } else {
      setTimeout(() => {
        setHospitals(mockHospitals);
        setLoading(false);
      }, 2000);
    }
  }, []);

  const handleHospitalClick = (hospital) => {
    const queryParams = new URLSearchParams({
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      hospitalType: hospital.type,
      symptoms: symptoms || "",
      aiResponse: aiResponse || "",
    });
    window.location.href = `/hospitalChat?${queryParams}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <div>
          <h2 className="text-lg font-semibold mb-4">
            🔍 주변 병원을 찾는 중...
          </h2>
          <div className="mx-auto w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-5 font-sans">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          🏥 주변 병원 찾기
        </h1>
        <p className="text-gray-500 text-base">
          반경 1km 내 추천 병원 목록입니다
        </p>

        {symptoms && (
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h4 className="text-gray-700 font-semibold mb-2">상담받은 증상:</h4>
            <p className="text-sm text-gray-500">{symptoms}</p>
          </div>
        )}
      </header>

      <div className="mb-5">
        <p className="text-green-600 font-bold">
          📍 {hospitals.length}개의 병원을 찾았습니다
        </p>
      </div>

      {hospitals.map((hospital, index) => (
        <div
          key={hospital.id}
          onClick={() => handleHospitalClick(hospital)}
          className={`relative bg-white border-2 rounded-xl p-5 mb-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 ${
            index === 0
              ? "border-blue-300  hover:border-blue-500"
              : "border-gray-200 hover:border-blue-500"
          }`}
        >
          {/* 추천 뱃지 */}
          {index === 0 && (
            <span className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg shadow-md">
              추천!
            </span>
          )}

          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {index + 1}. {hospital.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="bg-blue-300 text-white text-xs px-2 py-0.5 rounded-full">
                  {hospital.type}
                </span>
                <span className="text-red-500 font-bold">
                  📍 {hospital.distance}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-yellow-500 mb-1">⭐ {hospital.rating}</div>
              <div className="text-gray-400 text-xs">
                ({hospital.reviews}개 리뷰)
              </div>
            </div>
          </div>

          <div className="mb-3">
            <h4 className="text-sm text-gray-700 font-semibold mb-2">
              추천 치료:
            </h4>
            <div className="flex flex-wrap gap-2">
              {hospital.specialties.map((specialty, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <div>📞 {hospital.phone}</div>
            <div className="mt-1">📍 {hospital.address}</div>
          </div>

          <div className="mt-3 p-2 bg-green-100 rounded text-xs text-green-600 text-center">
            💬 클릭하시면 해당 병원과의 상담 및 예약으로 넘어갑니다
          </div>
        </div>
      ))}

      <div className="text-center mt-8 p-5 bg-yellow-100 rounded-lg border border-yellow-200">
        <h4 className="text-yellow-800 font-bold mb-2">⚠️ 안내사항</h4>
        <ul className="list-disc list-inside text-left text-yellow-800 text-sm">
          <li>병원 정보는 실시간으로 변경될 수 있습니다.</li>
          <li>진료 시간 및 예약 가능 여부를 미리 확인하세요.</li>
          <li>응급상황 시에는 119에 신고하세요.</li>
        </ul>
      </div>

      <div className="text-center mt-5">
        <button
          onClick={() => (window.location.href = "/chat")}
          className="px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
        >
          ← 증상 상담으로 돌아가기
        </button>
      </div>
    </div>
  );
}
