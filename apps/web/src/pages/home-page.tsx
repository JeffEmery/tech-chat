import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/use-theme";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/auth-context";
import { useEffect } from "react";

const LoginTemplate = () => {
  const { login } = useAuth();

  return (
    <div className="">
      <button className="rounded-md bg-blue-500 text-white p-2" autoFocus onClick={login}>Please Login</button>
    </div>
  );
}

const HomeTemplate = () => {
  const { logout } = useAuth();

  return (
    <>
      <Link className="text-2xl p-8 font-bold" to="/">Home</Link><br />
      <Link to="/chat">Chat</Link><br />
      <Link to="/info">Info</Link><br />
      <button className="" onClick={logout}>Logout</button>
    </>
  );
}

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/chat", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (!isLoading && !isAuthenticated) {
    return (
      <>
        <div className="text-2xl p-8 font-bold">Envision Technologist Portal</div>
        <LoginTemplate />
        <div className="fixed bottom-0 left-0 right-0 p-4 text-center">
          {theme === "dark" ? <Sun className="w-4 h-4" onClick={toggleTheme} /> : <Moon className="w-4 h-4" onClick={toggleTheme} />}
        </div>
      </>
    )
  }

  return null;

}