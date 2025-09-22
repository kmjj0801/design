import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind } from "lucide-react";
import filters from "./constants/filters.jsx"; 

// 샘플 날씨 데이터
const getSampleWeatherData = (district) => ({
  district,
  temperature: Math.floor(Math.random() * 15) + 10, // 10-25도
  condition: ["맑음", "흐림", "구름많음", "소나기"][Math.floor(Math.random() * 4)],
  humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
  windSpeed: Math.floor(Math.random() * 5) + 2, // 2-7m/s
  icon: "sunny",
  description: "오늘은 야외 활동하기 좋은 날씨입니다.",
  feelsLike: Math.floor(Math.random() * 15) + 12,
  uvIndex: Math.floor(Math.random() * 5) + 3
});

const getWeatherIcon = (condition) => {
  switch (condition) {
    case "맑음":
      return <Sun className="h-6 w-6 text-yellow-500" />;
    case "흐림":
      return <Cloud className="h-6 w-6 text-gray-500" />;
    case "구름많음":
      return <Cloud className="h-6 w-6 text-gray-400" />;
    case "소나기":
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    default:
      return <Sun className="h-6 w-6 text-yellow-500" />;
  }
};

/**
 * 날씨 위젯 컴포넌트
 * @param {Object} props
 * @param {string} props.selectedDistrict - 선택된 구
 * @param {Function} props.onDistrictChange - 구 변경 핸들러
 */
export function WeatherWidget({ selectedDistrict, onDistrictChange }) {
  const [weatherData] = useState(() => getSampleWeatherData(selectedDistrict));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          날씨 정보
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 지역 선택 */}
        <div>
          <label className="text-sm font-medium mb-2 block">지역 선택</label>
          <Select value={selectedDistrict} onValueChange={onDistrictChange}>
            <SelectTrigger>
              <SelectValue placeholder="구를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(filters).map((filter) => (
                <SelectItem key={filter} value={filter}>
                  {filter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 현재 날씨 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">{selectedDistrict}</h3>
              <p className="text-sm text-muted-foreground">{weatherData.description}</p>
            </div>
            {getWeatherIcon(weatherData.condition)}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-red-500" />
              <span>{weatherData.temperature}°C</span>
              <span className="text-muted-foreground">(체감 {weatherData.feelsLike}°C)</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span>습도 {weatherData.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <span>바람 {weatherData.windSpeed}m/s</span>
            </div>
            <div>
              <Badge variant="outline" className="text-xs">
                자외선 지수 {weatherData.uvIndex}
              </Badge>
            </div>
          </div>
        </div>

        {/* 여행 추천 */}
        <div className="text-sm">
          <h4 className="font-medium mb-2">오늘의 여행 추천</h4>
          <div className="space-y-1 text-muted-foreground">
            {weatherData.condition === "맑음" && (
              <>
                <p>• 야외 관광지 방문하기 좋은 날씨입니다</p>
                <p>• 한강공원이나 남산공원 추천</p>
              </>
            )}
            {weatherData.condition === "흐림" && (
              <>
                <p>• 실내 관광지를 추천합니다</p>
                <p>• 박물관이나 쇼핑몰 방문 추천</p>
              </>
            )}
            {weatherData.condition === "소나기" && (
              <>
                <p>• 우산을 준비하세요</p>
                <p>• 지하상가나 실내 명소 추천</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}