import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Filter, Hash, MapPin } from "lucide-react";
import { TRAVEL_TYPES, SEOUL_DISTRICTS } from "./constants/filters";

export function ModernFilterPanel({
  selectedTypes,
  onTypeToggle,
  selectedDistricts,
  onDistrictToggle
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-border/60 shadow-sm rounded-2xl lg:rounded-3xl overflow-hidden bg-white">
      <CardHeader className="pb-3 lg:pb-4 p-4 lg:p-6">
        <CardTitle className="flex items-center gap-2 text-base lg:text-lg font-semibold">
          <Filter className="h-4 w-4 lg:h-5 lg:w-5" />
          필터
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 lg:space-y-6 p-4 lg:p-6 pt-0">
        {/* Travel Types */}
        <div className="space-y-2 lg:space-y-3">
          <div className="flex items-center gap-2">
            <Hash className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-muted-foreground" />
            <label className="text-xs lg:text-sm font-medium">여행 테마</label>
          </div>
          <div className="flex flex-wrap gap-1.5 lg:gap-2">
            {TRAVEL_TYPES.slice(0, isExpanded ? TRAVEL_TYPES.length : 6).map((type) => (
              <Badge
                key={type}
                variant={selectedTypes.includes(type) ? "default" : "outline"}
                className={`cursor-pointer transition-all hover:scale-105 rounded-lg lg:rounded-xl px-2 lg:px-3 py-1 text-xs lg:text-sm ${
                  selectedTypes.includes(type)
                    ? "bg-black text-white hover:bg-gray-800"
                    : "border-border/60 hover:border-black/20 hover:bg-muted/50"
                }`}
                onClick={() => onTypeToggle(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
          {TRAVEL_TYPES.length > 6 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs lg:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isExpanded ? "접기" : `${TRAVEL_TYPES.length - 6}개 더 보기`}
            </button>
          )}
        </div>

        <Separator className="bg-border/60" />

        {/* Districts */}
        <div className="space-y-2 lg:space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-muted-foreground" />
            <label className="text-xs lg:text-sm font-medium">지역</label>
          </div>
          <div className="grid grid-cols-2 gap-1.5 lg:gap-2 max-h-32 lg:max-h-40 overflow-y-auto">
            {SEOUL_DISTRICTS.map((district) => (
              <Badge
                key={district}
                variant={selectedDistricts.includes(district) ? "default" : "outline"}
                className={`cursor-pointer transition-all hover:scale-105 rounded-lg lg:rounded-xl px-2 lg:px-3 py-1 lg:py-1.5 text-center justify-center text-xs lg:text-sm ${
                  selectedDistricts.includes(district)
                    ? "bg-black text-white hover:bg-gray-800"
                    : "border-border/60 hover:border-black/20 hover:bg-muted/50"
                }`}
                onClick={() => onDistrictToggle(district)}
              >
                {district}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedTypes.length > 0 || selectedDistricts.length > 0) && (
          <>
            <Separator className="bg-border/60" />
            <button
              onClick={() => {
                selectedTypes.forEach(onTypeToggle);
                selectedDistricts.forEach(onDistrictToggle);
              }}
              className="w-full text-xs lg:text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              모든 필터 초기화
            </button>
          </>
        )}
      </CardContent>
    </Card>
  );
}