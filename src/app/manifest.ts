import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI 로또곳간',
    short_name: 'AI로또',
    description: '딥러닝, 통계, 패턴 분석으로 로또 번호를 AI가 자동 추천합니다.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDF8F3',
    theme_color: '#8B5A2B',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
