'use client';

import Link from 'next/link';
import { GiClover, GiYinYang } from 'react-icons/gi';
import { BsRobot, BsBarChartLine, BsGrid3X3Gap } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="footer mt-20 text-white">
      <div className="main-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GiClover className="text-2xl" />
              <h2 className="text-lg font-bold">AI 로또곳간</h2>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              딥러닝과 통계 분석을 활용한 로또 번호 추천 서비스입니다.
              XGBoost 기반 인공지능이 과거 당첨 데이터를 분석하여
              번호를 추천해 드립니다.
            </p>
          </div>

          <nav aria-label="서비스 메뉴">
            <h3 className="text-lg font-bold mb-4">서비스</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/deep-learning-lotto" className="flex items-center gap-2 text-yellow-300 hover:text-yellow-100 transition">
                  <BsRobot />
                  AI 딥러닝 분석
                </Link>
              </li>
              <li>
                <Link href="/statistics-lotto" className="flex items-center gap-2 text-yellow-300 hover:text-yellow-100 transition">
                  <BsBarChartLine />
                  통계 기반 분석
                </Link>
              </li>
              <li>
                <Link href="/pattern-lotto" className="flex items-center gap-2 text-yellow-300 hover:text-yellow-100 transition">
                  <BsGrid3X3Gap />
                  패턴 분석
                </Link>
              </li>
              <li>
                <Link href="/saju-lotto" className="flex items-center gap-2 text-yellow-300 hover:text-yellow-100 transition">
                  <GiYinYang />
                  사주 기반 분석
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-lg font-bold mb-4">관련 서비스</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.sajugotgan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-yellow-300 hover:text-yellow-100 transition"
                >
                  <FiExternalLink />
                  사주곳간 - AI 사주 분석
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-current opacity-20 mt-8" />
        <div className="pt-8 text-center text-sm opacity-60">
          <p>© 2025 AI 로또곳간. All rights reserved.</p>
          <p className="mt-2">
            본 서비스는 참고용이며, 당첨을 보장하지 않습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
