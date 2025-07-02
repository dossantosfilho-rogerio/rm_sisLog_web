import { Navigate, Outlet } from "react-router-dom"; // Usado para redirecionamento
import { isAuthenticated } from "../api/auth"; // Função de verificação

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/app" />;
  }

  return <Outlet />; // Se estiver autenticado, renderiza a página protegida
};

export default ProtectedRoute;
