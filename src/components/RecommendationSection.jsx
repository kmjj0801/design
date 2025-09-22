import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ModernDestinationCard } from "./ModernDestinationCard";

/**
 * 추천 섹션 컴포넌트
 * @param {Object} props
 * @param {string} props.title - 섹션 제목
 * @param {string} props.subtitle - 섹션 부제목
 * @param {Array} props.recommendations - 추천 데이터 배열
 * @param {import('./types/destination.js').SeoulDestination[]} props.selectedDestinations - 선택된 여행지들
 * @param {Function} props.onSelect - 선택 핸들러
 * @param {Function} props.onDetail - 상세보기 핸들러
 * @param {React.ReactNode} props.icon - 아이콘
 * @param {string} props.color - 색상 클래스
 */
export function RecommendationSection({ 
  title, 
  subtitle, 
  recommendations, 
  selectedDestinations, 
  onSelect, 
  onDetail, 
  icon, 
  color 
}) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white`}>
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.destination.id} className="space-y-2">
              <ModernDestinationCard
                destination={rec.destination}
                onLike={onSelect}
                onSelect={onDetail}
                isSelected={selectedDestinations.some(d => d.id === rec.destination.id)}
                planMode={true}
              />
              {/* 추천 이유 */}
              <div className="text-xs text-muted-foreground px-2">
                <div className="font-medium text-blue-600 mb-1">
                  추천 점수: {rec.score}점
                </div>
                <ul className="space-y-1">
                  {rec.reasons.slice(0, 2).map((reason, index) => (
                    <li key={index} className="truncate">• {reason}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}