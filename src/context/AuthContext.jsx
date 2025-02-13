import React, { createContext, useContext, useState, useEffect } from 'react';
import { encryptData, decryptData } from '../utils/encryption';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const encryptedAuth = localStorage.getItem('authData');
    if (encryptedAuth) {
      const decryptedAuth = decryptData(encryptedAuth);
      return decryptedAuth || {
        access_token: null,
        user: null,
        isAuthenticated: false
      };
    }
    return {
      access_token: null,
      user: null,
      isAuthenticated: false
    };
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      const encryptedAuth = encryptData(auth);
      localStorage.setItem('authData', encryptedAuth);
    } else {
      localStorage.removeItem('authData');
    }
  }, [auth]);

  const login = (access_token, user) => {
    const authData = {
      access_token,
      user,
      isAuthenticated: true
    };
    setAuth(authData);
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
