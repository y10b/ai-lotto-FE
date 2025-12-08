import { Metadata } from 'next';
import DeepLearningClient from './DeepLearningClient';

export const metadata: Metadata = {
  title: 'AI 딥러닝 로또 분석 | AI 로또곳간',
  description: 'XGBoost 기반 딥러닝 인공지능이 과거 로또 당첨 데이터를 분석하여 번호를 예측합니다. 머신러닝 알고리즘으로 패턴을 학습한 AI 로또 번호 추천 서비스.',
  keywords: 'AI 로또, 딥러닝 로또, 머신러닝 로또, XGBoost 로또, 인공지능 로또 예측, 로또 AI 분석',
  openGraph: {
    title: 'AI 딥러닝 로또 분석 | AI 로또곳간',
    description: 'XGBoost 딥러닝으로 분석한 로또 번호 추천',
    url: 'https://ailottogotgan.com/deep-learning-lotto',
  },
  alternates: {
    canonical: 'https://ailottogotgan.com/deep-learning-lotto',
  },
};

export default function DeepLearningPage() {
  return <DeepLearningClient />;
}
