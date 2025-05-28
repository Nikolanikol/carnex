import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18next/i18next.tsx";

createRoot(document.getElementById("root")!).render(<App />);
