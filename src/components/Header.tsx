'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiClover } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';
import { BsRobot, BsBarChartLine, BsGrid3X3Gap } from 'react-icons/bs';
import { GiYinYang } from 'react-icons/gi';
import { FiUsers } from 'react-icons/fi';
import { getVisitors, countVisitor } from '@/lib/api';

export default function Header() {
  const pathname = usePathname();
  const [visitors, setVisitors] = useState({ total: 0, today: 0 });

  useEffect(() => {
    // 방문자 ID 생성 또는 조회
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
      visitorId = `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('visitorId', visitorId);
    }

    // 방문자 카운트 및 조회
    countVisitor(visitorId)
      .then(setVisitors)
      .catch(() => {
        getVisitors().then(setVisitors).catch(console.error);
      });
  }, []);

  const navItems = [
    { href: '/', label: '홈', icon: AiOutlineHome },
    { href: '/deep-learning-lotto', label: 'AI 분석', icon: BsRobot },
    { href: '/statistics-lotto', label: '통계 분석', icon: BsBarChartLine },
    { href: '/pattern-lotto', label: '패턴 분석', icon: BsGrid3X3Gap },
    { href: '/saju-lotto', label: '사주 분석', icon: GiYinYang },
  ];

  return (
    <header className="header shadow-sm sticky top-0 z-50">
      {/* 방문자 수 표시 */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white py-1 px-4">
        <div className="main-container flex justify-end items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <FiUsers className="text-xs" />
            <span>오늘 <strong>{(10000 + visitors.today).toLocaleString()}</strong></span>
          </div>
          <div className="flex items-center gap-1">
            <span>전체 <strong>{(10000 + visitors.total).toLocaleString()}</strong></span>
          </div>
        </div>
      </div>

      <nav className="main-container" aria-label="메인 네비게이션">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-full flex items-center justify-center">
              <GiClover className="text-white text-xl" />
            </div>
            <h1 className="text-xl font-bold text-primary-dark">
              AI 로또곳간
            </h1>
          </Link>

          <ul className="flex flex-wrap justify-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-tab flex items-center gap-2 ${pathname === item.href ? 'active' : ''}`}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    <Icon className="text-lg" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
