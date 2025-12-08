'use client';

import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string | number | '';
  onChange: (value: string | number | '') => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  label,
  required = false,
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 열릴 때 검색 입력에 포커스 (옵션이 많을 때만)
  useEffect(() => {
    if (isOpen && options.length > 12 && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, options.length]);

  // 선택된 항목이 보이도록 스크롤
  useEffect(() => {
    if (isOpen && listRef.current && value) {
      const selectedIndex = options.findIndex((opt) => opt.value === value);
      if (selectedIndex > -1) {
        const item = listRef.current.children[selectedIndex] as HTMLElement;
        if (item) {
          item.scrollIntoView({ block: 'center', behavior: 'instant' });
        }
      }
    }
  }, [isOpen, value, options]);

  const handleSelect = (optionValue: string | number | '') => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchQuery('');
  };

  const filteredOptions = searchQuery
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const showSearch = options.length > 12;

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-secondary mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* 선택 버튼 */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-lg border-2 text-left
          flex items-center justify-between gap-2
          transition-all duration-200
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white cursor-pointer'}
          ${isOpen
            ? 'border-primary ring-2 ring-primary/20'
            : 'border-gray-300 hover:border-gray-400'
          }
          ${!selectedOption ? 'text-gray-500' : 'text-foreground'}
        `}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown
          className={`
            text-gray-400 shrink-0 transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
          `}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <>
          {/* 모바일 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => {
              setIsOpen(false);
              setSearchQuery('');
            }}
          />

          {/* 드롭다운 패널 */}
          <div
            className={`
              z-50 bg-white border border-gray-200 shadow-xl
              md:absolute md:left-0 md:right-0 md:mt-2 md:rounded-lg md:max-h-72
              fixed bottom-0 left-0 right-0 rounded-t-2xl max-h-[70vh] md:bottom-auto
              overflow-hidden
              animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-top-2 duration-200
            `}
          >
            {/* 모바일 헤더 */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
              <span className="font-medium text-foreground">{label || '선택하세요'}</span>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                className="text-primary font-medium"
              >
                완료
              </button>
            </div>

            {/* 검색 입력 */}
            {showSearch && (
              <div className="p-2 border-b border-gray-200">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="검색..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            )}

            {/* 옵션 리스트 */}
            <ul
              ref={listRef}
              className="overflow-y-auto max-h-60 md:max-h-56 overscroll-contain"
            >
              {/* 선택 해제 옵션 */}
              {!required && (
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelect('')}
                    className={`
                      w-full px-4 py-3 text-left flex items-center justify-between
                      transition-colors
                      ${value === '' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}
                    `}
                  >
                    <span className="text-gray-500">{placeholder}</span>
                    {value === '' && <FiCheck className="text-primary" />}
                  </button>
                </li>
              )}

              {filteredOptions.length === 0 ? (
                <li className="px-4 py-3 text-center text-gray-500 text-sm">
                  검색 결과가 없습니다
                </li>
              ) : (
                filteredOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={`
                        w-full px-4 py-3 text-left flex items-center justify-between
                        transition-colors
                        ${value === option.value
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-gray-100 text-foreground'
                        }
                      `}
                    >
                      <span>{option.label}</span>
                      {value === option.value && <FiCheck className="text-primary shrink-0" />}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
