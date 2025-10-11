import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);

    if (dark) {
      document.body.style.backgroundImage = "url('/spy_bg.png')";
    } else {
      document.body.style.backgroundImage = "url('/civilian_bg.png')";
    }

    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.margin = "0";
    document.body.style.height = "100vh";
  }, [dark]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setDark((d) => !d)}
      className="ml-2 p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700"
      style={{
        minWidth: 64,
        fontWeight: 600,
        backgroundColor: dark ? "#333" : "#eee",
        color: dark ? "white" : "black",
      }}
    >
      {dark ? "Spy" : "Civilian"}
    </button>
  );
}

