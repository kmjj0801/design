import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * 사용자 정보
 * @typedef {Object} User
 * @property {string} id - 사용자 ID
 * @property {string} name - 이름
 * @property {string} email - 이메일
 * @property {string} username - 사용자명
 */

/**
 * 인증 컨텍스트 타입
 * @typedef {Object} AuthContextType
 * @property {boolean} isLoggedIn - 로그인 상태
 * @property {User|null} user - 사용자 정보
 * @property {Function} login - 로그인 함수
 * @property {Function} logout - 로그아웃 함수
 */

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 복원
    const savedUser = localStorage.getItem("bingoroute_user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse saved user data:", error);
        localStorage.removeItem("bingoroute_user");
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("bingoroute_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("bingoroute_user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};