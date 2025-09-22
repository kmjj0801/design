import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { HomePage } from "./components/HomePage.jsx";
import { LoginForm } from "./components/LoginForm.jsx";
import { SignupForm } from "./components/SignupForm.jsx";
import { MyPage } from "./components/MyPage.jsx";
import { TravelPlanPage } from "./components/TravelPlanPage.jsx";
// 여행경로 관련 페이지 제거: RouteDetailPage
import { AuthProvider } from "./components/AuthProvider.jsx";
import { FavoritesProvider } from "./components/contexts/FavoritesContext.jsx";

// React Query 클라이언트 설정 - 서버 데이터 캐싱 및 관리
const queryClient = new QueryClient({
  defaultOptions: {                    // 기본 설정들
    queries: {                         // 데이터 요청 관련 설정
      retry: 1,                        // 실패 시 1번만 재시도
      staleTime: 5 * 60 * 1000,       // 5분: 데이터가 "신선한" 시간
      gcTime: 10 * 60 * 1000,         // 10분: 메모리에서 데이터 보관 시간
    },
  },
});

function App() {
  return (
    // 데이터 관리 기능을 앱 전체에 제공
    <QueryClientProvider client={queryClient}>
      {/* 로그인 상태 관리를 앱 전체에 제공 */}
      <AuthProvider>
        {/* 찜목록 상태 관리를 앱 전체에 제공 */}
        <FavoritesProvider>
          {/* 페이지 이동 기능 활성화 */}
          <Router>
            {/* 전체 화면을 감싸는 컨테이너 */}
            <div className="min-h-screen bg-background">
              {/* 페이지들을 담는 라우터 */}
              <Routes>
                <Route path="/" element={<HomePage />} />             {/* 홈페이지 */}
                <Route path="/login" element={<LoginForm />} />       {/* 로그인 페이지 */}
                <Route path="/signup" element={<SignupForm />} />     {/* 회원가입 페이지 */}
                <Route path="/mypage" element={<MyPage />} />         {/* 마이페이지 */}
                <Route path="/plan" element={<TravelPlanPage />} />   {/* 여행 계획 페이지 */}
                {/* 여행경로 상세 페이지 제거: RouteDetailPage */}
                <Route path="*" element={<Navigate to="/" replace />} /> {/* 잘못된 경로는 홈으로 이동 */}
              </Routes>
              {/* 알림 메시지 표시 컴포넌트 */}
              <Toaster position="top-center" richColors />
            </div>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;