'use client';

import { GiYinYang } from 'react-icons/gi';
import { FiExternalLink } from 'react-icons/fi';

export default function SajuGotganBanner() {
  return (
    <a
      href="https://www.sajugotgan.com"
      target="_blank"
      rel="noopener noreferrer"
      className="block card overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 transition-all duration-300 group"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <GiYinYang className="text-3xl text-white" />
          </div>
          <div>
            <p className="text-sm text-white/80 mb-1">이런 사이트는 어때요?</p>
            <h3 className="text-xl md:text-2xl font-bold">
              사주곳간 - AI 사주 분석
            </h3>
            <p className="text-sm text-white/80 mt-1">
              AI가 분석하는 정확한 사주팔자, 운세, 궁합 서비스
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-full group-hover:bg-white/30 transition-colors shrink-0">
          <span className="font-medium">방문하기</span>
          <FiExternalLink className="text-lg group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
    </a>
  );
}
