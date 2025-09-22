import { Button } from "./ui/button";
import { Search, User, LogIn, Menu } from "lucide-react";
import { Input } from "./ui/input";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export function ModernHeader({
  searchQuery,
  onSearchChange
}) {
  // 로그인 상태 확인 hook - 현재 사용자가 로그인되어 있는지 확인
  const { isLoggedIn } = useAuth();
  // 페이지 이동 hook - 다른 페이지로 이동할 때 사용
  const navigate = useNavigate();

  return (
    // 헤더 컨테이너 - 상단에 고정되어 스크롤해도 계속 보임
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* 로고와 브랜드명 */}
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            onClick={() => navigate("/")} // 로고 클릭 시 홈페이지로 이동
          >
            {/* 로고 아이콘 */}
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-black">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white" /> {/* Compass -> Search로 변경 */}
            </div>
            {/* 브랜드명과 설명 */}
            <div>
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-black">빙고루트</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Seoul Travel Guide</p>
            </div>
          </div>

          {/* 데스크탑용 검색바 */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-6 lg:mx-12">
            <div className="relative w-full">
              {/* 검색 아이콘 */}
              <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              {/* 검색 입력창 */}
              <Input
                type="text"
                placeholder="여행지나 구를 검색해보세요..."
                value={searchQuery}                       // 현재 검색어 표시
                onChange={(e) => onSearchChange(e.target.value)} // 검색어 변경 시 부모 컴포넌트에 알림
                className="pl-10 lg:pl-12 pr-3 lg:pr-4 h-10 lg:h-12 bg-white border-border/60 rounded-xl lg:rounded-2xl shadow-sm focus:ring-2 focus:ring-black/10 transition-all placeholder:text-muted-foreground/60 text-sm lg:text-base"
              />
            </div>
          </div>

          {/* 데스크탑용 네비게이션 버튼들 */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
            {/* 로그인 상태에 따른 버튼 표시 */}
            {isLoggedIn ? (
              // 로그인된 경우: 마이페이지 버튼 표시
              <Button
                variant="ghost"
                size="default"
                onClick={() => navigate("/mypage")} // 마이페이지로 이동
                className="hidden md:flex items-center gap-1.5 lg:gap-2 h-10 lg:h-12 px-3 lg:px-6 rounded-xl lg:rounded-2xl hover:bg-muted/50 transition-colors text-sm lg:text-base"
              >
                <User className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                <span className="hidden lg:inline">내 정보</span>
                <span className="lg:hidden">내정보</span>
              </Button>
            ) : (
              // 로그인되지 않은 경우: 로그인 버튼 표시
              <Button
                variant="ghost"
                size="default"
                onClick={() => navigate("/login")} // 로그인 페이지로 이동
                className="hidden md:flex items-center gap-1.5 lg:gap-2 h-10 lg:h-12 px-3 lg:px-6 rounded-xl lg:rounded-2xl hover:bg-muted/50 transition-colors text-sm lg:text-base"
              >
                <LogIn className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                <span className="hidden lg:inline">로그인</span>
                <span className="lg:hidden">로그인</span>
              </Button>
            )}

            {/* 모바일용 메뉴 버튼 */}
            <Button
              variant="outline"
              size="default"
              className="md:hidden h-10 w-10 rounded-xl border-border/60"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 모바일용 검색바와 버튼들 */}
        <div className="md:hidden mt-3 space-y-3">
          {/* 모바일 검색바 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="여행지나 구를 검색해보세요..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 h-10 bg-white border-border/60 rounded-xl shadow-sm text-sm"
            />
          </div>

          {/* 모바일 버튼들 */}
          <div className="flex gap-2 flex-wrap">
            {/* 로그인 상태에 따른 모바일 버튼 */}
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/mypage")}
                className="flex items-center gap-1.5 h-8 px-3 rounded-lg border-border/60 text-xs"
              >
                <User className="h-3 w-3" />
                내정보
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/login")}
                className="flex items-center gap-1.5 h-8 px-3 rounded-lg border-border/60 text-xs"
              >
                <LogIn className="h-3 w-3" />
                로그인
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}