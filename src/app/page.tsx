'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdModal from '@/components/AdModal';
import NumberResult from '@/components/NumberResult';
import LatestRound from '@/components/LatestRound';
import { generateAINumbers, generateStatisticsNumbers, generatePatternNumbers } from '@/lib/api';
import { shouldShowAd, setFirstClick, setAdViewed } from '@/lib/adTracker';
import { BsRobot, BsBarChartLine, BsGrid3X3Gap } from 'react-icons/bs';
import { GiYinYang } from 'react-icons/gi';
import { FiMousePointer, FiZap, FiCheckCircle } from 'react-icons/fi';
import { IconType } from 'react-icons';

export default function Home() {
  const [showAdModal, setShowAdModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [result, setResult] = useState<{ numbers: number[]; method: string; confidence: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingMethod, setPendingMethod] = useState<string | null>(null);

  const handleGenerateClick = async (method: string) => {
    if (shouldShowAd()) {
      setPendingMethod(method);
      setShowAdModal(true);
      return;
    }

    await generateNumbers(method);
  };

  const generateNumbers = async (method: string) => {
    setIsLoading(true);
    setSelectedMethod(method);
    setFirstClick(method);

    try {
      let response;
      switch (method) {
        case 'deep':
          response = await generateAINumbers();
          break;
        case 'statistics':
          response = await generateStatisticsNumbers();
          break;
        case 'pattern':
          response = await generatePatternNumbers();
          break;
        default:
          throw new Error('알 수 없는 방법');
      }
      setResult(response);
    } catch (error) {
      console.error('번호 생성 오류:', error);
      alert('번호 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdModalClose = () => {
    setShowAdModal(false);
    setAdViewed();
    if (pendingMethod) {
      generateNumbers(pendingMethod);
      setPendingMethod(null);
    }
  };

  const services: { id: string; title: string; description: string; icon: IconType; link: string; hasForm?: boolean }[] = [
    {
      id: 'deep',
      title: 'AI 딥러닝 분석',
      description: 'XGBoost 기반 인공지능이 과거 당첨 패턴을 학습하여 번호를 예측합니다.',
      icon: BsRobot,
      link: '/deep-learning-lotto',
    },
    {
      id: 'statistics',
      title: '통계 기반 분석',
      description: '역대 당첨 번호 빈도수와 확률을 분석하여 번호를 추천합니다.',
      icon: BsBarChartLine,
      link: '/statistics-lotto',
    },
    {
      id: 'pattern',
      title: '패턴 분석',
      description: '홀짝, 고저, 연속번호 등 다양한 패턴을 분석하여 번호를 생성합니다.',
      icon: BsGrid3X3Gap,
      link: '/pattern-lotto',
    },
    {
      id: 'saju',
      title: '사주 분석',
      description: '생년월일 기반 사주팔자 오행 분석으로 행운의 번호를 추천합니다.',
      icon: GiYinYang,
      link: '/saju-lotto',
      hasForm: true,
    },
  ];

  const steps: { icon: IconType; title: string; description: string }[] = [
    {
      icon: FiMousePointer,
      title: '분석 방법 선택',
      description: 'AI 딥러닝, 통계, 패턴 중 원하는 분석 방법을 선택합니다.',
    },
    {
      icon: FiZap,
      title: '번호 생성',
      description: '버튼을 클릭하면 AI가 분석한 6개의 번호가 생성됩니다.',
    },
    {
      icon: FiCheckCircle,
      title: '번호 활용',
      description: '생성된 번호를 참고하여 로또를 구매하시면 됩니다.',
    },
  ];

  return (
    <>
      <Header />

      <main className="main-container min-h-screen">
        {/* 히어로 섹션 */}
        <section className="text-center py-12 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-dark mb-4">
            AI 로또곳간
          </h1>
          <p className="text-lg md:text-xl text-muted mb-8 max-w-2xl mx-auto">
            딥러닝과 통계 분석을 활용한 로또 번호 추천 서비스입니다.
            AI가 과거 당첨 데이터를 분석하여 번호를 추천해 드립니다.
          </p>
        </section>

        {/* 최신 회차 표시 */}
        <LatestRound />

        {/* 서비스 카드 섹션 */}
        <section aria-labelledby="services-title" className="mb-12">
          <h2 id="services-title" className="section-title justify-center">
            분석 방법 선택
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.id} className="card text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    service.id === 'saju'
                      ? 'bg-gradient-to-br from-purple-100 to-indigo-100'
                      : 'bg-secondary'
                  }`}>
                    <Icon className={`text-3xl ${
                      service.id === 'saju' ? 'text-purple-600' : 'text-primary'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm mb-6">
                    {service.description}
                  </p>
                  {service.hasForm ? (
                    <Link
                      href={service.link}
                      className="block w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all"
                    >
                      생년월일 입력하기
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleGenerateClick(service.id)}
                        disabled={isLoading}
                        className="btn-primary w-full disabled:opacity-50"
                      >
                        {isLoading && selectedMethod === service.id ? '분석 중...' : '번호 생성'}
                      </button>
                      <Link
                        href={service.link}
                        className="inline-block mt-3 text-sm text-primary hover:underline"
                      >
                        자세히 보기 →
                      </Link>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* 결과 표시 */}
        {(isLoading || result) && (
          <section aria-labelledby="result-title" className="mb-12">
            <h2 id="result-title" className="section-title justify-center">
              추천 번호
            </h2>
            <NumberResult
              numbers={result?.numbers || []}
              method={result?.method || ''}
              confidence={result?.confidence}
              isLoading={isLoading}
            />
          </section>
        )}

        {/* SEO용 콘텐츠 섹션 */}
        <section aria-labelledby="about-title" className="card mb-12">
          <h2 id="about-title" className="section-title">
            AI 로또곳간 소개
          </h2>
          <div className="prose max-w-none text-secondary">
            <p className="mb-4">
              AI 로또곳간은 인공지능 기술을 활용하여 로또 번호를 분석하고 추천하는 서비스입니다.
              XGBoost 기반의 딥러닝 모델이 역대 당첨 번호 데이터를 학습하여
              다음 회차에 출현 가능성이 높은 번호를 예측합니다.
            </p>
            <p className="mb-4">
              통계 분석 기능은 각 번호의 출현 빈도, 홀짝 비율, 고저 비율 등을 분석하여
              확률적으로 유리한 번호 조합을 제안합니다.
              패턴 분석은 연속번호, 구간별 분포, 끝자리 분포 등 다양한 패턴을 고려합니다.
            </p>
            <p>
              본 서비스는 과학적인 분석을 기반으로 하지만, 로또는 본질적으로 랜덤 추첨이므로
              당첨을 보장하지 않습니다. 참고용으로만 활용해 주시기 바랍니다.
            </p>
          </div>
        </section>

        {/* 이용 방법 */}
        <section aria-labelledby="howto-title" className="mb-12">
          <h2 id="howto-title" className="section-title justify-center">
            이용 방법
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={index} className="card text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="font-bold text-primary-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-muted">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>
      </main>

      <Footer />

      {showAdModal && <AdModal onClose={handleAdModalClose} />}

      {/* JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AI 로또곳간',
            description: '딥러닝, 통계, 패턴 분석으로 로또 번호를 AI가 자동 추천합니다.',
            url: 'https://ailottogotgan.com',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'KRW',
            },
          }),
        }}
      />
    </>
  );
}
