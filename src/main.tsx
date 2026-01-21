import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Safe initialization - never crash to white screen
const rootElement = document.getElementById("root");

if (rootElement) {
  try {
    createRoot(rootElement).render(<App />);
  } catch (error) {
    console.error('Failed to initialize app:', error);
    rootElement.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 20px; font-family: system-ui, sans-serif;">
        <div style="background: white; border-radius: 16px; padding: 32px; max-width: 400px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
          <h1 style="color: #1e293b; font-size: 20px; margin-bottom: 8px;">Fehler beim Laden</h1>
          <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Die App konnte nicht geladen werden. Bitte laden Sie die Seite neu.</p>
          <button onclick="location.reload()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; cursor: pointer;">
            Seite neu laden
          </button>
        </div>
      </div>
    `;
  }
} else {
  console.error('Root element not found');
}
