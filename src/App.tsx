import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const availableThemes = [
    { name: "minimal", color: "#ffffff", textColor: "#000000" },
    { name: "dark", color: "#000000", textColor: "#ffffff" },
    {
      name: "glassmorphic",
      color: "rgba(43, 43, 43, 0.1)",
      textColor: "#4b0202",
    },
    {
      name: "gradient",
      color: "linear-gradient(to right, #ff7e5f, #feb47b)",
      textColor: "#344b42",
    },
    { name: "bentogrid", color: "#f0f0f0", textColor: "#000000" },
    { name: "neobrutal", color: "#e0e0e0", textColor: "#000000" },
    { name: "neumorphic", color: "#f5f5f5", textColor: "#000000" },
    { name: "ainative", color: "#d0d0d0", textColor: "#000000" },
    { name: "darkglass", color: "rgba(0, 0, 0, 0.5)", textColor: "#ffffff" },
  ];

  useEffect(() => {
    if (selectedTheme) {
      const pageRoot = document.querySelector<HTMLElement>("#body");

      if (pageRoot) {
        pageRoot.setAttribute("data-theme", selectedTheme);
      } else {
        console.warn(
          "Extension Alert: Main container not found. Layout might have changed.",
        );
      }
    }
  }, [selectedTheme]);

  const selectedThemeDetails = availableThemes.find(
    (theme) => theme.name === selectedTheme,
  );

  return (
    <div className="extension-controls">
      <h3>Hello, there!</h3>
      <span className="extension-controls__subtext">
        Select a theme to apply to the current Codeforces page:
      </span>

      {selectedTheme && (
        <div className="extension-controls__selected-theme">
          <strong>Selected Theme:</strong>{" "}
          <span
            style={{
              background: selectedThemeDetails?.color,
              color: selectedThemeDetails?.textColor,
            }}
          >
            {selectedTheme}
          </span>
        </div>
      )}

      <div className="extension-controls__section">
        {availableThemes.map((theme) => (
          <button
            key={theme.name}
            className="extension-controls__button"
            style={{ background: theme.color, color: theme.textColor }}
            onClick={() => {
              setSelectedTheme(theme.name);
            }}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
