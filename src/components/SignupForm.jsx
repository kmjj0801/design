import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner@2.0.3";

/**
 * 회원가입 폼 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {Function} props.onBack - 뒤로가기 핸들러
 * @param {Function} props.onSignupComplete - 회원가입 완료 핸들러
 */
export function SignupForm({ onBack, onSignupComplete }) {
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
  });

  const [agreements, setAgreements] = useState({
    location: false,
    privacy: false,
    marketing: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAgreementChange = (field, checked) => {
    setAgreements(prev => ({ ...prev, [field]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!formData.name || !formData.idNumber || !formData.username || 
        !formData.password || !formData.passwordConfirm || !formData.email) {
      toast.error("모든 필수 정보를 입력해주세요.");
      return;
    }

    // 비밀번호 확인
    if (formData.password !== formData.passwordConfirm) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 필수 약관 동의 확인
    if (!agreements.location || !agreements.privacy) {
      toast.error("필수 약관에 동의해주세요.");
      return;
    }

    // 회원가입 처리 (실제로는 API 호출)
    toast.success("회원가입이 완료되었습니다!");
    onSignupComplete();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CardTitle className="text-2xl">회원가입</CardTitle>
          </div>
          <p className="text-muted-foreground">
            빙고루트와 함께 서울 여행을 시작해보세요
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 이름 */}
            <div className="space-y-2">
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="홍길동"
                required
              />
            </div>

            {/* 주민번호 */}
            <div className="space-y-2">
              <Label htmlFor="idNumber">주민번호 *</Label>
              <Input
                id="idNumber"
                type="text"
                value={formData.idNumber}
                onChange={(e) => handleInputChange("idNumber", e.target.value)}
                placeholder="123456-1234567"
                maxLength={14}
                required
              />
            </div>

            {/* 아이디 */}
            <div className="space-y-2">
              <Label htmlFor="username">아이디 *</Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="영문, 숫자 조합 6-20자"
                required
              />
            </div>

            {/* 비밀번호 */}
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호 *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="영문, 숫자, 특수문자 조합 8자 이상"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* 비밀번호 확인 */}
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">비밀번호 확인 *</Label>
              <div className="relative">
                <Input
                  id="passwordConfirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  value={formData.passwordConfirm}
                  onChange={(e) => handleInputChange("passwordConfirm", e.target.value)}
                  placeholder="비밀번호를 다시 입력해주세요"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  {showPasswordConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* 이메일 */}
            <div className="space-y-2">
              <Label htmlFor="email">이메일 *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            {/* 약관 동의 */}
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="location"
                    checked={agreements.location}
                    onCheckedChange={(checked) => 
                      handleAgreementChange("location", checked)
                    }
                  />
                  <Label htmlFor="location" className="text-sm">
                    위치정보 이용약관 동의 *
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={agreements.privacy}
                    onCheckedChange={(checked) => 
                      handleAgreementChange("privacy", checked)
                    }
                  />
                  <Label htmlFor="privacy" className="text-sm">
                    개인정보 수집·이용 동의 *
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={agreements.marketing}
                    onCheckedChange={(checked) => 
                      handleAgreementChange("marketing", checked)
                    }
                  />
                  <Label htmlFor="marketing" className="text-sm">
                    마케팅 정보 수신 동의 (선택)
                  </Label>
                </div>
              </div>
            </div>

            {/* 회원가입 버튼 */}
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl"
            >
              회원가입
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}