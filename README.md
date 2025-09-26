yarn dev

# MediBridge

의료 상담 및 분석 서비스를 제공하는 Next.js 기반 웹 애플리케이션입니다. 환자와 의료진, 병원 간의 원활한 소통과 데이터 기반 분석을 지원합니다.

---

## 🩺 주요 기능

- 실시간 의료 챗봇 상담 (일반/병원별)
- 병원 리스트 및 정보 제공
- PDF 의료 문서 분석 및 리포트 생성
- 대화 기록 관리(확장 가능)

---

## 📁 프로젝트 폴더 구조

```
app/
	analysis/           # 분석 결과 페이지 (PDF 분석 등)
	api/                # Next.js API 라우트 (의료 상담, 분석 등)
		medical-consultation/  # 의료 상담 관련 API
	chat/               # 일반 챗봇 상담 페이지
	hospitalChat/       # 병원별 챗봇 상담 페이지
	hospitalList/       # 병원 리스트 페이지
	layout.js           # 전체 레이아웃
	page.js             # 메인 페이지
components/
	AnalysisLoading.js      # 분석 중 로딩 UI
	HospitalChatContent.js  # 병원 챗봇 UI
	HospitalListContent.js  # 병원 리스트 UI
public/
	...이미지 및 정적 파일
```

---

## 🚀 설치 및 실행 방법

1. 패키지 설치

   ```bash
   npm install
   ```

2. 개발 서버 실행

   ```bash
   npm run dev
   ```

   브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

3. 빌드 및 배포
   ```bash
   npm run build
   npm start
   ```

---

## 🖥️ 주요 페이지 및 라우트

- `/` : 메인 페이지 (서비스 소개)
- `/chat` : 일반 의료 챗봇 상담
- `/hospitalList` : 병원 리스트 확인
- `/hospitalChat` : 병원별 챗봇 상담
- `/analysis` : PDF 등 의료 문서 분석 결과

---

## ⚙️ 환경 변수 예시

`.env.local` 파일에 아래와 같이 환경 변수를 설정할 수 있습니다.

```
# 예시
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

---

## 🛠️ 기술 스택

- Next.js
- React
- Tailwind CSS (필요시)
- ESLint/Prettier

---

## 🤝 기여 방법

1. 이 저장소를 fork 합니다.
2. 새로운 브랜치 생성 (`feature/이름`)
3. 변경 사항 커밋
4. Pull Request 생성

---

## 📄 라이선스

MIT
