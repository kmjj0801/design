import { useState, useEffect } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: "이 브라우저는 위치 서비스를 지원하지 않습니다."
      });
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5분
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setLoading(false);

        // 위치 정보를 로컬 스토리지에 저장 (선택적)
        try {
          localStorage.setItem('user_location', JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: Date.now()
          }));
        } catch (e) {
          console.warn('Failed to save location to localStorage:', e);
        }
      },
      (error) => {
        setError({
          code: error.code,
          message: getErrorMessage(error.code)
        });
        setLoading(false);
      },
      options
    );
  };

  const clearLocation = () => {
    setLocation(null);
    setError(null);
    try {
      localStorage.removeItem('user_location');
    } catch (e) {
      console.warn('Failed to clear location from localStorage:', e);
    }
  };

  // 컴포넌트 마운트 시 저장된 위치 정보 확인
  useEffect(() => {
    try {
      const savedLocation = localStorage.getItem('user_location');
      if (savedLocation) {
        const parsed = JSON.parse(savedLocation);
        const now = Date.now();
        const timeDiff = now - parsed.timestamp;

        // 1시간 이내의 위치 정보만 사용
        if (timeDiff < 60 * 60 * 1000) {
          setLocation({
            latitude: parsed.latitude,
            longitude: parsed.longitude
          });
        } else {
          localStorage.removeItem('user_location');
        }
      }
    } catch (error) {
      console.warn('Failed to load location from localStorage:', error);
      try {
        localStorage.removeItem('user_location');
      } catch (e) {
        // Silent fail
      }
    }
  }, []);

  const getErrorMessage = (code) => {
    switch (code) {
      case 1:
        return "위치 액세스가 거부되었습니다.";
      case 2:
        return "위치를 확인할 수 없습니다.";
      case 3:
        return "위치 요청 시간이 초과되었습니다.";
      default:
        return "알 수 없는 오류가 발생했습니다.";
    }
  };

  return {
    location,
    error,
    loading,
    requestLocation,
    clearLocation
  };
};