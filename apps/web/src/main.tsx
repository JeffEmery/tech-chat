import React from "react";
import "./style.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import ChatPage from "./pages/chat-page";
import HomePage from "./pages/home-page";
import InfoPage from "./pages/info-page";
import { ProtectedLayout } from "./pages/protected-layout";
import { AuthProvider } from "./contexts/auth-context";

const App = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/info" element={<InfoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
};

createRoot(document.getElementById("app")!).render(<App />);
