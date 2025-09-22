import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Heart, Check, ArrowLeft, ArrowRight, Sparkles, Target, Compass, Map } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { WeatherWidget } from "./WeatherWidget";
import { ModernDestinationGrid } from "./ModernDestinationGrid";
import { DestinationModal } from "./DestinationModal";
import { RecommendationSection } from "./RecommendationSection";
import { filterDestinations } from "./utils/filters";
import { getRecommendedDestinations, categorizeRecommendations } from "./utils/recommendation";
import { seoulDestinationsData } from "./data/seoulDestinations";
import { TRAVEL_TYPES, SEOUL_DISTRICTS } from "./constants/filters";
import { useFavorites } from "./contexts/FavoritesContext";
import { toast } from "sonner@2.0.3";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * 여행 계획 만들기 페이지
 * 단계별로 날짜, 테마, 지역을 선택하고 AI ���천을 받아 여행 계획을 생성
 */
export const TravelPlanPage = () => {
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  
  // 단계 관리 (1: 날짜선택, 2: 테마선택, 3: 지역선택, 4: 여행지선택, 5: 계획완성)
  const [currentStep, setCurrentStep] = useState(1);
  
  // 여행 계획 데이터
  const [travelPlan, setTravelPlan] = useState({
    startDate: undefined,
    endDate: undefined,
    themes: [],
    districts: [],
    selectedDestinations: []
  });

  // 모달 상태
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 날씨 위젯 상태
  const [selectedWeatherDistrict, setSelectedWeatherDistrict] = useState("강남구");

  // 필터링된 여행지 목록
  const filteredDestinations = useMemo(() => {
    return filterDestinations(
      seoulDestinationsData,
      "",
      travelPlan.themes,
      travelPlan.districts
    );
  }, [travelPlan.themes, travelPlan.districts]);

  // 추천 시스템
  const recommendations = useMemo(() => {
    const preferences = {
      themes: travelPlan.themes,
      districts: travelPlan.districts,
      startDate: travelPlan.startDate,
      endDate: travelPlan.endDate
    };
    
    const recommended = getRecommendedDestinations(seoulDestinationsData, preferences, 12);
    return categorizeRecommendations(recommended);
  }, [travelPlan.themes, travelPlan.districts, travelPlan.startDate, travelPlan.endDate]);

  // 테마 토글
  const toggleTheme = (theme) => {
    setTravelPlan(prev => ({
      ...prev,
      themes: prev.themes.includes(theme)
        ? prev.themes.filter(t => t !== theme)
        : [...prev.themes, theme]
    }));
  };

  // 지역 토글
  const toggleDistrict = (district) => {
    setTravelPlan(prev => ({
      ...prev,
      districts: prev.districts.includes(district)
        ? prev.districts.filter(d => d !== district)
        : [...prev.districts, district]
    }));
  };

  // 여행지 찜하기 (실제 찜 기능)
  const handleDestinationLike = (destinationId) => {
    const destination = seoulDestinationsData.find(d => d.id === destinationId);
    if (destination) {
      if (favorites.some(f => f.id === destinationId)) {
        removeFromFavorites(destinationId);
        toast.success("찜목록에서 제거되었습니다.");
      } else {
        addToFavorites(destination);
        toast.success("찜목록에 추가되었습니다!");
      }
    }
  };

  // 여행지 선택/해제 (여행 계획용)
  const handleDestinationSelect = (destination) => {
    if (travelPlan.selectedDestinations.find(d => d.id === destination.id)) {
      // 이미 선택된 경우 제거
      setTravelPlan(prev => ({
        ...prev,
        selectedDestinations: prev.selectedDestinations.filter(d => d.id !== destination.id)
      }));
      toast.success("여행지가 제거되었습니다.");
    } else {
      // 새로 선택
      setTravelPlan(prev => ({
        ...prev,
        selectedDestinations: [...prev.selectedDestinations, destination]
      }));
      toast.success("여행지가 추가되었습니다.");
    }
  };

  // 여행지 상세보기
  const handleDestinationDetail = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  // 다음 단계
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 이전 단계
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 계획 저장
  const savePlan = () => {
    toast.success("여행 계획이 저장되었습니다!");
    navigate("/");
  };

  // 단계별 제목
  const stepTitles = {
    1: "여행 날짜를 선택해주세요",
    2: "어떤 테마의 여행을 원하시나요?",
    3: "관심 있는 지역을 선택해주세요",
    4: "AI가 추천하는 맞춤형 여행지",
    5: "여행 계획이 완성되었습니다!"
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">출발일</CardTitle>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {travelPlan.startDate
                          ? format(travelPlan.startDate, "yyyy년 MM월 dd일", { locale: ko })
                          : "날짜 선택"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={travelPlan.startDate}
                        onSelect={(date) => setTravelPlan(prev => ({ ...prev, startDate: date }))}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">종료일</CardTitle>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {travelPlan.endDate
                          ? format(travelPlan.endDate, "yyyy년 MM월 dd일", { locale: ko })
                          : "날짜 선택"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={travelPlan.endDate}
                        onSelect={(date) => setTravelPlan(prev => ({ ...prev, endDate: date }))}
                        disabled={(date) => date < (travelPlan.startDate || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
            </div>

            {travelPlan.startDate && (
              <WeatherWidget
                selectedDistrict={selectedWeatherDistrict}
                onDistrictChange={setSelectedWeatherDistrict}
              />
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {TRAVEL_TYPES.map((theme) => (
                <Card
                  key={theme}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    travelPlan.themes.includes(theme)
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => toggleTheme(theme)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {travelPlan.themes.includes(theme) && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                      <span className="font-medium">{theme}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {travelPlan.themes.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  선택된 테마: {travelPlan.themes.join(", ")}
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-5">
              {SEOUL_DISTRICTS.map((district) => (
                <Badge
                  key={district}
                  variant={travelPlan.districts.includes(district) ? "default" : "outline"}
                  className="cursor-pointer p-2 justify-center hover:scale-105 transition-transform"
                  onClick={() => toggleDistrict(district)}
                >
                  {travelPlan.districts.includes(district) && (
                    <Check className="mr-1 h-3 w-3" />
                  )}
                  {district}
                </Badge>
              ))}
            </div>
            {travelPlan.districts.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  선택된 지역: {travelPlan.districts.join(", ")}
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* 선택된 여행지 요약 */}
            {travelPlan.selectedDestinations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-red-500" />
                    선택된 여행지 ({travelPlan.selectedDestinations.length}개)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {travelPlan.selectedDestinations.map((destination) => (
                      <Badge key={destination.id} variant="secondary" className="p-2">
                        <MapPin className="mr-1 h-3 w-3" />
                        {destination.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI 추천 설명 */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">맞춤형 AI 추천</h3>
                    <p className="text-sm text-gray-600">
                      선택하신 {travelPlan.themes.join(", ")} 테마와 {travelPlan.districts.join(", ")} 지역을 바탕으로 
                      가장 적합한 여행지를 추천해드립니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 추천 카테고리별 섹션 */}
            <div className="space-y-6">
              <RecommendationSection
                title="최고 추천 여행지"
                subtitle="종합 점수가 가장 높은 여행지들입니다"
                recommendations={recommendations.topPicks}
                selectedDestinations={travelPlan.selectedDestinations}
                onSelect={handleDestinationSelect}
                onDetail={handleDestinationDetail}
                icon={<Target className="w-5 h-5" />}
                color="bg-gradient-to-r from-purple-500 to-purple-600"
              />

              {recommendations.themeMatches.length > 0 && (
                <RecommendationSection
                  title="테마 맞춤 추천"
                  subtitle="선택하신 관심 테마와 완벽하게 일치하는 여행지들입니다"
                  recommendations={recommendations.themeMatches}
                  selectedDestinations={travelPlan.selectedDestinations}
                  onSelect={handleDestinationSelect}
                  onDetail={handleDestinationDetail}
                  icon={<Compass className="w-5 h-5" />}
                  color="bg-gradient-to-r from-green-500 to-green-600"
                />
              )}

              {recommendations.nearbyOptions.length > 0 && (
                <RecommendationSection
                  title="지역 기반 추천"
                  subtitle="선택하신 관심 지역의 인기 여행지들입니다"
                  recommendations={recommendations.nearbyOptions}
                  selectedDestinations={travelPlan.selectedDestinations}
                  onSelect={handleDestinationSelect}
                  onDetail={handleDestinationDetail}
                  icon={<Map className="w-5 h-5" />}
                  color="bg-gradient-to-r from-blue-500 to-blue-600"
                />
              )}
            </div>

            {/* 추천 여행지가 없을 때의 대체 표시 */}
            {recommendations.topPicks.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">추천 여행지 준비 중</h3>
                  <p className="text-muted-foreground mb-4">
                    선택하신 조건에 맞는 여행지를 찾고 있습니다.
                  </p>
                  <ModernDestinationGrid
                    destinations={filteredDestinations}
                    onLike={handleDestinationSelect}
                    onSelect={handleDestinationDetail}
                    selectedDestinations={travelPlan.selectedDestinations}
                    planMode={true}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Sparkles className="mr-2 h-6 w-6 text-yellow-500" />
                  여행 계획 요약
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">여행 기간</h4>
                  <p className="text-muted-foreground">
                    {travelPlan.startDate && format(travelPlan.startDate, "yyyy년 MM월 dd일", { locale: ko })}
                    {travelPlan.endDate && ` ~ ${format(travelPlan.endDate, "yyyy년 MM월 dd일", { locale: ko })}`}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">선택한 테마</h4>
                  <div className="flex flex-wrap gap-2">
                    {travelPlan.themes.map((theme) => (
                      <Badge key={theme} variant="secondary">{theme}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">관심 지역</h4>
                  <div className="flex flex-wrap gap-2">
                    {travelPlan.districts.map((district) => (
                      <Badge key={district} variant="outline">{district}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">선택한 여행지 ({travelPlan.selectedDestinations.length}개)</h4>
                  <div className="grid gap-2">
                    {travelPlan.selectedDestinations.map((destination) => (
                      <div key={destination.id} className="flex items-center p-3 border rounded-lg">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{destination.name}</p>
                          <p className="text-sm text-muted-foreground">{destination.district}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                홈으로
              </Button>
              <h1 className="text-xl font-bold">여행 계획 만들기</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              단계 {currentStep} / 5
            </div>
          </div>
        </div>
      </header>

      {/* 진행 표시바 */}
      <div className="bg-card border-b">
        <div className="mx-auto max-w-7xl px-4 py-2">
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full ${
                  step <= currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{stepTitles[currentStep]}</h2>
            <p className="text-muted-foreground">
              {currentStep === 1 && "언제 여행을 떠나실 예정인가요?"}
              {currentStep === 2 && "다양한 테마 중에서 선택해보세요."}
              {currentStep === 3 && "서울의 어느 지역에 관심이 있으신가요?"}
              {currentStep === 4 && "입력하신 정보를 바탕으로 AI가 엄선한 여행지를 확인해보세요."}
              {currentStep === 5 && "완성된 계획을 확인하고 저장하세요."}
            </p>
          </div>

          {renderStepContent()}

          {/* 네비게이션 버튼 */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              이전
            </Button>

            {currentStep < 5 ? (
              <Button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !travelPlan.startDate) ||
                  (currentStep === 2 && travelPlan.themes.length === 0) ||
                  (currentStep === 3 && travelPlan.districts.length === 0)
                }
              >
                다음
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={savePlan}>
                <Heart className="mr-2 h-4 w-4" />
                계획 저장하기
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* 여행지 상세보기 모달 */}
      <DestinationModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};