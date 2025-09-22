import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPinIcon, TagIcon, StarIcon, ClockIcon } from "./TravelIcons";
import { Heart, Plus, DollarSign } from "lucide-react";

/**
 * 여행지 카드 컴포넌트
 * @param {Object} props
 * @param {import('./types/destination.js').SeoulDestination} props.destination - 여행지 정보
 * @param {Function} props.onLike - 찜하기 핸들러
 * @param {Function} props.onSelect - 선택 핸들러
 * @param {Function} [props.onAddToRoute] - 경로 추가 핸들러 (옵션)
 */
export function DestinationCard({ destination, onLike, onSelect, onAddToRoute }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-md">
      <div className="relative">
        <ImageWithFallback
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 p-2 rounded-full ${
            destination.isLiked 
              ? "bg-red-500 text-white hover:bg-red-600" 
              : "bg-white/80 text-gray-600 hover:bg-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onLike(destination.id);
          }}
        >
          <Heart className={`h-4 w-4 ${destination.isLiked ? "fill-current" : ""}`} />
        </Button>
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            {destination.visitDuration}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4" onClick={() => onSelect(destination)}>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg text-[#151515]">{destination.name}</h3>
            <div className="flex items-center gap-1 text-sm text-[#424242]">
              <MapPinIcon className="h-3 w-3 text-[#6050B3]" />
              <span>{destination.district}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <StarIcon className="h-4 w-4 fill-[#6050B3] text-[#6050B3]" />
              <span className="font-medium text-[#151515]">{destination.rating}</span>
              <span className="text-sm text-[#424242]">({destination.reviewCount})</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#424242] mb-2 line-clamp-2">
          {destination.description}
        </p>

        <div className="text-xs text-[#424242] mb-3">
          🚇 {destination.subway}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {destination.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-[#6050B3] text-[#6050B3]">
              {tag}
            </Badge>
          ))}
          {destination.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-[#6050B3] text-[#6050B3]">
              +{destination.tags.length - 3}개
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-[#6050B3]" />
            <span className="font-medium text-[#151515]">{destination.estimatedCost}만원</span>
            <span className="text-sm text-[#424242]">/ 1인</span>
          </div>
          <div className="flex gap-2">
            {onAddToRoute && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToRoute(destination);
                }}
                className="border-[#6050B3] text-[#6050B3] hover:bg-[#6050B3] hover:text-white"
              >
                경로추가
              </Button>
            )}
            <Button 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onSelect(destination);
              }}
              className="bg-[#6050B3] hover:bg-[#5041A3] text-white"
            >
              상세보기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}