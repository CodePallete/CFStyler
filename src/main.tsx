import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CodeforcesUi from "./components/codeforcesui";
import { headerStyle } from "./components/mainpage/header";

document.documentElement.setAttribute("data-cfstyler-loaded", "1");

declare const chrome: {
  storage: {
    local: {
      set: (items: { [key: string]: any }) => Promise<void>;
      get: (key: string) => Promise<{ [key: string]: any }>;
    };
    onChanged: {
      addListener: (
        callback: (
          changes: { [key: string]: { newValue: any; oldValue: any } },
          areaName: string,
        ) => void,
      ) => void;
    };
  };
};

async function mountContentUi() {
  const body = document.querySelector("body");

  if (!body) {
    return;
  }

  const existingRoot = document.getElementById("cf-styler-root");
  const mountNode = existingRoot ?? document.createElement("div");
  mountNode.id = "cf-styler-root";

  const { theme } = await chrome.storage.local.get("theme");
  document.documentElement.dataset.cfstylerTheme = theme ?? "default";

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.theme) {
      document.documentElement.dataset.cfstylerTheme =
        changes.theme.newValue ?? "default";
    }
  });

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

  headerStyle();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountContentUi, { once: true });
} else {
  mountContentUi();
}
