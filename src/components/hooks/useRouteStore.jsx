import { useState, useCallback } from "react";

export const useRouteStore = () => {
  const [routeDestinations, setRouteDestinations] = useState([]);

  const addToRoute = useCallback((destination) => {
    if (routeDestinations.find(d => d.id === destination.id)) {
      return false; // 이미 존재함
    }

    setRouteDestinations(prev => [...prev, destination]);
    return true;
  }, [routeDestinations]);

  const removeFromRoute = useCallback((id) => {
    setRouteDestinations(prev => prev.filter(dest => dest.id !== id));
  }, []);

  const reorderRoute = useCallback((newOrder) => {
    setRouteDestinations(newOrder);
  }, []);

  const optimizeRoute = useCallback(() => {
    // 간단한 구별 기준 최적화
    const optimized = [...routeDestinations].sort((a, b) => {
      // 1. 구별로 그룹화
      if (a.district !== b.district) {
        return a.district.localeCompare(b.district);
      }
      // 2. 같은 구 내에서는 예상 비용이 적은 순으로
      return a.estimatedCost - b.estimatedCost;
    });

    setRouteDestinations(optimized);
  }, [routeDestinations]);

  const clearRoute = useCallback(() => {
    setRouteDestinations([]);
  }, []);

  const getTotalCost = useCallback(() => {
    return routeDestinations.reduce((total, dest) => total + dest.estimatedCost, 0);
  }, [routeDestinations]);

  const getTotalDuration = useCallback(() => {
    const totalHours = routeDestinations.length * 2.5; // 평균 2.5시간으로 가정
    return `약 ${Math.ceil(totalHours)}시간`;
  }, [routeDestinations]);

  return {
    routeDestinations,
    addToRoute,
    removeFromRoute,
    reorderRoute,
    optimizeRoute,
    clearRoute,
    getTotalCost,
    getTotalDuration
  };
};