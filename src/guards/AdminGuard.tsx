import useUserSession from '@/store/store';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Asegúrate de importar correctamente el store de Zustand

interface ProtectedRouteProps {
  redirectTo: string;
}

const AdminGuard: React.FC<ProtectedRouteProps> = ({ redirectTo }) => {
  const { isLoggedIn, admin } = useUserSession(); // Obtiene el estado de logeo desde Zustand

  return (isLoggedIn && admin) ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default AdminGuard;
