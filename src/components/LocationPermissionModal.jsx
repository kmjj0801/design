import React from "react";
import { MapPin, Navigation, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";

export const LocationPermissionModal = ({
  isOpen,
  onClose,
  onPermission
}) => {
  const handleAllow = () => {
    onPermission(true);
  };

  const handleDeny = () => {
    onPermission(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-xl">위치 정보 접근 허용</DialogTitle>
          </div>
          <DialogDescription className="text-base leading-relaxed">
            내 주변 여행지를 추천해 드리기 위해 현재 위치 정보가 필요합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-6">
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <Navigation className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm mb-1">거리순 정렬</h4>
              <p className="text-sm text-muted-foreground">
                현재 위치에서 가까운 여행지부터 보여드립니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm mb-1">맞춤 추천</h4>
              <p className="text-sm text-muted-foreground">
                내 주변 지역의 특별한 여행지를 추천해 드립니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm text-amber-800 mb-1">개인정보 보호</h4>
              <p className="text-sm text-amber-700">
                위치 정보는 서비스 제공 목적으로만 사용되며, 별도로 저장되지 않습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleDeny}
            className="flex-1"
          >
            나중에 하기
          </Button>
          <Button
            onClick={handleAllow}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            위치 정보 허용
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};