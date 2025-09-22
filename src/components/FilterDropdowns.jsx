import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X, Filter } from 'lucide-react';
import { TRAVEL_TYPES, SEOUL_DISTRICTS } from './constants/filters.jsx';

export function FilterDropdowns({
  selectedTypes,
  onTypeToggle,
  selectedDistricts,
  onDistrictToggle,
  onClearFilters
}) {
  
  // 활성화된 필터 개수 계산
  const activeFilterCount = selectedTypes.length + selectedDistricts.length;
  
  return (
    <div className="space-y-4">
      {/* 필터 헤더 */}
      <div className="flex items-center justify-end">
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="h-8 px-2 text-xs hover:bg-muted/50"
          >
            <X className="h-3 w-3 mr-1" />
            초기화
          </Button>
        )}
      </div>

      {/* 필터 드롭다운들 */}
      <div className="flex flex-wrap gap-3">
        {/* 지역 필터 */}
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            지역 선택
          </label>
          <Select 
            value={selectedDistricts.length === 1 ? selectedDistricts[0] : ""} 
            onValueChange={(value) => {
              // 이미 선택된 경우 해제, 아니면 추가
              if (selectedDistricts.includes(value)) {
                onDistrictToggle(value);
              } else {
                // 기존 선택 모두 해제하고 새로 선택
                selectedDistricts.forEach(district => onDistrictToggle(district));
                onDistrictToggle(value);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="모든 지역" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-muted-foreground">
                모든 지역
              </SelectItem>
              {SEOUL_DISTRICTS.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 여행 테마 필터 */}
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            여행 테마
          </label>
          <Select 
            value={selectedTypes.length === 1 ? selectedTypes[0] : ""} 
            onValueChange={(value) => {
              if (value === "all") {
                // 모든 테마 선택 해제
                selectedTypes.forEach(type => onTypeToggle(type));
              } else {
                // 이미 선택된 경우 해제, 아니면 추가
                if (selectedTypes.includes(value)) {
                  onTypeToggle(value);
                } else {
                  // 기존 선택 모두 해제하고 새로 선택
                  selectedTypes.forEach(type => onTypeToggle(type));
                  onTypeToggle(value);
                }
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="모든 테마" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-muted-foreground">
                모든 테마
              </SelectItem>
              {TRAVEL_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 선택된 필터 태그들 */}
      {(selectedTypes.length > 0 || selectedDistricts.length > 0) && (
        <div className="space-y-2">
          {/* 선택된 지역들 */}
          {selectedDistricts.length > 0 && (
            <div>
              <span className="text-xs text-muted-foreground mb-1 block">선택된 지역:</span>
              <div className="flex flex-wrap gap-1">
                {selectedDistricts.map((district) => (
                  <Badge 
                    key={district} 
                    variant="secondary" 
                    className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    onClick={() => onDistrictToggle(district)}
                  >
                    {district}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* 선택된 테마들 */}
          {selectedTypes.length > 0 && (
            <div>
              <span className="text-xs text-muted-foreground mb-1 block">선택된 테마:</span>
              <div className="flex flex-wrap gap-1">
                {selectedTypes.map((type) => (
                  <Badge 
                    key={type} 
                    variant="secondary" 
                    className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    onClick={() => onTypeToggle(type)}
                  >
                    {type}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}