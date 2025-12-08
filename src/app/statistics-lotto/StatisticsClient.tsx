'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NumberResult from '@/components/NumberResult';
import LottoBall from '@/components/LottoBall';
import AdModal from '@/components/AdModal';
import { generateStatisticsNumbers, getStatistics } from '@/lib/api';
import { shouldShowAd, setFirstClick, setAdViewed } from '@/lib/adTracker';

interface Statistics {
  mostFrequent: number[];
  leastFrequent: number[];
  recentNumbers: { round: number; numbers: number[]; bonus: number }[];
  oddEvenRatio: string;
  lowHighRatio: string;
  frequency: Record<string, number>;
  totalRounds: number;
}

export default function StatisticsClient() {
  const [result, setResult] = useState<{ numbers: number[]; method: string; confidence: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const data = await getStatistics();
      setStatistics(data);
    } catch (error) {
      console.error('통계 로드 실패:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (shouldShowAd()) {
      setShowAdModal(true);
      return;
    }
    await generateNumbers();
  };

  const generateNumbers = async () => {
    setIsLoading(true);
    setFirstClick('statistics');
    try {
      const response = await generateStatisticsNumbers();
      setResult(response);
    } catch (error) {
      console.error('번호 생성 오류:', error);
      alert('번호 생성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdModalClose = () => {
    setShowAdModal(false);
    setAdViewed();
    generateNumbers();
  };

  const getMaxFrequency = () => {
    if (!statistics) return 1;
    return Math.max(...Object.values(statistics.frequency));
  };

  return (
    <>
      <Header />

      <main className="main-container min-h-screen">
        <section className="py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-dark text-center mb-4">
            로또 통계 분석
          </h1>
          <p className="text-lg text-muted text-center max-w-2xl mx-auto mb-8">
            역대 당첨 번호 빈도수와 확률을 분석하여 번호를 추천합니다.
          </p>

          <div className="text-center mb-12">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="btn-primary text-xl px-12 py-4 disabled:opacity-50"
            >
              {isLoading ? '분석 중...' : '통계 기반 번호 생성'}
            </button>
          </div>

          {(isLoading || result) && (
            <div className="mb-12">
              <NumberResult
                numbers={result?.numbers || []}
                method={result?.method || ''}
                confidence={result?.confidence}
                isLoading={isLoading}
              />
            </div>
          )}
        </section>

        {/* 통계 데이터 표시 */}
        {statsLoading ? (
          <div className="flex justify-center py-12">
            <div className="spinner" />
          </div>
        ) : statistics && (
          <>
            {/* 가장 많이 나온 번호 */}
            <section className="card mb-8">
              <h2 className="section-title">가장 많이 나온 번호 TOP 10</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {statistics.mostFrequent.map((num, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <LottoBall number={num} />
                    <span className="text-xs text-muted mt-1">
                      {statistics.frequency[String(num)]}회
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 가장 적게 나온 번호 */}
            <section className="card mb-8">
              <h2 className="section-title">가장 적게 나온 번호 TOP 10</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {statistics.leastFrequent.map((num, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <LottoBall number={num} />
                    <span className="text-xs text-muted mt-1">
                      {statistics.frequency[String(num)]}회
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 홀짝/고저 비율 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="card">
                <h2 className="section-title">홀짝 비율</h2>
                <p className="text-2xl font-bold text-primary text-center">
                  {statistics.oddEvenRatio}
                </p>
                <p className="text-sm text-muted text-center mt-2">
                  (홀수 : 짝수)
                </p>
              </div>
              <div className="card">
                <h2 className="section-title">고저 비율</h2>
                <p className="text-2xl font-bold text-primary text-center">
                  {statistics.lowHighRatio}
                </p>
                <p className="text-sm text-muted text-center mt-2">
                  (1~22 : 23~45)
                </p>
              </div>
            </section>

            {/* 번호별 출현 빈도 차트 */}
            <section className="card mb-8">
              <h2 className="section-title">번호별 출현 빈도</h2>
              <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
                {Array.from({ length: 45 }, (_, i) => i + 1).map((num) => (
                  <div key={num} className="text-center">
                    <LottoBall number={num} size="sm" />
                    <div className="mt-1">
                      <div className="stat-bar">
                        <div
                          className="stat-bar-fill"
                          style={{
                            width: `${(statistics.frequency[String(num)] / getMaxFrequency()) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted">
                        {statistics.frequency[String(num)]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 최근 당첨 번호 */}
            <section className="card mb-8">
              <h2 className="section-title">최근 10회차 당첨 번호</h2>
              <div className="space-y-4">
                {statistics.recentNumbers.slice().reverse().map((item) => (
                  <div
                    key={item.round}
                    className="flex flex-wrap items-center gap-4 p-4 bg-secondary rounded-lg"
                  >
                    <span className="font-bold text-primary-dark w-20">
                      {item.round}회
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.numbers.map((num, idx) => (
                        <LottoBall key={idx} number={num} size="sm" />
                      ))}
                      <span className="mx-1 text-muted">+</span>
                      <LottoBall number={item.bonus} size="sm" isBonus />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* SEO 콘텐츠 */}
        <article className="card mb-12">
          <h2 className="section-title">로또 통계 분석이란?</h2>
          <div className="prose max-w-none text-secondary space-y-4">
            <p>
              로또 통계 분석은 역대 당첨 번호 데이터를 수집하여 각 번호의 출현 빈도,
              홀짝 비율, 고저 비율 등 다양한 통계적 특성을 분석하는 방법입니다.
              이를 통해 확률적으로 유리한 번호 조합을 찾아 추천합니다.
            </p>
            <h3 className="text-lg font-bold text-primary-dark mt-6">출현 빈도 분석</h3>
            <p>
              각 번호(1~45)가 역대 추첨에서 몇 번 당첨되었는지 분석합니다.
              자주 나온 번호는 '핫 넘버', 적게 나온 번호는 '콜드 넘버'라고 부릅니다.
              어떤 전략을 선택할지는 개인의 판단에 달려 있습니다.
            </p>
            <h3 className="text-lg font-bold text-primary-dark mt-6">홀짝 비율</h3>
            <p>
              당첨 번호 6개 중 홀수와 짝수의 비율을 분석합니다.
              통계적으로 3:3 비율이 가장 많이 나타나며, 극단적인 6:0이나 0:6은
              드물게 발생합니다.
            </p>
            <h3 className="text-lg font-bold text-primary-dark mt-6">고저 비율</h3>
            <p>
              1~22를 저번호, 23~45를 고번호로 구분하여 비율을 분석합니다.
              균형 잡힌 비율의 번호 조합이 통계적으로 더 자주 당첨됩니다.
            </p>
          </div>
        </article>
      </main>

      <Footer />

      {showAdModal && <AdModal onClose={handleAdModalClose} />}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: '로또 통계 분석',
            description: '역대 로또 당첨 번호 통계를 분석하여 번호를 추천합니다.',
            author: { '@type': 'Organization', name: 'AI 로또곳간' },
          }),
        }}
      />
    </>
  );
}
