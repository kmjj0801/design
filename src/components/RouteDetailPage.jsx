import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, MapPin, Clock, DollarSign, Users } from "lucide-react";

export function RouteDetailPage() {
  const { routeId } = useParams();
  const navigate = useNavigate();

  // Mock route data - in a real app this would come from an API or state
  const routeData = {
    id: routeId,
    title: "서울 역사 탐방 여행",
    description: "조선왕조의 역사와 전통문화를 체험할 수 있는 여행 코스입니다.",
    totalCost: 8,
    totalDuration: "6-8시간",
    participants: 1,
    destinations: [
      {
        id: "1",
        name: "경복궁",
        district: "종로구",
        description: "조선 왕조의 대표 궁궐",
        cost: 2,
        duration: "2-3시간",
        order: 1
      },
      {
        id: "2", 
        name: "북촌한옥마을",
        district: "종로구",
        description: "전통 한옥의 아름다움을 감상",
        cost: 1,
        duration: "1-2시간",
        order: 2
      },
      {
        id: "3",
        name: "인사동",
        district: "종로구", 
        description: "전통 문화거리와 공예품",
        cost: 4,
        duration: "2-3시간",
        order: 3
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">여행 경로 상세</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Route Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{routeData.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{routeData.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-600">{routeData.totalCost}만원</div>
                <div className="text-sm text-muted-foreground">총 예상 비용</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Clock className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-600">{routeData.totalDuration}</div>
                <div className="text-sm text-muted-foreground">총 소요 시간</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <MapPin className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-600">{routeData.destinations.length}곳</div>
                <div className="text-sm text-muted-foreground">방문 장소</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Users className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-600">{routeData.participants}명</div>
                <div className="text-sm text-muted-foreground">참여 인원</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              여행 경로
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {routeData.destinations.map((destination, index) => (
                <div key={destination.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {destination.order}
                    </div>
                    {index < routeData.destinations.length - 1 && (
                      <div className="w-0.5 h-16 bg-border mt-2"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 pb-8">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{destination.name}</h3>
                        <p className="text-muted-foreground text-sm">{destination.district}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{destination.cost}만원</Badge>
                        <Badge variant="outline">{destination.duration}</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{destination.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}