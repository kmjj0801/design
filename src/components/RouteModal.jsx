import { X, MapPin, Clock, DollarSign, Route, ArrowDown, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function RouteModal({
  isOpen,
  onClose,
  routeDestinations,
  onRemoveFromRoute,
  onOptimizeRoute
}) {
  const totalCost = routeDestinations.reduce((sum, dest) => sum + dest.estimatedCost, 0);
  const totalDuration = routeDestinations.length * 2; // 평균 2시간씩 계산

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            빙고루트 여행 경로
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Route Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-semibold">{routeDestinations.length}</div>
                  <div className="text-sm text-muted-foreground">여행지</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">{totalDuration}시간</div>
                  <div className="text-sm text-muted-foreground">예상 소요시간</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">{totalCost}만원</div>
                  <div className="text-sm text-muted-foreground">예상 비용</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Actions */}
          <div className="flex gap-3">
            <Button onClick={onOptimizeRoute} className="flex-1">
              <Route className="h-4 w-4 mr-2" />
              경로 최적화
            </Button>
            <Button variant="outline" onClick={() => {
              // TODO: 경로 공유 기능
              navigator.clipboard.writeText(`서울 여행 경로: ${routeDestinations.map(d => d.name).join(' → ')}`);
            }}>
              경로 공유
            </Button>
          </div>

          {/* Route List */}
          <div className="space-y-4">
            {routeDestinations.length === 0 ? (
              <div className="text-center py-8">
                <Route className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">여행 경로가 비어있습니다</h3>
                <p className="text-muted-foreground">여행지 카드에서 '경로추가' 버튼을 눌러 경로를 만들어보세요.</p>
              </div>
            ) : (
              routeDestinations.map((destination, index) => (
                <div key={destination.id} className="flex items-start gap-4">
                  {/* Step Number */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    {index < routeDestinations.length - 1 && (
                      <ArrowDown className="h-4 w-4 text-muted-foreground mt-2" />
                    )}
                  </div>

                  {/* Destination Card */}
                  <Card className="flex-1">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-lg mb-1">{destination.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{destination.district}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{destination.visitDuration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              <span>{destination.estimatedCost}만원</span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mb-2">
                            🚇 {destination.subway}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {destination.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveFromRoute(destination.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            )}
          </div>

          {/* Route Tips */}
          {routeDestinations.length > 0 && (
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">💡 여행 팁</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 지하철 1일권(8,000원)을 이용하면 교통비를 절약할 수 있어요</li>
                  <li>• 점심시간(12-2시)에는 식당이 붐비니 시간을 조정해보세요</li>
                  <li>• 각 여행지마다 충분한 시간을 두고 일정을 계획하세요</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}