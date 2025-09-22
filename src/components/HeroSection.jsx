import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection({ 
  filteredCount // 필터링된 여행지 개수만 받음
  // 제거된 props: hasLocation
}) {
  const navigate = useNavigate();
  return (
    // 히어로 섹션 컨테이너 - 메인 화면 상단의 대형 배너
    <section className="relative overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        {/* 서울 도시 배경 이미지 */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1559717908-3dafdb5664a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwc2t5bGluZSUyMGdyYWRpZW50fGVufDF8fHx8MTc1ODAwMDg1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Seoul cityscape"
          className="w-full h-full object-cover"
        />
        {/* 이미지 위에 어두운 그라데이션 오버레이 - 텍스트 가독성 향상 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-xl sm:max-w-2xl">
          {/* 상단 배지 - AI 추천 기능 강조 */}
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 text-xs sm:text-sm text-white border border-white/20">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            AI 추천 기반 여행 계획
          </div>

          {/* 메인 제목 */}
          <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white leading-tight">
            서울을 더 스마트하게 여행하세요
          </h1>

          {/* 설명 텍스트 - GPS 관련 조건부 텍스트 제거하고 단순화 */}
          <p className="mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
            서울의 숨겨진 보석 같은 장소들을 발견하고, 나만의 완벽한 여행 루트를 만들어보세요.
          </p>

          {/* 통계 정보 */}
          <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-gray-300">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              {/* GPS 관련 조건부 텍스트 제거 */}
              <span>전체 {filteredCount}개 장소</span>
            </div>
            <div className="hidden sm:block h-3 sm:h-4 w-px bg-gray-500" />
            <div className="whitespace-nowrap">실시간 정보 업데이트</div>
            <div className="hidden lg:block h-4 w-px bg-gray-500" />
            <div className="whitespace-nowrap">무료 이용</div>
          </div>

          {/* CTA 버튼 - Call To Action */}
          <Button 
            size="lg" 
            onClick={() => navigate("/plan")}
            className="group h-10 sm:h-12 px-4 sm:px-6 bg-white text-black hover:bg-gray-100 rounded-xl sm:rounded-2xl font-semibold transition-all transform hover:scale-105 text-sm sm:text-base"
          >
            <span className="hidden sm:inline">여행 계획 시작하기</span>
            <span className="sm:hidden">시작하기</span>
            <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* 스크롤 인디케이터 - 아래로 스크롤하라는 시각적 힌트 */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-0.5 sm:w-1 h-6 sm:h-8 bg-gradient-to-b from-white/60 to-transparent rounded-full" />
        </div>
      </div>
    </section>
  );
}