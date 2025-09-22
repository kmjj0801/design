/**
 * 두 지점 간의 거리를 계산하는 하버사인 공식
 * @param {number} lat1 첫 번째 지점의 위도
 * @param {number} lon1 첫 번째 지점의 경도
 * @param {number} lat2 두 번째 지점의 위도
 * @param {number} lon2 두 번째 지점의 경도
 * @returns {number} 거리 (km)
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 지구의 반지름 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * 거리를 읽기 쉬운 형태로 포맷팅
 * @param {number} distance 거리 (km)
 * @returns {string} 포맷된 거리 문자열
 */
export function formatDistance(distance) {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
}