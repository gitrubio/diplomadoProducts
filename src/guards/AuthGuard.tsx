import useUserSession from '@/store/store';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Asegúrate de importar correctamente el store de Zustand

interface ProtectedRouteProps {
  redirectTo: string;
}

const AuthGuard: React.FC<ProtectedRouteProps> = ({ redirectTo }) => {
  const { isLoggedIn } = useUserSession(); // Obtiene el estado de logeo desde Zustand

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default AuthGuard;
