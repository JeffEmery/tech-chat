import { useNavigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../contexts/auth-context";
import { useEffect } from "react";

export const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/", { state: { from: location } });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  if (isAuthenticated) {
    return <Outlet />;
  }

  return null;
};