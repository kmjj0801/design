import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Thermometer, Droplets, CloudRain } from 'lucide-react';
import { useHourlyWeather, getUmbrellaRecommendation } from './hooks/useWeather';
import { getWeatherIcon } from './data/weatherData';

// 개별 시간별 날씨 아이템 컴포넌트
function HourlyWeatherItem({ hourlyData, isNow = false }) {
  return (
    <div className={`flex flex-col items-center p-3 min-w-[80px] rounded-lg transition-colors ${
      isNow ? 'bg-blue-50 border border-blue-200' : 'hover:bg-muted/30'
    }`}>
      {/* 시간 */}
      <div className={`text-xs font-medium mb-2 ${isNow ? 'text-blue-600' : 'text-muted-foreground'}`}>
        {isNow ? '지금' : hourlyData.time}
      </div>

      {/* 날씨 아이콘 */}
      <div className="text-2xl mb-2">
        {getWeatherIcon(hourlyData.condition)}
      </div>

      {/* 온도 */}
      <div className={`font-semibold mb-1 ${isNow ? 'text-blue-600' : 'text-foreground'}`}>
        {hourlyData.temperature}°
      </div>

      {/* 강수 확률 */}
      {hourlyData.precipitation > 0 && (
        <div className="flex items-center gap-1 text-xs text-blue-500">
          <CloudRain className="h-3 w-3" />
          <span>{hourlyData.precipitation}%</span>
        </div>
      )}

      {/* 습도 */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
        <Droplets className="h-3 w-3" />
        <span>{hourlyData.humidity}%</span>
      </div>
    </div>
  );
}

export function HourlyWeatherChart({ className = "" }) {
  const { hourlyForecast, isLoading, error } = useHourlyWeather();

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-sm text-muted-foreground">시간별 예보를 불러오는 중...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || hourlyForecast.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <CloudRain className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">시간별 예보를 불러올 수 없습니다</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 현재 시간과 가장 가까운 예보 찾기
  const now = new Date();
  const currentHourIndex = hourlyForecast.findIndex((forecast, index) => {
    const forecastTime = new Date(forecast.timestamp);
    return forecastTime.getHours() === now.getHours();
  });

  // 최고/최저 온도 계산
  const temperatures = hourlyForecast.map(h => h.temperature);
  const maxTemp = Math.max(...temperatures);
  const minTemp = Math.min(...temperatures);

  // 평균 강수 확률 계산
  const avgPrecipitation = Math.round(
    hourlyForecast.reduce((sum, h) => sum + h.precipitation, 0) / hourlyForecast.length
  );

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">24시간 예보</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Thermometer className="h-3 w-3 mr-1" />
              {minTemp}° ~ {maxTemp}°
            </Badge>
          </div>
        </div>

        {/* 요약 정보 */}
        <div className="text-sm text-muted-foreground">
          {getUmbrellaRecommendation(avgPrecipitation)}
        </div>
      </CardHeader>

      <CardContent className="px-0 pb-6">
        {/* 가로 스크롤 가능한 시간별 예보 */}
        <ScrollArea className="w-full">
          <div className="flex gap-2 px-6 pb-2">
            {hourlyForecast.map((hourData, index) => (
              <HourlyWeatherItem
                key={hourData.timestamp}
                hourlyData={hourData}
                isNow={index === currentHourIndex}
              />
            ))}
          </div>
        </ScrollArea>

        {/* 상세 통계 */}
        <div className="px-6 pt-4 border-t border-border/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-blue-600">{maxTemp}°</div>
              <div className="text-xs text-muted-foreground">최고</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-400">{minTemp}°</div>
              <div className="text-xs text-muted-foreground">최저</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-500">{avgPrecipitation}%</div>
              <div className="text-xs text-muted-foreground">평균 강수</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}