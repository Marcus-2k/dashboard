import { environment } from "@shared/environment/environment";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";

if (environment.environment === "prod") {
  createRoot(document.getElementById("root")!).render(
    <>
      <App />
    </>
  );
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
