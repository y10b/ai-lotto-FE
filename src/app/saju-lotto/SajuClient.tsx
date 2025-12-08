'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NumberResult from '@/components/NumberResult';
import AdModal from '@/components/AdModal';
import SajuGotganModal from '@/components/SajuGotganModal';
import CustomSelect from '@/components/CustomSelect';
import { generateSajuNumbers, SajuResponse } from '@/lib/api';
import { shouldShowAd, setFirstClick, setAdViewed } from '@/lib/adTracker';
import { GiYinYang } from 'react-icons/gi';

export default function SajuClient() {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState<number | ''>('');
  const [month, setMonth] = useState<number | ''>('');
  const [day, setDay] = useState<number | ''>('');
  const [hour, setHour] = useState<number | ''>('');
  const [gender, setGender] = useState<string>('');

  const [result, setResult] = useState<SajuResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showSajuGotganModal, setShowSajuGotganModal] = useState(false);

  // 년도 옵션 (1920년 ~ 현재년도)
  const years = useMemo(() => {
    const arr = [];
    for (let y = currentYear; y >= 1920; y--) {
      arr.push(y);
    }
    return arr;
  }, [currentYear]);

  // 월 옵션
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 일 옵션 (월에 따라 다름)
  const days = useMemo(() => {
    if (!month) return Array.from({ length: 31 }, (_, i) => i + 1);
    const daysInMonth = new Date(year || currentYear, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [year, month, currentYear]);

  // 시간 옵션 (시주 - 2시간 단위)
  const hours = [
    { value: 0, label: '자시 (23:00~01:00)' },
    { value: 2, label: '축시 (01:00~03:00)' },
    { value: 4, label: '인시 (03:00~05:00)' },
    { value: 6, label: '묘시 (05:00~07:00)' },
    { value: 8, label: '진시 (07:00~09:00)' },
    { value: 10, label: '사시 (09:00~11:00)' },
    { value: 12, label: '오시 (11:00~13:00)' },
    { value: 14, label: '미시 (13:00~15:00)' },
    { value: 16, label: '신시 (15:00~17:00)' },
    { value: 18, label: '유시 (17:00~19:00)' },
    { value: 20, label: '술시 (19:00~21:00)' },
    { value: 22, label: '해시 (21:00~23:00)' },
  ];

  // 폼 유효성 검사
  const isFormValid = year !== '' && month !== '' && day !== '' && gender !== '';

  const handleGenerate = async () => {
    if (!isFormValid) return;

    if (shouldShowAd()) {
      setShowAdModal(true);
      return;
    }
    await generateNumbers();
  };

  const generateNumbers = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    setFirstClick('saju');
    try {
      const response = await generateSajuNumbers({
        year: year as number,
        month: month as number,
        day: day as number,
        hour: hour !== '' ? hour as number : undefined,
        gender,
      });
      setResult(response);

      // 결과가 나온 후 1.5초 뒤에 사주곳간 모달 표시
      setTimeout(() => {
        setShowSajuGotganModal(true);
      }, 1500);
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
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
              <GiYinYang className="text-white text-4xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
              사주로 보는 로또 번호
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              생년월일을 입력하면 사주팔자의 오행(목화토금수)을 분석하여
              당신에게 맞는 행운의 번호를 추천해 드립니다.
            </p>
          </div>

          {/* 입력 폼 */}
          <div className="card max-w-2xl mx-auto mb-8">
            <h2 className="text-xl font-bold text-primary-dark mb-6 text-center">
              생년월일 입력
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* 년도 선택 */}
              <CustomSelect
                label="출생년도"
                required
                options={years.map((y) => ({ value: y, label: `${y}년` }))}
                value={year}
                onChange={(v) => setYear(v === '' ? '' : Number(v))}
                placeholder="년도 선택"
              />

              {/* 월 선택 */}
              <CustomSelect
                label="출생월"
                required
                options={months.map((m) => ({ value: m, label: `${m}월` }))}
                value={month}
                onChange={(v) => setMonth(v === '' ? '' : Number(v))}
                placeholder="월 선택"
              />

              {/* 일 선택 */}
              <CustomSelect
                label="출생일"
                required
                options={days.map((d) => ({ value: d, label: `${d}일` }))}
                value={day}
                onChange={(v) => setDay(v === '' ? '' : Number(v))}
                placeholder="일 선택"
              />

              {/* 시간 선택 (선택사항) */}
              <CustomSelect
                label="태어난 시간"
                options={hours.map((h) => ({ value: h.value, label: h.label }))}
                value={hour}
                onChange={(v) => setHour(v === '' ? '' : Number(v))}
                placeholder="모름 / 선택 안함"
              />
            </div>

            {/* 성별 선택 */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-secondary mb-2">
                성별 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                    gender === 'male'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  남성
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                    gender === 'female'
                      ? 'border-pink-500 bg-pink-50 text-pink-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  여성
                </button>
              </div>
            </div>

            {/* 생성 버튼 */}
            <button
              onClick={handleGenerate}
              disabled={!isFormValid || isLoading}
              className={`w-full py-4 px-6 rounded-lg text-xl font-bold transition-all ${
                isFormValid && !isLoading
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? '사주 분석 중...' : '사주 분석으로 번호 추천 받기'}
            </button>

            {!isFormValid && (
              <p className="text-center text-sm text-muted mt-3">
                출생년도, 월, 일, 성별을 모두 입력해주세요.
              </p>
            )}
          </div>

          {/* 결과 표시 */}
          {(isLoading || result) && (
            <div className="mb-12">
              <NumberResult
                numbers={result?.numbers || []}
                method={result?.method || ''}
                confidence={result?.confidence}
                isLoading={isLoading}
              />

              {result && (
                <div className="card max-w-2xl mx-auto mt-6 bg-gradient-to-br from-purple-50 to-indigo-50">
                  <h3 className="text-lg font-bold text-primary-dark mb-4">사주 분석 결과</h3>
                  <div className="space-y-3 text-secondary">
                    <p>
                      <span className="font-medium">사주:</span> {result.sajuInfo}
                    </p>
                    <p>
                      <span className="font-medium">일간 오행:</span> {result.dayOhaeng}
                    </p>
                    <p className="text-sm text-muted mt-4">
                      {result.analysis}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* SEO 콘텐츠 */}
        <article className="card mb-12">
          <h2 className="section-title">사주와 로또 번호의 관계</h2>
          <div className="prose max-w-none text-secondary space-y-4">
            <p>
              사주(四柱)는 동양 철학에서 사람의 운명을 분석하는 방법으로,
              태어난 년, 월, 일, 시의 천간(天干)과 지지(地支)를 통해
              개인의 기질과 운세를 파악합니다.
            </p>
            <h3 className="text-lg font-bold text-primary-dark mt-6">오행(五行)과 숫자</h3>
            <p>
              오행은 목(木), 화(火), 토(土), 금(金), 수(水)의 다섯 가지 기운을 의미합니다.
              각 오행은 특정 숫자와 연관되어 있습니다:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>수(水):</strong> 1, 6 계열 (1, 6, 11, 16, 21, 26, 31, 36, 41)</li>
              <li><strong>화(火):</strong> 2, 7 계열 (2, 7, 12, 17, 22, 27, 32, 37, 42)</li>
              <li><strong>목(木):</strong> 3, 8 계열 (3, 8, 13, 18, 23, 28, 33, 38, 43)</li>
              <li><strong>금(金):</strong> 4, 9 계열 (4, 9, 14, 19, 24, 29, 34, 39, 44)</li>
              <li><strong>토(土):</strong> 5, 10 계열 (5, 10, 15, 20, 25, 30, 35, 40, 45)</li>
            </ul>
            <h3 className="text-lg font-bold text-primary-dark mt-6">일간(日干)의 중요성</h3>
            <p>
              사주에서 일간은 자신을 나타내는 가장 중요한 요소입니다.
              일간의 오행을 기준으로 상생(相生) 관계의 오행은 길하고,
              상극(相剋) 관계의 오행은 피하는 것이 좋다고 합니다.
              본 서비스는 이러한 오행의 상생상극 관계를 분석하여 번호를 추천합니다.
            </p>
            <p className="text-sm text-muted mt-4">
              ※ 본 서비스는 재미와 참고용으로만 활용해 주시기 바랍니다.
              로또는 완전한 랜덤 추첨이므로 당첨을 보장하지 않습니다.
            </p>
          </div>
        </article>

        <section className="card mb-12">
          <h2 className="section-title">오행 상생상극 관계</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-bold text-green-800 mb-3">상생(相生) - 서로 돕는 관계</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>목(木) → 화(火): 나무가 불을 태움</li>
                <li>화(火) → 토(土): 불이 재를 만들어 흙이 됨</li>
                <li>토(土) → 금(金): 흙에서 금속이 나옴</li>
                <li>금(金) → 수(水): 금속에서 물이 생김</li>
                <li>수(水) → 목(木): 물이 나무를 키움</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-bold text-red-800 mb-3">상극(相剋) - 서로 제압하는 관계</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>목(木) → 토(土): 나무가 흙의 기운을 빼앗음</li>
                <li>토(土) → 수(水): 흙이 물을 막음</li>
                <li>수(水) → 화(火): 물이 불을 끔</li>
                <li>화(火) → 금(金): 불이 금속을 녹임</li>
                <li>금(金) → 목(木): 금속이 나무를 자름</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {showAdModal && <AdModal onClose={handleAdModalClose} />}

      {showSajuGotganModal && (
        <SajuGotganModal
          onClose={() => setShowSajuGotganModal(false)}
          sajuInfo={result?.sajuInfo}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: '사주로 보는 로또 번호',
            description: '생년월일 사주팔자 오행 분석으로 행운의 로또 번호를 추천합니다.',
            author: { '@type': 'Organization', name: 'AI 로또곳간' },
            publisher: { '@type': 'Organization', name: 'AI 로또곳간' },
          }),
        }}
      />
    </>
  );
}
