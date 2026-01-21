import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  // Fallback: create a root element if missing
  const fallback = document.createElement("div");
  fallback.id = "root";
  document.body.appendChild(fallback);
  
  createRoot(fallback).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
} else {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
