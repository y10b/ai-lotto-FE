'use client';

import { GiYinYang } from 'react-icons/gi';
import { FiExternalLink, FiX } from 'react-icons/fi';

interface SajuGotganModalProps {
  onClose: () => void;
  sajuInfo?: string;
}

export default function SajuGotganModal({ onClose, sajuInfo }: SajuGotganModalProps) {
  const handleVisit = () => {
    window.open('https://www.sajugotgan.com', '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="saju-modal-title">
      <div className="modal-content max-w-md relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="닫기"
        >
          <FiX className="text-xl" />
        </button>

        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <GiYinYang className="text-white text-4xl" />
          </div>

          <h2 id="saju-modal-title" className="text-2xl font-bold text-primary-dark mb-3">
            나의 사주, 더 깊이 알아볼까요?
          </h2>

          {sajuInfo && (
            <p className="text-primary font-medium mb-2">
              {sajuInfo}
            </p>
          )}

          <p className="text-muted">
            방금 분석한 사주를 바탕으로<br />
            더 자세한 운세를 확인해 보세요!
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 mb-6">
          <h3 className="font-bold text-purple-800 mb-3">사주곳간에서 제공하는 서비스</h3>
          <ul className="text-sm text-purple-700 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
              AI 기반 정밀 사주팔자 분석
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
              연애운, 재물운, 직업운 상세 해석
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
              궁합 분석 및 토정비결
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
              오늘의 운세 및 월별 운세
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleVisit}
            className="w-full py-4 px-6 rounded-xl text-lg font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <FiExternalLink />
            사주곳간에서 자세히 보기
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            다음에 볼게요
          </button>
        </div>
      </div>
    </div>
  );
}
