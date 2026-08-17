import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const availableThemes = [
    { name: "minimal", color: "#ffffff" },
    { name: "dark", color: "#000000" },
    { name: "glassmorphic", color: "rgba(255, 255, 255, 0.1)" },
    { name: "gradient", color: "linear-gradient(to right, #ff7e5f, #feb47b)" },
    { name: "bentogrid", color: "#f0f0f0" },
    { name: "neobrutal", color: "#e0e0e0" },
    { name: "neumorphic", color: "#f5f5f5" },
    { name: "ainative", color: "#d0d0d0" },
    { name: "darkglass", color: "rgba(0, 0, 0, 0.5)" },
  ];

  useEffect(() => {
    if (selectedTheme) {
      const cfBody = document.querySelector("#body");

      if (cfBody) {
        cfBody.setAttribute("data-theme", selectedTheme);
      } else {
        console.warn(
          "Extension Alert: Main container not found. Layout might have changed.",
        );
      }
    }
  }, [selectedTheme]);

  return (
    <div className="extension-controls">
      <h1>Hello, Cloudflare!</h1>

      <div className="extension-controls__section">
        {availableThemes.map((theme) => (
          <button
            key={theme.name}
            className="extension-controls__button"
            style={{ background: theme.color }}
            onClick={() => {
              setSelectedTheme(theme.name);
            }}
          >
            Select {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
