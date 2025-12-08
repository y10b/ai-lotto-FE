import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI 로또곳간 | 딥러닝 로또 번호 예측",
  description: "딥러닝, 통계, 패턴 분석으로 로또 번호를 AI가 자동 추천합니다. XGBoost 기반 인공지능이 분석한 로또 번호를 확인하세요.",
  keywords: "로또, 로또 번호 추천, AI 로또, 딥러닝 로또, 로또 예측, 로또 분석, 로또 통계",
  authors: [{ name: "AI 로또곳간" }],
  openGraph: {
    title: "AI 로또곳간 | 딥러닝 로또 번호 예측",
    description: "AI가 분석한 로또 번호 추천 서비스",
    url: "https://ailottogotgan.com",
    siteName: "AI 로또곳간",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      "naver-site-verification": ["네이버인증코드"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" style={{ colorScheme: 'light' }}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#8B5A2B" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
