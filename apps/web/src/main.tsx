import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { Header } from "@repo/ui";
import { BrowserRouter, Route, Routes } from "react-router";

const ChatPage = () => (
  <div>
    <Header title="Envision AI Tech Assistant" />
  </div>
);

const InfoPage = () => (
  <div>
    <Header title="About the Envision AI Tech Assistant" />
    <p>
      <b>What it is?</b>
      <br />
      The Envision Technologist AI Assistant is a trained AI solution that answers technical questions about imaging exams.
      It provides guidance on best practices, exam technique, and other practical topics.
      It gives technologists fast, reliable guidance at the point of care, helping to produce high quality studies with fewer errors and less rework.
      Immediate answers reduce the need to interrupt radiologists for routine questions while keeping exams moving efficiently and consistently.
      <br /><br />
      <b>Is it accurate?</b>
      <br />
      The assistant was trained using thousands of instructional files and relevant medical websites.
      All training sources were curated and reviewed by Dr. Sana to ensure clinical relevance and accuracy.
      Ongoing feedback helps improve performance.
      Use thumbs down 👎 to flag responses that are unclear or incorrect, and thumbs up 👍 to confirm helpful answers.
    </p>
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