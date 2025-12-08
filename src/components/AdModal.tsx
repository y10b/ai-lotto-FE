'use client';

import { useEffect, useState } from 'react';
import { GiCrystalBall } from 'react-icons/gi';
import { FiExternalLink, FiX } from 'react-icons/fi';

interface AdModalProps {
  onClose: () => void;
}

export default function AdModal({ onClose }: AdModalProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVisit = () => {
    window.open('https://www.sajugotgan.com', '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="ad-title">
      <div className="modal-content">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-full flex items-center justify-center mb-4">
            <GiCrystalBall className="text-white text-4xl" />
          </div>
          <h2 id="ad-title" className="text-2xl font-bold text-primary-dark mb-2">
            AI가 분석하는 나의 운명
          </h2>
          <p className="text-muted">
            사주곳간에서 AI 사주 분석을 무료로 체험해보세요!
          </p>
        </div>

        <div className="bg-secondary rounded-lg p-4 mb-6">
          <p className="text-sm text-primary-dark">
            사주팔자, 궁합, 토정비결 등<br />
            다양한 운세 서비스를 AI가 분석해 드립니다.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleVisit}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <FiExternalLink />
            사주곳간 방문하기
          </button>
          <button
            onClick={onClose}
            disabled={countdown > 0}
            className={`w-full py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
              countdown > 0
                ? 'bg-secondary text-muted cursor-not-allowed'
                : 'bg-secondary text-primary-dark hover:opacity-80'
            }`}
          >
            <FiX />
            {countdown > 0 ? `${countdown}초 후 닫기` : '닫기'}
          </button>
        </div>
      </div>
    </div>
  );
}
