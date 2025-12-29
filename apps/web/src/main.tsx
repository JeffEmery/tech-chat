import React from "react";
import "./style.css";
import { createRoot } from "react-dom/client";
import { Header } from "@repo/ui";
import { BrowserRouter, Route, Routes } from "react-router";
import InfoPage from "./pages/info-page";

const ChatPage = () => (
  <div>
    <Header title="Envision AI Tech Assistant" />
  </div>
);

const LandingPage = () => (
  <div>
    <iframe id="fullscreen-iframe"
      src="https://www.chatbase.co/phvfi1BLeWhC3uVaxG8nE/help"
      title="Example Website"
      width="600"
      height="400"
      loading="lazy" // Optimizes page load by deferring off-screen iframes
      style={{ border: 'none' }} // Use style object for CSS
    />
  </div>
);

const App = () => (
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

createRoot(document.getElementById("app")!).render(<App />);