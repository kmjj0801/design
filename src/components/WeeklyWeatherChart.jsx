import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Sunrise, Sunset, Sun, Droplets, Wind, CloudRain } from 'lucide-react';
import { useDailyWeather, getUVRecommendation } from './hooks/useWeather';
import { getWeatherIcon } from './data/weatherData';


// 개별 일별 날씨 아이템 컴포넌트
function DailyWeatherItem({ dailyData, isToday = false }) {
  return (
    <div className={`p-4 rounded-lg border transition-colors ${
      isToday ? 'bg-blue-50 border-blue-200' : 'bg-muted/20 border-border/50 hover:bg-muted/30'
    }`}>
      {/* 상단: 날짜와 요일 */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className={`font-medium ${isToday ? 'text-blue-600' : 'text-foreground'}`}>
            {dailyData.dayOfWeek}
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date(dailyData.date).toLocaleDateString('ko-KR', {
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* 날씨 아이콘 */}
        <div className="text-3xl">
          {getWeatherIcon(dailyData.condition)}
        </div>
      </div>

      {/* 온도 정보 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">{dailyData.tempMax}°</span>
          <span className="text-muted-foreground">{dailyData.tempMin}°</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {dailyData.condition}
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="space-y-2">
        {/* 강수 확률 */}
        {dailyData.precipitation > 0 && (
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-blue-500">
              <CloudRain className="h-3 w-3" />
              <span>강수</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={dailyData.precipitation} className="w-12 h-1" />
              <span className="text-muted-foreground">{dailyData.precipitation}%</span>
            </div>
          </div>
        )}

        {/* 습도 */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-blue-400">
            <Droplets className="h-3 w-3" />
            <span>습도</span>
          </div>
          <span className="text-muted-foreground">{dailyData.humidity}%</span>
        </div>

        {/* 풍속 */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-gray-500">
            <Wind className="h-3 w-3" />
            <span>바람</span>
          </div>
          <span className="text-muted-foreground">{dailyData.windSpeed}m/s</span>
        </div>

        {/* UV 지수 */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-orange-500">
            <Sun className="h-3 w-3" />
            <span>UV</span>
          </div>
          <span className="text-muted-foreground">{dailyData.uvIndex}</span>
        </div>
      </div>

      {/* 일출/일몰 정보 */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/30">
        <div className="flex items-center gap-1 text-xs text-orange-400">
          <Sunrise className="h-3 w-3" />
          <span>{dailyData.sunrise}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-orange-600">
          <Sunset className="h-3 w-3" />
          <span>{dailyData.sunset}</span>
        </div>
      </div>
    </div>
  );
}

export function WeeklyWeatherChart({ className = "" }) {
  const { dailyForecast, isLoading, error } = useDailyWeather();

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-sm text-muted-foreground">주간 예보를 불러오는 중...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || dailyForecast.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <CloudRain className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">주간 예보를 불러올 수 없습니다</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 주간 통계 계산
  const weeklyStats = {
    maxTemp: Math.max(...dailyForecast.map(d => d.tempMax)),
    minTemp: Math.min(...dailyForecast.map(d => d.tempMin)),
    avgHumidity: Math.round(dailyForecast.reduce((sum, d) => sum + d.humidity, 0) / dailyForecast.length),
    avgPrecipitation: Math.round(dailyForecast.reduce((sum, d) => sum + d.precipitation, 0) / dailyForecast.length),
    maxUV: Math.max(...dailyForecast.map(d => d.uvIndex))
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">7일간 예보</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {weeklyStats.minTemp}° ~ {weeklyStats.maxTemp}°
            </Badge>
          </div>
        </div>

        {/* 주간 요약 */}
        <div className="text-sm text-muted-foreground">
          {getUVRecommendation(weeklyStats.maxUV)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 일별 예보 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {dailyForecast.map((dayData, index) => (
            <DailyWeatherItem
              key={dayData.date}
              dailyData={dayData}
              isToday={index === 0}
            />
          ))}
        </div>

        {/* 주간 통계 요약 */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-3 text-sm">주간 요약</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm font-semibold text-blue-600">{weeklyStats.maxTemp}°</div>
              <div className="text-xs text-muted-foreground">최고 온도</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-blue-400">{weeklyStats.minTemp}°</div>
              <div className="text-xs text-muted-foreground">최저 온도</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-blue-500">{weeklyStats.avgPrecipitation}%</div>
              <div className="text-xs text-muted-foreground">평균 강수</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-orange-500">{weeklyStats.maxUV}</div>
              <div className="text-xs text-muted-foreground">최대 UV</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}