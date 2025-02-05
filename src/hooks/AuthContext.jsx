import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    // window.location.reload();
    toast.success('Sign-in successful!');
    console.log('Sign-in successful!');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    // window.location.reload();
    toast.success('Sign-out successful!');
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
