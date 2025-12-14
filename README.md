# Fin-Sight (핀사이트)

스마트한 예적금/대출 이자 계산기 웹 애플리케이션입니다. React와 Tailwind CSS로 제작되었으며, Firebase Hosting을 통해 배포됩니다.

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드 및 배포
Firebase Hosting에 배포하려면 다음 명령어를 실행하세요. (사전에 `firebase login`이 필요할 수 있습니다.)

```bash
npm run deploy
```
위 명령어는 자동으로 프로젝트를 빌드(`npm run build`)하고, Firebase에 배포(`firebase deploy`)합니다.

## ✨ 주요 기능
- **예적금 계산기**: 단리/복리, 과세/비과세, 월 적립/예치금 방식 지원
- **대출 계산기**: 원리금균등, 원금균등, 만기일시 상환 지원 (거치 기간 포함)
- **시각화**: Recharts를 활용한 실시간 자산 추이 및 상환 스케줄 차트
- **리포트 저장**: 계산 결과를 이미지로 다운로드
- **반응형 디자인**: PC 및 모바일 최적화

## 🛠 기술 스택
- React, Vite
- Tailwind CSS via PostCSS
- Recharts (Chart)
- Firebase (Hosting, Analytics)
- html2canvas (Export Image)
