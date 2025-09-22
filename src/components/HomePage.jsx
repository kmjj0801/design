import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ModernHeader } from "./ModernHeader";
import { HeroSection } from "./HeroSection";
import { FilterDropdowns } from "./FilterDropdowns";
import { WeatherWidget } from "./WeatherWidget";
import { ModernDestinationGrid } from "./ModernDestinationGrid";
import { DestinationModal } from "./DestinationModal";
import { useFavorites } from "./contexts/FavoritesContext";
import { seoulDestinationsData } from "./data/seoulDestinations";
import { filterDestinations } from "./utils/filters";
import { toast } from "sonner@2.0.3";

export const HomePage = () => {
  // 검색어 상태 - 사용자가 입력하는 검색어를 저장
  const [searchQuery, setSearchQuery] = useState("");
  // 여행 테마 선택 상태 - 선택된 여행 테마들을 배열로 저장 (예: ["역사", "문화"])
  const [selectedTypes, setSelectedTypes] = useState([]);
  // 행정구 선택 상태 - 선택된 행정구들을 배열로 저장 (예: ["강남구", "종로구"])
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  // 선택된 여행지 상태 - 상세보기 모달에서 보여줄 여행지 정보
  const [selectedDestination, setSelectedDestination] = useState(null);
  // 상세보기 모달 열림/닫힘 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 날씨 위젯에서 선택된 구 상태
  const [selectedWeatherDistrict, setSelectedWeatherDistrict] = useState("강남구");

  // 찜목록 관리 hook - 찜한 여행지들을 관리
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  // React Query로 여행지 데이터 관리 - 서버에서 데이터를 가져오고 캐싱
  const { data: destinations, isLoading } = useQuery({
    queryKey: ["destinations"], // 캐시 키
    queryFn: async () => {
      // 실제 앱에서는 API 호출, 지금은 시뮬레이션을 위한 딜레이
      await new Promise(resolve => setTimeout(resolve, 500));
      return seoulDestinationsData;
    },
    initialData: seoulDestinationsData, // 초기 데이터
  });

  // 필터링된 여행지 목록 계산 - useMemo로 성능 최적화
  const filteredDestinations = useMemo(() => {
    return filterDestinations(
      destinations || [], // 원본 데이터
      searchQuery,        // 검색어
      selectedTypes,      // 선택된 테마들
      selectedDistricts   // 선택된 행정구들
    );
  }, [destinations, searchQuery, selectedTypes, selectedDistricts]);

  // 찜하기 버튼 클릭 핸들러
  const handleLike = (id) => {
    toast.success("찜 목록에 추가했습니다!");
  };

  // 여행 테마 토글 핸들러 - 체크박스처럼 선택/해제
  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)  // 이미 선택된 경우 제거
        : [...prev, type]               // 선택되지 않은 경우 추가
    );
  };

  // 행정구 토글 핸들러 - 체크박스처럼 선택/해제  
  const handleDistrictToggle = (district) => {
    setSelectedDistricts(prev =>
      prev.includes(district)
        ? prev.filter(d => d !== district) // 이미 선택된 경우 제거
        : [...prev, district]               // 선택되지 않은 경우 추가
    );
  };

  // 모든 필터 초기화 핸들러
  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSelectedDistricts([]);
    toast.success("필터가 초기화되었습니다.");
  };

  // 여행지 선택 핸들러 - 상세보기 모달 열기
  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination); // 선택된 여행지 설정
    setIsModalOpen(true);                // 모달 열기
  };

  // 로딩 중일 때 보여줄 화면
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" role="status" aria-label="로딩 중"></div>
          <p className="text-muted-foreground">여행지 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 메인 화면 렌더링
  return (
    <>
      {/* 헤더 */}
      <ModernHeader
        searchQuery={searchQuery}          // 검색어 전달
        onSearchChange={setSearchQuery}    // 검색어 변경 핸들러 전달
      />

      {/* 히어로 섹션 */}
      <HeroSection
        filteredCount={filteredDestinations.length} // 필터링된 여행지 개수 전달
      />

      {/* 메인 콘텐츠 - 새로운 레이아웃 */}
      <main className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 lg:py-12">
        {/* 날씨 위젯 */}
        <section className="mb-8">
          <WeatherWidget
            selectedDistrict={selectedWeatherDistrict}
            onDistrictChange={setSelectedWeatherDistrict}
          />
        </section>

        {/* 여행지 섹션 */}
        <section>
          {/* 섹션 헤더 */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 lg:mb-3 text-black">
              {searchQuery ? `"${searchQuery}" 검색 결과` : "추천 여행지"}
            </h2>
          </div>

          {/* 필터 드롭다운 */}
          <div className="mb-6">
            <FilterDropdowns
              selectedTypes={selectedTypes}
              onTypeToggle={handleTypeToggle}
              selectedDistricts={selectedDistricts}
              onDistrictToggle={handleDistrictToggle}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* 여행지 그리드 */}
          <ModernDestinationGrid
            destinations={filteredDestinations} // 필터링된 여행지들 전달
            onLike={handleLike}                 // 찜하기 핸들러 전달
            onSelect={handleSelectDestination}  // 여행지 선택 핸들러 전달
          />
        </section>
      </main>

      {/* 여행지 상세보기 모달 */}
      <DestinationModal
        destination={selectedDestination}      // 선택된 여행지 정보 전달
        isOpen={isModalOpen}                   // 모달 열림 상태 전달
        onClose={() => setIsModalOpen(false)}  // 모달 닫기 핸들러 전달
      />
    </>
  );
};