import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, MapPin, Star, Clock, Check } from "lucide-react";

/**
 * 모던 스타일의 여행지 카드 컴포넌트
 * @param {Object} props
 * @param {import('./types/destination.js').SeoulDestination} props.destination - 여행지 정보
 * @param {Function} props.onLike - 찜하기 핸들러
 * @param {Function} props.onSelect - 선택 핸들러
 * @param {boolean} [props.isSelected=false] - 선택된 상태
 * @param {boolean} [props.planMode=false] - 계획 모드 여부
 */
export function ModernDestinationCard({ 
  destination, 
  onLike, 
  onSelect, 
  isSelected = false,
  planMode = false 
}) {
  return (
    <Card 
      className={`overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group ${
        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
      }`}
      onClick={() => onSelect(destination)}
    >
      <div className="relative">
        <ImageWithFallback
          src={destination.image}
          alt={destination.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* 선택 표시 */}
        {planMode && isSelected && (
          <div className="absolute top-2 left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}

        {/* 찜하기 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 p-1.5 rounded-full ${
            destination.isLiked 
              ? "bg-red-500 text-white hover:bg-red-600" 
              : "bg-white/80 text-gray-600 hover:bg-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onLike(destination.id);
          }}
        >
          <Heart className={`h-3 w-3 ${destination.isLiked ? "fill-current" : ""}`} />
        </Button>

        {/* 소요시간 배지 */}
        <div className="absolute bottom-2 left-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {destination.visitDuration}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{destination.name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{destination.district}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{destination.rating}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
          {destination.description}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-1 mb-2">
          {destination.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0.5">
              {tag}
            </Badge>
          ))}
          {destination.tags.length > 2 && (
            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
              +{destination.tags.length - 2}
            </Badge>
          )}
        </div>

        {/* 예산 정보 */}
        <div className="text-xs text-muted-foreground">
          예상 비용: {destination.estimatedCost}만원/인
        </div>
      </CardContent>
    </Card>
  );
}