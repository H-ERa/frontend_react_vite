import React, { useState } from "react";
import "./Write.css";

const fontOptions = [
  { label: "Default (IM Fell English)", value: "'IM Fell English', serif" },
  { label: "Dancing Script", value: "'Dancing Script', cursive" },
  { label: "Cedarville Cursive", value: "'Cedarville Cursive', cursive" },
  { label: "Allura", value: "'Allura', cursive" },
  { label: "Tangerine", value: "'Tangerine', cursive" },
];

export default function Write(props) {
  const [font, setFont] = useState(fontOptions[0].value);
  const [text, setText] = useState("");
  const [letterId, setLetterId] = useState("");
  const [error, setError] = useState("");
  const mode = props.mode || "light";

  const handleSeal = async () => {
    setLetterId("");
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/letters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encrypted_message: text }),
      });
      const data = await res.json();
      if (res.ok && data.id) {
        setLetterId(data.id);
      } else {
        setError(data.error || "Failed to store letter.");
      }
    } catch (err) {
      setError("Network or server error.");
    }
  };

  return (
    <div className={mode === "dark" ? "dark-mode" : "light-mode"}>
      {/* 30% black overlay only in dark mode */}
      {mode === "dark" && <div className="dark-overlay" />}
      <div className="write-box">
        <label className="write-label" style={{ color: mode === "dark" ? "#fff" : "#ffff" }}>
          Choose your letter font:
        </label>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="write-select"
        >
          {fontOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="letter-area">
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your letter here..."
            className="write-textarea"
            style={{ fontFamily: font }}
          />
          {letterId && (
            <div className="sealed-letter-floating">
              <b>Your letter code:</b>
              <br />
              <span style={{ fontSize: 24 }}>{letterId}</span>
              <br />
              <small>Share this code to let your friend read your letter. 🕰️</small>
            </div>
          )}
        </div>

        <button
          className="seal-button"
          onClick={handleSeal}
          disabled={!text.trim()}
        >
          Seal Letter
        </button>
        {error && (
          <div style={{ color: "#a00", marginTop: 12 }}>{error}</div>
        )}
      </div>
    </div>
  );
}
