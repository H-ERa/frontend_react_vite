import React, { useState, useEffect } from "react";
import "./Write.css";

const fontOptions = [
  { label: "Default (IM Fell English)", value: "'IM Fell English', serif" },
  { label: "Dancing Script", value: "'Dancing Script', cursive" },
  { label: "Great Vibes", value: "'Great Vibes', cursive" },
  { label: "Parisienne", value: "'Parisienne', cursive" },
];

export default function Write() {
  const [font, setFont] = useState(fontOptions[0].value);
  const [text, setText] = useState("");
  const [letterId, setLetterId] = useState("");
  const [error, setError] = useState("");

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
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 32 }}>
      <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
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

      <textarea
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your letter here..."
        className="write-textarea"
        style={{ fontFamily: font }}
      />
      <button
        style={{
          marginTop: 24,
          padding: "12px 32px",
          background: "#7345A0",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 1,
          cursor: "pointer",
          boxShadow: "0 2px 10px #7345A033",
        }}
        onClick={handleSeal}
        disabled={!text.trim()}
      >
        Seal Letter
      </button>
      {letterId && (
        <div
          style={{
            marginTop: 16,
            padding: 16,
            background: "#f4f1fa",
            borderRadius: 8,
            border: "1px solid #e2d7f5",
            color: "#7345A0",
            wordBreak: "break-word",
          }}
        >
          <b>Your letter code:</b>
          <br />
          <span style={{ fontSize: 24 }}>{letterId}</span>
          <br />
          <small>Share this code to let your friend read your letter. 🕰️</small>
        </div>
      )}
      {error && (
        <div style={{ color: "#a00", marginTop: 12 }}>{error}</div>
      )}
    </div>
  );
}
