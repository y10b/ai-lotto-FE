import { Metadata } from 'next';
import SajuClient from './SajuClient';

export const metadata: Metadata = {
  title: '사주로 보는 로또 번호 | AI 로또곳간',
  description: '생년월일과 성별을 기반으로 사주팔자를 분석하여 오행(목화토금수)에 맞는 행운의 로또 번호를 추천합니다. 동양 철학 기반 로또 번호 생성.',
  keywords: '사주 로또, 오행 로또, 생년월일 로또, 운세 로또, 동양철학 로또, 팔자 로또, 행운 번호',
  openGraph: {
    title: '사주로 보는 로또 번호 | AI 로또곳간',
    description: '사주팔자 오행 분석으로 행운의 로또 번호를 추천받으세요',
    url: 'https://ailottogotgan.com/saju-lotto',
  },
  alternates: {
    canonical: 'https://ailottogotgan.com/saju-lotto',
  },
};

export default function SajuLottoPage() {
  return <SajuClient />;
}
