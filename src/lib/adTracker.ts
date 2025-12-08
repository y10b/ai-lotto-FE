const AD_STORAGE_KEY = 'ai_lotto_ad_tracker';
const EXPIRY_DURATION = 60 * 60 * 1000; // 1시간 (밀리초)

interface AdTrackerData {
  firstClickType: string | null;
  adViewed: boolean;
  timestamp: number | null; // 첫 클릭 시간
}

function getDefaultData(): AdTrackerData {
  return { firstClickType: null, adViewed: false, timestamp: null };
}

export function getAdTrackerData(): AdTrackerData {
  if (typeof window === 'undefined') {
    return getDefaultData();
  }

  try {
    const data = localStorage.getItem(AD_STORAGE_KEY);
    if (data) {
      const parsed: AdTrackerData = JSON.parse(data);

      // 1시간 경과 여부 확인
      if (parsed.timestamp) {
        const elapsed = Date.now() - parsed.timestamp;
        if (elapsed >= EXPIRY_DURATION) {
          // 만료됨 - 데이터 초기화
          localStorage.removeItem(AD_STORAGE_KEY);
          return getDefaultData();
        }
      }

      return parsed;
    }
  } catch {
    // localStorage 접근 실패 시 기본값 반환
  }

  return getDefaultData();
}

export function setFirstClick(clickType: string): void {
  if (typeof window === 'undefined') return;

  const data = getAdTrackerData();
  if (!data.firstClickType) {
    data.firstClickType = clickType;
    data.timestamp = Date.now();
    localStorage.setItem(AD_STORAGE_KEY, JSON.stringify(data));
  }
}

export function setAdViewed(): void {
  if (typeof window === 'undefined') return;

  const data = getAdTrackerData();
  data.adViewed = true;
  if (!data.timestamp) {
    data.timestamp = Date.now();
  }
  localStorage.setItem(AD_STORAGE_KEY, JSON.stringify(data));
}

export function shouldShowAd(): boolean {
  const data = getAdTrackerData();
  // 첫 클릭이 없거나 만료된 경우 광고 모달 표시
  return !data.firstClickType;
}
