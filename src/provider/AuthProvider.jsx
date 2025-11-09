import React from 'react';
import useAuth from '../hooks/useAuth';
import { AuthContext } from '../context/AuthContext';

const AuthProvider = ({ children }) => {
  

  const authInfo = useAuth()

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;