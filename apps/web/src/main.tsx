import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { Header } from "@repo/ui";
import { BrowserRouter, Route, Routes } from "react-router";

const LandingPage = () => (
  <div>
    <Header title="Envision Technologist Assistant" />
  </div>
);

const ChatPage = () => (
  <div>
    <Header title="Chat with the Envision Technologist" />
  </div>
);

const App = () => (
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

createRoot(document.getElementById("app")!).render(<App />);