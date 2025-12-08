import { Metadata } from 'next';
import PatternClient from './PatternClient';

export const metadata: Metadata = {
  title: '로또 패턴 분석 | AI 로또곳간',
  description: '홀짝, 고저, 연속번호, 구간별 분포, 끝자리 분포 등 다양한 패턴을 분석하여 로또 번호를 추천합니다. 로또 패턴 분석 서비스.',
  keywords: '로또 패턴, 로또 분석, 로또 연속번호, 로또 구간, 로또 끝자리, 로또 AC값',
  openGraph: {
    title: '로또 패턴 분석 | AI 로또곳간',
    description: '다양한 패턴 분석을 통한 로또 번호 추천',
    url: 'https://ailottogotgan.com/pattern-lotto',
  },
  alternates: {
    canonical: 'https://ailottogotgan.com/pattern-lotto',
  },
};

export default function PatternPage() {
  return <PatternClient />;
}
