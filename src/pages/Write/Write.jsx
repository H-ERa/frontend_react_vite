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
    <div className="write-container">
      {msg && <div className="write-label">{msg}</div>}

      <label className="write-label">Choose your letter font:</label>

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

      <button className="seal-button" onClick={handleSeal}>
        Seal Letter
      </button>

      {encrypted && (
        <div className="sealed-letter">
          <b>Sealed Letter:</b> <br />
          {encrypted}
        </div>
      )}
    </div>
  );
}
