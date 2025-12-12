const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface GenerateResponse {
  numbers: number[];
  method: string;
  confidence: number;
}

interface StatisticsResponse {
  mostFrequent: number[];
  leastFrequent: number[];
  recentNumbers: {
    round: number;
    numbers: number[];
    bonus: number;
  }[];
  oddEvenRatio: string;
  lowHighRatio: string;
  frequency: Record<string, number>;
  consecutiveCount: number;
  totalRounds: number;
}

interface PatternResponse {
  rangeDistribution: Record<string, number>;
  endingDistribution: Record<string, number>;
  averageAC: number;
  sumAnalysis: {
    average: number;
    min: number;
    max: number;
  };
  totalRounds: number;
}

export interface MetaResponse {
  latestRound: number;
  latestNumbers: number[];
  latestBonus: number;
  totalRounds: number;
  lastUpdate: string;
}

export async function generateAINumbers(): Promise<GenerateResponse> {
  const res = await fetch(`${API_BASE_URL}/api/ai/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('AI 번호 생성 실패');
  return res.json();
}

export async function generateStatisticsNumbers(): Promise<GenerateResponse> {
  const res = await fetch(`${API_BASE_URL}/api/statistics/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('통계 번호 생성 실패');
  return res.json();
}

export async function generatePatternNumbers(): Promise<GenerateResponse> {
  const res = await fetch(`${API_BASE_URL}/api/pattern/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('패턴 번호 생성 실패');
  return res.json();
}

export async function getStatistics(): Promise<StatisticsResponse> {
  const res = await fetch(`${API_BASE_URL}/api/statistics`);
  if (!res.ok) throw new Error('통계 조회 실패');
  return res.json();
}

export async function getPatternAnalysis(): Promise<PatternResponse> {
  const res = await fetch(`${API_BASE_URL}/api/pattern`);
  if (!res.ok) throw new Error('패턴 분석 조회 실패');
  return res.json();
}

export async function getMeta(): Promise<MetaResponse> {
  const res = await fetch(`${API_BASE_URL}/api/meta`);
  if (!res.ok) throw new Error('메타 정보 조회 실패');
  return res.json();
}

export interface SajuRequest {
  year: number;
  month: number;
  day: number;
  hour?: number;
  gender: string;
}

export interface SajuResponse {
  numbers: number[];
  method: string;
  confidence: number;
  sajuInfo: string;
  dayOhaeng: string;
  analysis: string;
}

export async function generateSajuNumbers(data: SajuRequest): Promise<SajuResponse> {
  const res = await fetch(`${API_BASE_URL}/api/saju/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('사주 번호 생성 실패');
  return res.json();
}
