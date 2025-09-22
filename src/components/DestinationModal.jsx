import React from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { MapPin, Clock, Phone, Globe, Car, Star, Navigation } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { X, Check } from "lucide-react";


/**
 * 여행지 상세보기 모달 컴포넌트
 * @param {Object} props
 * @param {import('./types/destination.js').SeoulDestination|null} props.destination - 여행지 정보
 * @param {boolean} props.isOpen - 모달 열림 상태
 * @param {Function} props.onClose - 모달 닫기 핸들러
 */
export function DestinationModal({ destination, isOpen, onClose }) {
  if (!destination) return null;

  const handleKakaoMap = () => {
    // 카카오맵으로 길찾기
    const url = `https://map.kakao.com/link/to/${destination.name},${destination.coordinates.lat},${destination.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{destination.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 이미지 */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">기본 정보</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{destination.address || destination.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{destination.operatingHours || "운영시간 정보 없음"}</span>
                </div>
                {destination.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{destination.phone}</span>
                  </div>
                )}
                {destination.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href={destination.website} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline">
                      공식 웹사이트
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span>{destination.parking || "주차 정보 없음"}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">여행 정보</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{destination.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({destination.reviewCount || 0}개 리뷰)
                  </span>
                </div>
                <div>
                  <span className="font-medium">예상 소요시간: </span>
                  <span>{destination.visitDuration}</span>
                </div>
                <div>
                  <span className="font-medium">예상 비용: </span>
                  <span>{destination.estimatedCost}만원 / 1인</span>
                </div>
                {destination.admissionFee && (
                  <div>
                    <span className="font-medium">입장료: </span>
                    <span>{destination.admissionFee}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 설명 */}
          <div>
            <h3 className="font-semibold mb-3">소개</h3>
            <p className="text-sm leading-relaxed">{destination.description}</p>
          </div>

          {/* 태그 */}
          <div>
            <h3 className="font-semibold mb-3">태그</h3>
            <div className="flex flex-wrap gap-2">
              {destination.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* 교통정보 */}
          {destination.subway && (
            <div>
              <h3 className="font-semibold mb-3">교통정보</h3>
              <p className="text-sm">🚇 {destination.subway}</p>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleKakaoMap} className="flex-1">
              <Navigation className="h-4 w-4 mr-2" />
              길찾기
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              닫기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}