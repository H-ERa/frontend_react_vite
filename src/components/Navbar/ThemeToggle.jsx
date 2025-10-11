import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setDark(d => !d)}
      className="ml-2 p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {dark ? (
        <span role="img" aria-label="moon">🌙</span>
      ) : (
        <span role="img" aria-label="sun">☀️</span>
      )}
    </button>
  );
}
