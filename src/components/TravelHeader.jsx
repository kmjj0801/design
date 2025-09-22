import { Search, MapPin, User, Menu, Route } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function TravelHeader({ searchQuery, onSearchChange, onRouteClick }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-semibold">빙고루트</h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="구별, 관광지 검색..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onRouteClick} className="hidden md:flex items-center gap-2">
              <Route className="h-4 w-4" />
              여행 경로
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
              <User className="h-4 w-4" />
              내 정보
            </Button>
            <Button variant="outline" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="구별, 관광지 검색..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 w-full"
            />
          </div>
          <div className="mt-2 flex gap-2">
            <Button variant="outline" size="sm" onClick={onRouteClick} className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              여행 경로
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}