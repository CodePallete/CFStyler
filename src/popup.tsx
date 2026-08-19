import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

declare const chrome: {
  tabs: {
    query: (
      queryInfo: { active: boolean; currentWindow: boolean },
      callback: (tabs: Array<{ url?: string }>) => void,
    ) => void;
  };
};

function Popup() {
  const [isCodeforces, setIsCodeforces] = useState<boolean | null>(null);
  const isDevelopment = import.meta.env.DEV;

  useEffect(() => {
    if (isDevelopment) {
      setIsCodeforces(true);
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      setIsCodeforces(Boolean(currentTab?.url?.includes("codeforces.com")));
    });
  }, [isDevelopment]);

  return (
    <div style={{ padding: "15px", fontFamily: "sans-serif" }}>
      <h3>CF Styler</h3>

      {isCodeforces === null && <p>Checking tab...</p>}

      {isCodeforces === true && (
        <>
          <div
            style={{
              color: "green",
              backgroundColor: "#e6f4ea",
              padding: "10px",
              borderRadius: "4px",
              width: "400px",
            }}
          >
            <strong>Codeforces Detected!</strong>
            <p style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
              You can apply themes to the current Codeforces page using this
              extension.
            </p>
          </div>
          <App />
        </>
      )}

      {isCodeforces === false && (
        <div
          style={{
            color: "red",
            backgroundColor: "#fce8e6",
            padding: "10px",
            borderRadius: "4px",
            width: "200px",
          }}
        >
          <strong>Restricted Access</strong>
          <p style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
            This extension only runs on codeforces.com.
          </p>
        </div>
      )}
    </div>
  );
}

const popupRoot = document.getElementById("root");

if (!popupRoot) {
  throw new Error("Popup root element not found.");
}

createRoot(popupRoot).render(
  <StrictMode>
    <Popup />
  </StrictMode>,
);
