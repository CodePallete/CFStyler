import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CodeforcesUi from "./components/codeforcesui";

document.documentElement.setAttribute("data-cfstyler-loaded", "1");

function mountContentUi() {
  const body = document.querySelector("body");

  if (!body) {
    return;
  }

  const existingRoot = document.getElementById("cf-styler-root");
  const mountNode = existingRoot ?? document.createElement("div");
  mountNode.id = "cf-styler-root";

  if (!existingRoot) {
    body.prepend(mountNode);

    console.log(
      "Extension Alert: React content UI injected successfully. If you don't see it, please check the console for any errors.",
    );
  }

  createRoot(document.getElementById(mountNode.id)!).render(
    <StrictMode>
      <CodeforcesUi />
    </StrictMode>,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountContentUi, { once: true });
} else {
  mountContentUi();
}
