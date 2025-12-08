'use client';

import { useEffect, useState } from 'react';
import LottoBall from './LottoBall';
import { getMeta, MetaResponse } from '@/lib/api';
import { FiClock, FiDatabase, FiRefreshCw } from 'react-icons/fi';
import { GiTrophy } from 'react-icons/gi';

export default function LatestRound() {
  const [meta, setMeta] = useState<MetaResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeta();
  }, []);

  const loadMeta = async () => {
    try {
      const data = await getMeta();
      setMeta(data);
    } catch (error) {
      console.error('메타 정보 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  if (loading) {
    return (
      <div className="card mb-8">
        <div className="flex items-center justify-center py-4">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (!meta) {
    return null;
  }

  return (
    <section className="card mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-secondary text-primary-dark px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <GiTrophy />
              최신 당첨번호
            </span>
            <span className="text-2xl font-bold text-primary-dark">
              {meta.latestRound}회
            </span>
          </div>
          <p className="text-sm text-muted flex items-center gap-1">
            <FiClock className="text-xs" />
            마지막 업데이트: {formatDate(meta.lastUpdate)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {meta.latestNumbers.map((num, idx) => (
            <LottoBall key={idx} number={num} />
          ))}
          <span className="mx-1 text-muted">+</span>
          <LottoBall number={meta.latestBonus} isBonus />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-accent/30 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-muted flex items-center gap-1">
          <FiDatabase className="text-xs" />
          총 {meta.totalRounds.toLocaleString()}회 분석 데이터 반영
        </span>
        <span className="bg-green-500/80 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
          <FiRefreshCw className="text-xs" />
          자동 업데이트
        </span>
      </div>
    </section>
  );
}
