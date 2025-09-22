import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Settings, 
  LogOut,
  Plane,
  Heart,
  Share2,
  Home,
  ArrowLeft,
  Star,
  Trash2
} from "lucide-react";
import { useFavorites } from "./contexts/FavoritesContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

// 여행 계획 목록 - 샘플 데이터
const mockTravelPlans = [
  {
    id: "1",
    title: "서울 역사 탐방",
    date: "2024-02-15",
    destinations: ["경복궁", "북촌한옥마을", "인사동"],
    status: "upcoming",                    // 예정된 여행
    participants: 1,                      // 참여자 수
    isShared: false                       // 공유 여부
  },
  {
    id: "2",
    title: "친구들과 홍대 나들이",
    date: "2024-01-20",
    destinations: ["홍대거리", "한강공원"],
    status: "past",                       // 완료된 여행
    participants: 1,                      // 그룹 기능 제거하므로 1명으로 변경
    isShared: false                       // 그룹 기능 제거하므로 false로 변경
  },
  {
    id: "3",
    title: "데이트 코스",
    date: "2024-01-10",
    destinations: ["남산타워", "명동거리"],
    status: "past",
    participants: 1,                      // 그룹 기능 제거하므로 1명으로 변경
    isShared: false
  }
];

/**
 * 마이페이지 컴포넌트
 * 사용자 프로필, 여행 계획, 찜목록 등을 관리
 */
export function MyPage() {
  // 페이지 이동을 위한 hook
  const navigate = useNavigate();
  // 찜목록 관리 hook
  const { favorites, removeFromFavorites } = useFavorites();
  // 사용자 정보 - 실제 앱에서는 API나 인증에서 가져옴
  const [user] = useState({
    name: "홍길동",
    email: "hong@email.com",
    joinDate: "2023.12.01"
  });

  // 예정된 여행과 완료된 여행 분리
  const upcomingTrips = mockTravelPlans.filter(plan => plan.status === "upcoming");
  const pastTrips = mockTravelPlans.filter(plan => plan.status === "past");

  // 여행 공유하기 핸들러
  const handleShareTrip = (tripId) => {
    toast.success("여행 계획이 공유되었습니다!");
  };

  // 홈으로 돌아가기 핸들러
  const handleBackToHome = () => {
    navigate("/");
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    // 실제 앱에서는 인증 토큰 등을 삭제
    navigate("/login");
    toast.success("로그아웃되었습니다.");
  };

  // 찜목록에서 제거 핸들러
  const handleRemoveFromFavorites = (id) => {
    removeFromFavorites(id);
    toast.success("찜목록에서 제거되었습니다.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 - 상단 고정 */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* 뒤로가기 버튼 */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToHome}
                className="rounded-full"
                aria-label="홈으로 돌아가기"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold">마이페이지</h1>
            </div>
            {/* 우측 버튼들 */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBackToHome}
                className="hidden sm:flex items-center gap-2 rounded-xl"
              >
                <Home className="h-4 w-4" />
                홈으로
              </Button>
              <Button variant="ghost" size="icon" aria-label="설정">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="로그아웃">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 사용자 프로필 카드 */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {/* 프로필 아바타 */}
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {/* 사용자 정보 */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
                <p className="text-muted-foreground text-sm mb-2">{user.email}</p>
                <p className="text-xs text-muted-foreground">가입일: {user.joinDate}</p>
              </div>
              {/* 여행 통계 */}
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {pastTrips.length}
                </div>
                <div className="text-sm text-muted-foreground">완료한 여행</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 탭 메뉴 */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          {/* 탭 리스트 */}
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">다가오는 여행</TabsTrigger>
            <TabsTrigger value="favorites">찜목록</TabsTrigger>
            <TabsTrigger value="past">지난 여행</TabsTrigger>
          </TabsList>

          {/* 다가오는 여행 탭 */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingTrips.length === 0 ? (
              // 예정된 여행이 없을 때
              <Card>
                <CardContent className="py-12 text-center">
                  <Plane className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">계획된 여행이 없습니다</h3>
                  <p className="text-muted-foreground mb-4">
                    새로운 서울 여행을 계획해보세요!
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    onClick={handleBackToHome}
                  >
                    여행 계획하기
                  </Button>
                </CardContent>
              </Card>
            ) : (
              // 예정된 여행 목록
              upcomingTrips.map((trip) => (
                <Card key={trip.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{trip.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {trip.date}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">예정</Badge>
                    </div>
                    
                    {/* 여행지 목록 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trip.destinations.map((dest, index) => (
                        <Badge key={index} variant="outline">
                          {dest}
                        </Badge>
                      ))}
                    </div>

                    {/* 액션 버튼들 */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        수정하기
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShareTrip(trip.id)}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        공유하기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* 찜목록 탭 */}
          <TabsContent value="favorites" className="space-y-4">
            {favorites.length === 0 ? (
              // 찜한 여행지가 없을 때
              <Card>
                <CardContent className="py-12 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">찜한 여행지가 없습니다</h3>
                  <p className="text-muted-foreground mb-4">
                    마음에 드는 여행지를 찜해보세요!
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    onClick={handleBackToHome}
                  >
                    여행지 둘러보기
                  </Button>
                </CardContent>
              </Card>
            ) : (
              // 찜한 여행지 목록 - 그리드 레이아웃
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map((destination) => (
                  <Card key={destination.id} className="overflow-hidden">
                    {/* 여행지 이미지 */}
                    <div className="relative h-40">
                      <ImageWithFallback
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                      {/* 이미지 오버레이 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {/* 삭제 버튼 */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30"
                        onClick={() => handleRemoveFromFavorites(destination.id)}
                        aria-label="찜목록에서 제거"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {/* 여행지 정보 */}
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <h3 className="font-semibold text-base mb-1 truncate">{destination.name}</h3>
                        
                        {/* 정보 바 - 행정구, 별점, 소요시간 */}
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{destination.district}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-amber-600">
                            <Star className="h-3 w-3 fill-current flex-shrink-0" />
                            <span className="font-medium">{destination.rating}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-blue-600">
                            <Clock className="h-3 w-3 flex-shrink-0" />
                            <span className="whitespace-nowrap">{destination.visitDuration}</span>
                          </div>
                        </div>
                      </div>

                      {/* 설명 */}
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                        {destination.description}
                      </p>

                      {/* 액션 버튼들 */}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={handleBackToHome}
                        >
                          자세히 보기
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* 지난 여행 탭 */}
          <TabsContent value="past" className="space-y-4">
            {pastTrips.map((trip) => (
              <Card key={trip.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{trip.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {trip.date}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">완료</Badge>
                  </div>
                  
                  {/* 여행지 목록 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trip.destinations.map((dest, index) => (
                      <Badge key={index} variant="outline">
                        {dest}
                      </Badge>
                    ))}
                  </div>

                  {/* 액션 버튼들 */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      다시 계획하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}