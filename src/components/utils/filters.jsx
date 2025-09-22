/**
 * 여행지 목록을 필터링하는 함수
 * @param {import('../types/destination.js').SeoulDestination[]} destinations - 전체 여행지 목록
 * @param {string} searchQuery - 검색어 (이름, 지역, 설명에서 검색)
 * @param {string[]} types - 선택된 여행 테마들
 * @param {string[]} districts - 선택된 행정구들
 * @returns {import('../types/destination.js').SeoulDestination[]} 필터링된 여행지 목록
 */
export function filterDestinations(
  destinations, // 전체 여행지 배열
  searchQuery,  // 사용자가 입력한 검색어
  types,        // 선택된 여행 테마들 (예: ["역사", "문화"])
  districts     // 선택된 행정구들 (예: ["강남구", "종로구"])
) {
  return destinations.filter((destination) => {
    // 검색어 필터 - 이름, 지역, 설명에서 검색어가 포함되는지 확인
    const matchesSearch = searchQuery === "" || 
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||        // 여행지 이름에서 검색
      destination.district.toLowerCase().includes(searchQuery.toLowerCase()) ||    // 행정구에서 검색  
      destination.description.toLowerCase().includes(searchQuery.toLowerCase());   // 설명에서 검색

    // 여행 테마 필터 - 선택된 테마가 없거나, 여행지의 태그 중 선택된 테마가 포함되는지 확인
    const matchesType = types.length === 0 || 
      types.some(type => destination.tags.includes(type)); // 하나라도 일치하면 true

    // 행정구 필터 - 선택된 행정구가 없거나, 여행지의 행정구가 선택된 목록에 포함되는지 확인
    const matchesDistrict = districts.length === 0 || 
      districts.includes(destination.district);

    // 모든 조건을 만족하는 여행지만 반환
    return matchesSearch && matchesType && matchesDistrict;
  });
}