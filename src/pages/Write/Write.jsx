import React, { useState, useEffect } from "react";

const fontOptions = [
  { label: "Default (IM Fell English)", value: "'IM Fell English', serif" },
  { label: "Dancing Script", value: "'Dancing Script', cursive" },
  { label: "Great Vibes", value: "'Great Vibes', cursive" },
  { label: "Parisienne", value: "'Parisienne', cursive" },
];

export default function Write() {
  const [font, setFont] = useState(fontOptions[0].value);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [encrypted, setEncrypted] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/hello`)
      .then((res) => res.json())
      .then((data) => setMsg(data.message))
      .catch(() => setMsg(" "));
  }, []);

  const handleSeal = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/encrypt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((data) => setEncrypted(data.encrypted))
      .catch(() => setEncrypted("Failed to seal/encrypt letter."));
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 32 }}>
      {msg && (
        <div style={{ marginBottom: 24, fontWeight: 500, color: "#7345A0" }}>
          {msg}
        </div>
      )}
      <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
        Choose your letter font:
      </label>
      <select
        value={font}
        onChange={(e) => setFont(e.target.value)}
        style={{ marginBottom: 24, fontSize: 16, padding: 8 }}
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
        style={{
          width: "100%",
          fontSize: 18,
          fontFamily: font,
          padding: 16,
          borderRadius: 8,
          border: "1.5px solid #ccc",
          background: "#f8f8f8",
          marginTop: 8,
        }}
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
      >
        Seal Letter
      </button>
      {encrypted && (
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
          <b>Sealed Letter:</b> <br />
          {encrypted}
        </div>
      )}
    </div>
  );
}
