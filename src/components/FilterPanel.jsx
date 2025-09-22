import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { TRAVEL_TYPES, SEOUL_DISTRICTS } from "./constants/filters";

/**
 * 필터 패널 컴포넌트
 * @param {Object} props
 * @param {string[]} props.selectedTypes - 선택된 여행 타입들
 * @param {string[]} props.selectedDistricts - 선택된 행정구들
 * @param {Function} props.onTypeToggle - 타입 토글 핸들러
 * @param {Function} props.onDistrictToggle - 행정구 토글 핸들러
 * @param {Function} props.onClearAll - 전체 초기화 핸들러
 */
export function FilterPanel({ 
  selectedTypes, 
  selectedDistricts, 
  onTypeToggle, 
  onDistrictToggle, 
  onClearAll 
}) {
  const hasActiveFilters = selectedTypes.length > 0 || selectedDistricts.length > 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">필터</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearAll}>
              <X className="h-4 w-4 mr-1" />
              전체 해제
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 여행 테마 */}
        <div>
          <h3 className="font-medium mb-3">여행 테마</h3>
          <div className="flex flex-wrap gap-2">
            {TRAVEL_TYPES.map((type) => (
              <Badge
                key={type}
                variant={selectedTypes.includes(type) ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => onTypeToggle(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* 행정구 */}
        <div>
          <h3 className="font-medium mb-3">행정구</h3>
          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
            {SEOUL_DISTRICTS.map((district) => (
              <Badge
                key={district}
                variant={selectedDistricts.includes(district) ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 transition-transform justify-center"
                onClick={() => onDistrictToggle(district)}
              >
                {district}
              </Badge>
            ))}
          </div>
        </div>

        {/* 활성 필터 요약 */}
        {hasActiveFilters && (
          <div className="pt-3 border-t">
            <h4 className="font-medium text-sm mb-2">적용된 필터</h4>
            <div className="text-xs text-muted-foreground">
              {selectedTypes.length > 0 && (
                <p>테마: {selectedTypes.join(", ")}</p>
              )}
              {selectedDistricts.length > 0 && (
                <p>지역: {selectedDistricts.join(", ")}</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}