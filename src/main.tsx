import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeMockData } from "./lib/mock-data";

// Initialize mock data on app startup
initializeMockData();

createRoot(document.getElementById("root")!).render(<App />);
