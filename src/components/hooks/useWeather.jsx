import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../data/weatherData';

/**
 * 날씨 데이터를 가져오는 React Query Hook
 * 현재 날씨, 시간별 예보, 주간 예보를 모두 포함
 * 실제 앱에서는 OpenWeatherMap 등의 외부 API와 연동
 *
 * @returns 날씨 데이터와 로딩/에러 상태
 */
export const useWeather = () => {
  return useQuery({
    queryKey: ['weather', 'seoul'],          // 캐시 키 - 서울 날씨 데이터
    queryFn: fetchWeatherData,               // 데이터 가져오는 함수
    staleTime: 10 * 60 * 1000,               // 10분 - 날씨 데이터는 자주 업데이트되므로 짧게 설정
    gcTime: 30 * 60 * 1000,                  // 30분 - 메모리에서 데이터 보관 시간
    refetchInterval: 15 * 60 * 1000,         // 15분마다 자동 업데이트
    retry: 2,                                // 실패 시 2번 재시도
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // 지수적 백오프
  });
};

/**
 * 특정 구의 현재 날씨 데이터만 가져오는 Hook
 *
 * @param {string} district - 행정구명 (예: "강남구")
 * @returns 해당 구의 현재 날씨 데이터
 */
export const useDistrictWeather = (district) => {
  const { data: weatherResponse, isLoading, error } = useWeather();

  // 전체 날씨 데이터에서 특정 구의 데이터만 필터링
  const districtWeather = weatherResponse?.districts.find(
    weather => weather.district === district
  );

  return {
    weather: districtWeather,
    isLoading,
    error,
    lastUpdated: weatherResponse?.timestamp
  };
};

/**
 * 시간별 날씨 예보를 가져오는 Hook
 *
 * @returns 24시간 날씨 예보 데이터
 */
export const useHourlyWeather = () => {
  const { data: weatherResponse, isLoading, error } = useWeather();

  return {
    hourlyForecast: weatherResponse?.hourlyForecast || [],
    isLoading,
    error,
    lastUpdated: weatherResponse?.timestamp
  };
};

/**
 * 주간 날씨 예보를 가져오는 Hook
 *
 * @returns 7일간 날씨 예보 데이터
 */
export const useDailyWeather = () => {
  const { data: weatherResponse, isLoading, error } = useWeather();

  return {
    dailyForecast: weatherResponse?.dailyForecast || [],
    isLoading,
    error,
    lastUpdated: weatherResponse?.timestamp
  };
};

/**
 * 날씨 상태에 따른 여행 추천 메시지 생성
 *
 * @param {object} weather - 날씨 데이터
 * @returns {string} 여행 추천 메시지
 */
export const getWeatherRecommendation = (weather) => {
  const { condition, temperature } = weather;

  if (condition === "맑음" && temperature >= 15) {
    return "여행하기 완벽한 날씨입니다! ☀️";
  } else if (condition === "구름조금" && temperature >= 12) {
    return "야외 활동하기 좋은 날씨네요! 🌤️";
  } else if (condition === "흐림" || condition === "구름많음") {
    return "실내 관광지를 추천합니다 ☁️";
  } else if (condition === "비") {
    return "우산을 꼭 챙기세요! 실내 활동을 추천 🌧️";
  } else if (temperature < 10) {
    return "따뜻하게 입고 나오세요! 🧥";
  } else {
    return "즐거운 여행 되세요! 🎒";
  }
};

/**
 * 온도에 따른 의류 추천
 *
 * @param {number} temperature - 온도
 * @returns {string} 의류 추천 메시지
 */
export const getClothingRecommendation = (temperature) => {
  if (temperature >= 25) {
    return "반팔, 반바지 👕";
  } else if (temperature >= 20) {
    return "긴팔, 얇은 겉옷 👔";
  } else if (temperature >= 15) {
    return "가디건, 자켓 🧥";
  } else if (temperature >= 10) {
    return "코트, 니트 🧥";
  } else {
    return "두꺼운 외투, 목도리 🧣";
  }
};

/**
 * 강수 확률에 따른 우산 추천
 *
 * @param {number} precipitation - 강수 확률 (%)
 * @returns {string} 우산 추천 메시지
 */
export const getUmbrellaRecommendation = (precipitation) => {
  if (precipitation >= 70) {
    return "우산을 꼭 챙기세요! ☔";
  } else if (precipitation >= 40) {
    return "우산을 준비하시는 게 좋겠어요 🌂";
  } else if (precipitation >= 20) {
    return "혹시 모르니 접이식 우산을 챙겨보세요";
  } else {
    return "우산 없이도 괜찮을 것 같아요 ☀️";
  }
};

/**
 * UV 지수에 따른 자외선 차단 추천
 *
 * @param {number} uvIndex - 자외선 지수 (0-11)
 * @returns {string} 자외선 차단 추천 메시지
 */
export const getUVRecommendation = (uvIndex) => {
  if (uvIndex >= 8) {
    return "자외선이 매우 강해요! 선크림과 모자 필수 🧴🧢";
  } else if (uvIndex >= 6) {
    return "자외선이 강하니 선크림을 발라주세요 ☀️";
  } else if (uvIndex >= 3) {
    return "적당한 자외선이에요. 가벼운 차단제 권장";
  } else {
    return "자외선 걱정 없이 나들이하세요!";
  }
};