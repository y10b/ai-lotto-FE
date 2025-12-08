'use client';

import LottoBall from './LottoBall';
import { BsRobot, BsBarChartLine, BsGrid3X3Gap } from 'react-icons/bs';
import { FiInfo } from 'react-icons/fi';
import { IconType } from 'react-icons';

interface NumberResultProps {
  numbers: number[];
  method: string;
  confidence?: number;
  isLoading?: boolean;
}

export default function NumberResult({ numbers, method, confidence, isLoading }: NumberResultProps) {
  const getMethodInfo = (m: string): { name: string; icon: IconType } => {
    switch (m) {
      case 'deep_learning':
        return { name: 'AI 딥러닝 분석', icon: BsRobot };
      case 'statistics':
        return { name: '통계 기반 분석', icon: BsBarChartLine };
      case 'pattern':
        return { name: '패턴 분석', icon: BsGrid3X3Gap };
      default:
        return { name: '분석', icon: BsRobot };
    }
  };

  if (isLoading) {
    return (
      <div className="result-box flex flex-col items-center gap-4">
        <div className="spinner" />
        <p className="text-primary-dark font-medium">AI가 번호를 분석하고 있습니다...</p>
      </div>
    );
  }

  if (!numbers || numbers.length === 0) {
    return null;
  }

  const methodInfo = getMethodInfo(method);
  const Icon = methodInfo.icon;

  return (
    <article className="result-box slide-up">
      <div className="mb-4">
        <span className="inline-flex items-center gap-2 bg-primary text-white text-sm px-3 py-1 rounded-full mb-2">
          <Icon />
          {methodInfo.name}
        </span>
        {confidence && (
          <p className="text-sm text-muted">
            분석 신뢰도: {Math.round(confidence * 100)}%
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {numbers.map((num, idx) => (
          <LottoBall key={idx} number={num} size="lg" />
        ))}
      </div>

      <p className="text-xs text-muted mt-4 flex items-center justify-center gap-1">
        <FiInfo />
        본 번호는 참고용이며 당첨을 보장하지 않습니다.
      </p>
    </article>
  );
}
