'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NumberResult from '@/components/NumberResult';
import AdModal from '@/components/AdModal';
import { generateAINumbers } from '@/lib/api';
import { shouldShowAd, setFirstClick, setAdViewed } from '@/lib/adTracker';

export default function DeepLearningClient() {
  const [result, setResult] = useState<{ numbers: number[]; method: string; confidence: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);

  const handleGenerate = async () => {
    if (shouldShowAd()) {
      setShowAdModal(true);
      return;
    }
    await generateNumbers();
  };

  const generateNumbers = async () => {
    setIsLoading(true);
    setFirstClick('deep');
    try {
      const response = await generateAINumbers();
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

  return (
    <>
      <Header />

      <main className="main-container min-h-screen">
        <section className="py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-dark text-center mb-4">
            AI 딥러닝 로또 분석
          </h1>
          <p className="text-lg text-muted text-center max-w-2xl mx-auto mb-8">
            XGBoost 기반 인공지능이 과거 당첨 데이터를 학습하여 번호를 예측합니다.
          </p>

          <div className="text-center mb-12">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="btn-primary text-xl px-12 py-4 disabled:opacity-50"
            >
              {isLoading ? 'AI 분석 중...' : 'AI 번호 생성하기'}
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

        {/* SEO 콘텐츠 */}
        <article className="card mb-12">
          <h2 className="section-title">딥러닝 로또 분석이란?</h2>
          <div className="prose max-w-none text-secondary space-y-4">
            <p>
              딥러닝 로또 분석은 인공지능 기술 중 하나인 머신러닝을 활용하여
              과거 로또 당첨 번호의 패턴을 학습하고, 이를 바탕으로 다음 회차에
              출현 가능성이 높은 번호를 예측하는 방식입니다.
            </p>
            <h3 className="text-lg font-bold text-primary-dark mt-6">XGBoost 알고리즘</h3>
            <p>
              AI 로또곳간은 XGBoost(Extreme Gradient Boosting) 알고리즘을 사용합니다.
              XGBoost는 앙상블 학습 방법 중 하나로, 여러 개의 약한 학습기를 결합하여
              강력한 예측 모델을 만드는 기술입니다. 캐글(Kaggle) 등 데이터 과학 대회에서
              우수한 성능을 보여 널리 사용되고 있습니다.
            </p>
            <h3 className="text-lg font-bold text-primary-dark mt-6">학습 데이터</h3>
            <p>
              모델은 역대 로또 당첨 번호 데이터를 학습합니다. 각 번호의 출현 빈도,
              연속 출현 여부, 구간별 분포 등 다양한 특성을 추출하여 분석에 활용합니다.
              주기적으로 최신 데이터를 반영하여 모델을 업데이트합니다.
            </p>
            <h3 className="text-lg font-bold text-primary-dark mt-6">신뢰도 점수</h3>
            <p>
              생성된 번호와 함께 신뢰도 점수가 표시됩니다. 이는 모델이 해당 번호 조합에
              대해 갖는 확신의 정도를 나타냅니다. 다만, 로또는 본질적으로 랜덤 추첨이므로
              신뢰도가 높다고 해서 당첨을 보장하지는 않습니다.
            </p>
          </div>
        </article>

        <section className="card mb-12">
          <h2 className="section-title">AI 분석의 장점</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="bg-secondary rounded-lg p-4">
              <h3 className="font-bold text-primary-dark mb-2">객관적 분석</h3>
              <p className="text-sm text-muted">
                인간의 주관적 판단 없이 데이터에 기반한 객관적인 분석을 제공합니다.
              </p>
            </li>
            <li className="bg-secondary rounded-lg p-4">
              <h3 className="font-bold text-primary-dark mb-2">대량 데이터 처리</h3>
              <p className="text-sm text-muted">
                수천 회차의 데이터를 빠르게 분석하여 패턴을 찾아냅니다.
              </p>
            </li>
            <li className="bg-secondary rounded-lg p-4">
              <h3 className="font-bold text-primary-dark mb-2">복잡한 패턴 인식</h3>
              <p className="text-sm text-muted">
                사람이 발견하기 어려운 복잡한 패턴도 인식할 수 있습니다.
              </p>
            </li>
            <li className="bg-secondary rounded-lg p-4">
              <h3 className="font-bold text-primary-dark mb-2">지속적 학습</h3>
              <p className="text-sm text-muted">
                새로운 데이터가 추가될 때마다 모델이 업데이트됩니다.
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
            headline: 'AI 딥러닝 로또 분석',
            description: 'XGBoost 기반 딥러닝으로 로또 번호를 분석하고 예측합니다.',
            author: { '@type': 'Organization', name: 'AI 로또곳간' },
            publisher: { '@type': 'Organization', name: 'AI 로또곳간' },
          }),
        }}
      />
    </>
  );
}
