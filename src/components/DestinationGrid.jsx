import { DestinationCard } from "./DestinationCard";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

/**
 * 여행지 목록을 그리드 형태로 표시하는 컴포넌트
 * @param {Object} props
 * @param {import('./types/destination.js').SeoulDestination[]} props.destinations - 여행지 목록
 * @param {boolean} [props.loading=false] - 로딩 상태
 * @param {Function} props.onLike - 찜하기 핸들러
 * @param {Function} props.onSelect - 선택 핸들러
 * @param {Function} [props.onAddToRoute] - 경로 추가 핸들러
 * @param {Function} [props.onLoadMore] - 더 보기 핸들러
 * @param {boolean} [props.hasMore=false] - 더 보기 가능 여부
 */
export function DestinationGrid({ 
  destinations, 
  loading = false, 
  onLike, 
  onSelect, 
  onAddToRoute,
  onLoadMore,
  hasMore = false 
}) {
  if (loading && destinations.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">여행지를 불러오는 중...</span>
      </div>
    );
  }

  if (!loading && destinations.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">검색된 여행지가 없습니다</h3>
        <p className="text-muted-foreground">검색어나 필터를 조정해서 다시 시도해보세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            onLike={onLike}
            onSelect={onSelect}
            onAddToRoute={onAddToRoute}
          />
        ))}
      </div>

      {hasMore && (
        <div className="text-center py-6">
          <Button 
            variant="outline" 
            onClick={onLoadMore}
            disabled={loading}
            className="min-w-32"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                불러오는 중...
              </>
            ) : (
              '더 보기'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}