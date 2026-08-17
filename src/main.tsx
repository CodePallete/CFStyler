import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const cfBody = document.querySelector("#body");

if (cfBody) {
  const extensionRoot = document.createElement("div");
  extensionRoot.id = "cf-beautifier-root";

  cfBody.prepend(extensionRoot);

  const root = createRoot(extensionRoot);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  console.warn(
    "Extension Alert: Main container not found. Layout might have changed.",
  );
}
