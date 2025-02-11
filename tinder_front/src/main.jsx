import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// when we refresh our store is put to intital state hence we were getting logged out
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
