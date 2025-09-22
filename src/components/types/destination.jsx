/**
 * @typedef {Object} SeoulDestination
 * @property {string} id - 여행지 고유 ID
 * @property {string} name - 여행지 이름
 * @property {string} district - 행정구
 * @property {string} description - 설명
 * @property {string} image - 이미지 URL
 * @property {number} rating - 평점
 * @property {number} estimatedCost - 예상 비용
 * @property {string} visitDuration - 방문 소요 시간
 * @property {string[]} tags - 태그들
 * @property {Object} coordinates - 좌표
 * @property {number} coordinates.lat - 위도
 * @property {number} coordinates.lng - 경도
 * @property {string} [address] - 주소
 * @property {string} [detailedAddress] - 상세 주소
 * @property {string} [subway] - 지하철 정보
 * @property {string} [operatingHours] - 운영 시간
 * @property {string} [phone] - 전화번호
 * @property {string} [website] - 웹사이트
 * @property {string} [admissionFee] - 입장료
 * @property {string} [parking] - 주차 정보
 * @property {string[]} [nearbyAttractions] - 근처 명소들
 * @property {string} [bestVisitTime] - 최적 방문 시간
 * @property {string} [accessibility] - 접근성 정보
 * @property {boolean} [isLiked] - 찜 여부
 * @property {number} [distance] - 거리
 */

/**
 * @typedef {Object} TravelPlan
 * @property {string} id - 여행 계획 ID
 * @property {string} title - 제목
 * @property {string} date - 날짜
 * @property {string[]} destinations - 여행지 목록
 * @property {"upcoming"|"past"} status - 상태
 * @property {number} participants - 참가자 수
 * @property {boolean} isShared - 공유 여부
 */

/**
 * @typedef {Object} FilterOptions
 * @property {[number, number]} budget - 예산 범위
 * @property {string[]} types - 여행 타입들
 * @property {string[]} districts - 행정구들
 */

/**
 * @typedef {Object} LocationCoordinates
 * @property {number} latitude - 위도
 * @property {number} longitude - 경도
 */

/**
 * @typedef {Object} WeatherData
 * @property {string} district - 행정구명
 * @property {number} temperature - 현재 온도
 * @property {string} condition - 날씨 상태
 * @property {number} humidity - 습도
 * @property {number} windSpeed - 풍속
 * @property {string} icon - 날씨 아이콘 코드
 * @property {string} description - 상세 설명
 * @property {number} feelsLike - 체감온도
 * @property {number} uvIndex - 자외선 지수
 */

/**
 * @typedef {Object} HourlyWeatherData
 * @property {string} time - 시간
 * @property {string} timestamp - ISO 시간 문자열
 * @property {number} temperature - 온도
 * @property {string} condition - 날씨 상태
 * @property {string} icon - 날씨 아이콘
 * @property {number} humidity - 습도
 * @property {number} windSpeed - 풍속
 * @property {number} precipitation - 강수 확률
 */

/**
 * @typedef {Object} DailyWeatherData
 * @property {string} date - 날짜
 * @property {string} dayOfWeek - 요일
 * @property {string} condition - 날씨 상태
 * @property {string} icon - 날씨 아이콘
 * @property {number} tempMax - 최고 온도
 * @property {number} tempMin - 최저 온도
 * @property {number} humidity - 습도
 * @property {number} windSpeed - 풍속
 * @property {number} precipitation - 강수 확률
 * @property {string} sunrise - 일출 시간
 * @property {string} sunset - 일몰 시간
 * @property {number} uvIndex - 자외선 지수
 */

/**
 * @typedef {Object} WeatherResponse
 * @property {string} timestamp - 데이터 업데이트 시간
 * @property {WeatherData[]} districts - 각 구별 현재 날씨
 * @property {HourlyWeatherData[]} hourlyForecast - 24시간 예보
 * @property {DailyWeatherData[]} dailyForecast - 7일간 예보
 */

// JavaScript에서는 실제로 export할 것이 없으므로 빈 객체를 export
export {};