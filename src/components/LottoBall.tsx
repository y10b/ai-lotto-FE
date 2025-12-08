'use client';

interface LottoBallProps {
  number: number;
  size?: 'sm' | 'md' | 'lg';
  isBonus?: boolean;
}

export default function LottoBall({ number, size = 'md', isBonus = false }: LottoBallProps) {
  const getRangeClass = (num: number) => {
    if (num <= 10) return 'range-1';
    if (num <= 20) return 'range-10';
    if (num <= 30) return 'range-20';
    if (num <= 40) return 'range-30';
    return 'range-40';
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { width: 'var(--ball-sm)', height: 'var(--ball-sm)', fontSize: 'var(--ball-font-sm)' },
    md: { width: 'var(--ball-md)', height: 'var(--ball-md)', fontSize: 'var(--ball-font-md)' },
    lg: { width: 'var(--ball-lg)', height: 'var(--ball-lg)', fontSize: 'var(--ball-font-lg)' },
  };

  return (
    <div className="relative inline-flex items-center">
      <div
        className={`lotto-ball ${getRangeClass(number)} ${
          isBonus ? 'ring-2 ring-offset-2 ring-yellow-400' : ''
        }`}
        style={sizeStyles[size]}
      >
        {number}
      </div>
    </div>
  );
}
