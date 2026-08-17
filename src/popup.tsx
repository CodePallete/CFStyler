import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

declare const chrome: any;

function Popup() {
  const [isCodeforces, setIsCodeforces] = useState<boolean | null>(null);
  const isDevelopment = import.meta.env.DEV;

  useEffect(() => {
    if (isDevelopment) {
      setIsCodeforces(true);
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
      const currentTab = tabs[0];

      if (currentTab?.url) {
        setIsCodeforces(currentTab.url.includes("codeforces.com"));
        return;
      }

      setIsCodeforces(false);
    });
  }, [isDevelopment]);

  return (
    <div style={{ width: "250px", padding: "15px", fontFamily: "sans-serif" }}>
      <h3>CF Styler</h3>

      {isCodeforces === null && <p>Checking tab...</p>}

      {isCodeforces === true && (
        <div
          style={{
            color: "green",
            backgroundColor: "#e6f4ea",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <strong>Codeforces Detected!</strong>
          <p style={{ fontSize: "12px", margin: "5px 0 0" }}>
            You can apply themes to the current Codeforces page using this
            extension.
          </p>
        </div>
      )}

      {isCodeforces === false && (
        <div
          style={{
            color: "red",
            backgroundColor: "#fce8e6",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <strong>Restricted Access</strong>
          <p style={{ fontSize: "12px", margin: "5px 0 0" }}>
            This extension only runs on codeforces.com.
          </p>
        </div>
      )}
    </div>
  );
}

const popupRoot = document.querySelector("#root");

if (!popupRoot) {
  throw new Error("Popup root element not found.");
}

createRoot(popupRoot).render(
  <StrictMode>
    <Popup />
  </StrictMode>,
);
