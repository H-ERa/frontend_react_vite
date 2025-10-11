import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setDark(d => !d)}
      className="ml-2 p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700"
      style={{
        minWidth: 64,
        fontWeight: 600
      }}
    >
      {dark ? "Spy" : "Civilian"}
    </button>
  );
}
