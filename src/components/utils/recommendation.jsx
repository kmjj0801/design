/**
 * 여행 선호도 정보
 * @typedef {Object} TravelPreferences
 * @property {string[]} themes - 선택된 여행 테마들
 * @property {string[]} districts - 선택된 행정구들
 * @property {Date} [startDate] - 여행 시작일
 * @property {Date} [endDate] - 여행 종료일
 */

/**
 * 추천 점수 정보
 * @typedef {Object} RecommendationScore
 * @property {import('../types/destination.js').SeoulDestination} destination - 여행지 정보
 * @property {number} score - 추천 점수
 * @property {string[]} reasons - 추천 이유들
 */

// 계절 판단 함수
const getSeason = (date) => {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
};

// 날씨에 따른 추천 가중치
const getWeatherWeight = (destination, season) => {
  // destination.tags가 없으면 기본값 반환
  if (!destination.tags || !Array.isArray(destination.tags)) {
    return 1.0;
  }
  
  // 실내 관광지는 겨울에 가중치 증가
  const indoorTypes = ["박물관/미술관", "쇼핑", "맛집"];
  const isIndoor = indoorTypes.some(type => destination.tags.includes(type));
  
  // 야외 관광지는 봄/가을에 가중치 증가
  const outdoorTypes = ["역사/문화", "자연/공원", "공원/자연"];
  const isOutdoor = outdoorTypes.some(type => destination.tags.includes(type));
  
  if (season === "winter" && isIndoor) return 1.3;
  if ((season === "spring" || season === "autumn") && isOutdoor) return 1.2;
  if (season === "summer" && isIndoor) return 1.1; // 여름엔 실내가 조금 더 좋음
  
  return 1.0;
};

/**
 * 여행지 추천 시스템
 * @param {import('../types/destination.js').SeoulDestination[]} destinations - 전체 여행지 목록
 * @param {TravelPreferences} preferences - 사용자 선호도
 * @param {number} maxResults - 최대 결과 개수
 * @returns {RecommendationScore[]} 추천 점수가 포함된 여행지 목록
 */
export const getRecommendedDestinations = (
  destinations,
  preferences,
  maxResults = 12
) => {
  const scores = [];
  const season = preferences.startDate ? getSeason(preferences.startDate) : "spring";

  destinations.forEach(destination => {
    let score = 0;
    const reasons = [];

    // 1. 선택한 지역 가중치 (40점)
    if (preferences.districts.length > 0) {
      if (preferences.districts.includes(destination.district)) {
        score += 40;
        reasons.push(`선택하신 ${destination.district} 지역의 여행지입니다`);
      } else {
        // 선택하지 않은 지역은 점수 감점하지 않고 0점만 부여
        score += 0;
      }
    } else {
      // 지역 선택이 없으면 모든 지역에 기본 점수
      score += 20;
    }

    // 2. 선택한 테마 가중치 (30점)
    if (preferences.themes.length > 0) {
      if (destination.tags && Array.isArray(destination.tags)) {
        const matchingThemes = destination.tags.filter(type => 
          preferences.themes.includes(type)
        );
        if (matchingThemes.length > 0) {
          score += 30 * (matchingThemes.length / preferences.themes.length);
          reasons.push(`관심 테마 '${matchingThemes.join(", ")}'와 일치합니다`);
        }
      }
    } else {
      // 테마 선택이 없으면 모든 여행지에 기본 점수
      score += 15;
    }

    // 3. 평점 가중치 (20점)
    score += (destination.rating / 5) * 20;
    if (destination.rating >= 4.5) {
      reasons.push("높은 평점의 인기 여행지입니다");
    }

    // 4. 계절/날씨 가중치 (10점)
    const weatherWeight = getWeatherWeight(destination, season);
    score *= weatherWeight;
    if (weatherWeight > 1.1) {
      const seasonText = {
        spring: "봄",
        summer: "여름", 
        autumn: "가을",
        winter: "겨울"
      }[season];
      reasons.push(`${seasonText}철에 특히 추천하는 여행지입니다`);
    }

    // 5. 접근성 보너스 (지하철역 근처)
    if (destination.description.includes("지하철") || destination.description.includes("역")) {
      score += 5;
      reasons.push("대중교통으로 접근하기 편리합니다");
    }

    // 6. 특별한 경험 보너스
    if (destination.description.includes("체험") || destination.description.includes("전망")) {
      score += 5;
      reasons.push("특별한 경험을 할 수 있는 여행지입니다");
    }

    scores.push({
      destination,
      score: Math.round(score * 10) / 10, // 소수점 첫째 자리까지
      reasons
    });
  });

  // 점수 순으로 정렬하고 상위 결과만 반환
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
};

/**
 * 추천 여행지를 카테고리별로 분류
 * @param {RecommendationScore[]} recommendations - 추천 여행지 목록
 * @returns {Object} 카테고리별로 분류된 추천 여행지
 */
export const categorizeRecommendations = (recommendations) => {
  const topPicks = recommendations.slice(0, 4); // 최고 추천 4개
  const themeMatches = recommendations
    .filter(r => r.reasons.some(reason => reason.includes("테마")))
    .slice(0, 4);
  const nearbyOptions = recommendations
    .filter(r => r.reasons.some(reason => reason.includes("지역")))
    .slice(0, 4);

  return {
    topPicks,
    themeMatches,
    nearbyOptions
  };
};