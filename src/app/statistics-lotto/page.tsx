import { Metadata } from 'next';
import StatisticsClient from './StatisticsClient';

export const metadata: Metadata = {
  title: '로또 통계 분석 | AI 로또곳간',
  description: '역대 로또 당첨 번호 빈도수, 홀짝 비율, 고저 비율 등 통계 데이터를 분석하여 확률적으로 유리한 번호를 추천합니다. 로또 통계 분석 서비스.',
  keywords: '로또 통계, 로또 분석, 로또 번호 빈도, 로또 확률, 로또 당첨 통계, 로또 번호 분석',
  openGraph: {
    title: '로또 통계 분석 | AI 로또곳간',
    description: '역대 로또 당첨 번호 통계 분석 및 번호 추천',
    url: 'https://ailottogotgan.com/statistics-lotto',
  },
  alternates: {
    canonical: 'https://ailottogotgan.com/statistics-lotto',
  },
};

export default function StatisticsPage() {
  return <StatisticsClient />;
}
