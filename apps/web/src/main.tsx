import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { Header } from "@repo/ui";
import { BrowserRouter, Route, Routes } from "react-router";

const ChatPage = () => (
  <div>
    <Header title="Envision Technologist Assistant" />
  </div>
);

const LandingPage = () => (
  <div>
    {/* <Header title="Chat with the Envision Technologist" /> */}
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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

createRoot(document.getElementById("app")!).render(<App />);