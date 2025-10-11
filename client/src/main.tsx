import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./utils/debugClicks"; // Load debug utilities in dev

createRoot(document.getElementById("root")!).render(<App />);
