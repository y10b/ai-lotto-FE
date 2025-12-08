'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NumberResult from '@/components/NumberResult';
import AdModal from '@/components/AdModal';
import { generatePatternNumbers, getPatternAnalysis } from '@/lib/api';
import { shouldShowAd, setFirstClick, setAdViewed } from '@/lib/adTracker';

interface PatternData {
  rangeDistribution: Record<string, number>;
  endingDistribution: Record<string, number>;
  averageAC: number;
  sumAnalysis: {
    average: number;
    min: number;
    max: number;
  };
  totalRounds: number;
}

export default function PatternClient() {
  const [result, setResult] = useState<{ numbers: number[]; method: string; confidence: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [patternData, setPatternData] = useState<PatternData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    loadPatternData();
  }, []);

  const loadPatternData = async () => {
    try {
      const data = await getPatternAnalysis();
      setPatternData(data);
    } catch (error) {
      console.error('패턴 데이터 로드 실패:', error);
    } finally {
      setDataLoading(false);
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
    setFirstClick('pattern');
    try {
      const response = await generatePatternNumbers();
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

  const getRangeMax = () => {
    if (!patternData) return 1;
    return Math.max(...Object.values(patternData.rangeDistribution));
  };

  const getEndingMax = () => {
    if (!patternData) return 1;
    return Math.max(...Object.values(patternData.endingDistribution));
  };

  return (
    <>
      <Header />

      <main className="main-container min-h-screen">
        <section className="py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-dark text-center mb-4">
            로또 패턴 분석
          </h1>
          <p className="text-lg text-muted text-center max-w-2xl mx-auto mb-8">
            홀짝, 고저, 연속번호 등 다양한 패턴을 분석하여 번호를 생성합니다.
          </p>

          <div className="text-center mb-12">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="btn-primary text-xl px-12 py-4 disabled:opacity-50"
            >
              {isLoading ? '분석 중...' : '패턴 기반 번호 생성'}
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

        {/* 패턴 데이터 표시 */}
        {dataLoading ? (
          <div className="flex justify-center py-12">
            <div className="spinner" />
          </div>
        ) : patternData && (
          <>
            {/* 구간별 분포 */}
            <section className="card mb-8">
              <h2 className="section-title">구간별 분포</h2>
              <div className="space-y-4">
                {Object.entries(patternData.rangeDistribution).map(([range, count]) => (
                  <div key={range} className="flex items-center gap-4">
                    <span className="w-16 text-sm font-medium text-primary-dark">{range}</span>
                    <div className="flex-1">
                      <div className="stat-bar h-6">
                        <div
                          className="stat-bar-fill h-full flex items-center justify-end pr-2"
                          style={{ width: `${(count / getRangeMax()) * 100}%` }}
                        >
                          <span className="text-xs text-white font-medium">{count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 끝자리 분포 */}
            <section className="card mb-8">
              <h2 className="section-title">끝자리 분포</h2>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-4">
                {Object.entries(patternData.endingDistribution).map(([ending, count]) => (
                  <div key={ending} className="text-center">
                    <div className="w-12 h-12 mx-auto bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      {ending}
                    </div>
                    <div className="mt-2">
                      <div className="stat-bar">
                        <div
                          className="stat-bar-fill"
                          style={{ width: `${(count / getEndingMax()) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted">{count}회</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AC값 및 합계 분석 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="card">
                <h2 className="section-title">평균 AC값</h2>
                <p className="text-4xl font-bold text-primary text-center">
                  {patternData.averageAC}
                </p>
                <p className="text-sm text-muted text-center mt-2">
                  AC값이 높을수록 번호가 고르게 분포
                </p>
              </div>
              <div className="card">
                <h2 className="section-title">당첨번호 합계</h2>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    평균: {patternData.sumAnalysis.average}
                  </p>
                  <p className="text-sm text-muted mt-2">
                    범위: {patternData.sumAnalysis.min} ~ {patternData.sumAnalysis.max}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* SEO 콘텐츠 */}
        <article className="card mb-12">
          <h2 className="section-title">로또 패턴 분석이란?</h2>
          <div className="prose max-w-none text-secondary space-y-4">
            <p>
              로또 패턴 분석은 당첨 번호에서 나타나는 다양한 규칙성과 특성을 분석하는 방법입니다.
              단순한 빈도 분석을 넘어서, 번호 간의 관계와 분포 패턴을 심층적으로 살펴봅니다.
            </p>

            <h3 className="text-lg font-bold text-primary-dark mt-6">구간별 분포</h3>
            <p>
              1~45의 번호를 5개 구간(1-10, 11-20, 21-30, 31-40, 41-45)으로 나누어
              각 구간에서 얼마나 많은 번호가 당첨되었는지 분석합니다.
              균형 잡힌 구간 분포가 당첨 확률에 유리한 것으로 알려져 있습니다.
            </p>

            <h3 className="text-lg font-bold text-primary-dark mt-6">끝자리 분포</h3>
            <p>
              당첨 번호의 끝자리(0~9)가 어떻게 분포하는지 분석합니다.
              특정 끝자리에 편중되지 않고 다양한 끝자리가 포함된 조합이
              통계적으로 더 자주 당첨됩니다.
            </p>

            <h3 className="text-lg font-bold text-primary-dark mt-6">AC값 (Arithmetic Complexity)</h3>
            <p>
              AC값은 6개 번호 간의 차이값 개수에서 5를 뺀 값입니다.
              AC값이 높을수록 번호가 고르게 분포되어 있음을 의미합니다.
              역대 당첨 번호의 AC값은 대부분 7~10 사이에 분포합니다.
            </p>

            <h3 className="text-lg font-bold text-primary-dark mt-6">합계 분석</h3>
            <p>
              6개 당첨 번호의 합계를 분석합니다.
              통계적으로 합계가 100~170 사이인 조합이 가장 많이 당첨됩니다.
              극단적으로 낮거나 높은 합계는 드물게 나타납니다.
            </p>
          </div>
        </article>

        {/* 패턴 분석 활용 팁 */}
        <section className="card mb-12">
          <h2 className="section-title">패턴 분석 활용 팁</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="bg-secondary rounded-lg p-4">
              <h3 className="font-bold text-primary-dark mb-2">구간 균형</h3>
              <p className="text-sm text-muted">
                5개 구간에서 골고루 번호를 선택하면 당첨 확률이 높아집니다.
              </p>
            </li>
            <li className="bg-secondary rounded-lg p-4">
              <h3 className="font-bold text-primary-dark mb-2">끝자리 다양성</h3>
              <p className="text-sm text-muted">
                같은 끝자리가 3개 이상 포함된 조합은 피하는 것이 좋습니다.
              </p>
            </li>
            <li className="bg-secondary rounded-lg p-4">
              <h3 className="font-bold text-primary-dark mb-2">적정 AC값</h3>
              <p className="text-sm text-muted">
                AC값이 7~10 사이인 조합을 선택하는 것이 유리합니다.
              </p>
            </li>
            <li className="bg-secondary rounded-lg p-4">
              <h3 className="font-bold text-primary-dark mb-2">합계 범위</h3>
              <p className="text-sm text-muted">
                6개 번호의 합계가 100~170 사이가 되도록 조합합니다.
              </p>
            </li>
          </ul>
        </section>
      </main>

      <Footer />

      {showAdModal && <AdModal onClose={handleAdModalClose} />}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: '로또 패턴 분석',
            description: '홀짝, 고저, 연속번호 등 다양한 패턴을 분석하여 로또 번호를 추천합니다.',
            author: { '@type': 'Organization', name: 'AI 로또곳간' },
          }),
        }}
      />
    </>
  );
}
