import React, { useState } from 'react';

const fontOptions = [
  { label: "Default (IM Fell English)", value: "'IM Fell English', serif" },
  { label: "Dancing Script", value: "'Dancing Script', cursive" },
  { label: "Great Vibes", value: "'Great Vibes', cursive" },
  { label: "Sacramento", value: "'Sacramento', cursive" }
];

export default function Write() {
  const [font, setFont] = useState(fontOptions[0].value);
  const [text, setText] = useState('');

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 32 }}>
      <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
        Choose your letter font:
      </label>
      <select
        value={font}
        onChange={e => setFont(e.target.value)}
        style={{ marginBottom: 24, fontSize: 16, padding: 8 }}
      >
        {fontOptions.map(opt =>
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        )}
      </select>
      <textarea
        rows={10}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write your letter here..."
        style={{
          width: "100%",
          fontSize: 18,
          fontFamily: font,
          padding: 16,
          borderRadius: 8,
          border: "1.5px solid #ccc",
          background: "#f8f8f8",
          marginTop: 8
        }}
      />
    </div>
  );
}
