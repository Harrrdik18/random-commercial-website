import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    access_token: null,
    user: null,
    isAuthenticated: false
  });

  const login = (access_token, user) => {
    setAuth({
      access_token,
      user,
      isAuthenticated: true
    });
  };

  const logout = () => {
    setAuth({
      access_token: null,
      user: null,
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
