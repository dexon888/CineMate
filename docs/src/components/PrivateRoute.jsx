import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
