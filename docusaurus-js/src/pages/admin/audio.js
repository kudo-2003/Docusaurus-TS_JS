import React, { useState } from "react";

export default function AudioAdmin() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const handleGenerate = async () => {
    try {
      const res = await fetch("https://supreme-trout-456rr44g9x63jwgj-3001.app.github.dev/api/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setMessage(data.message || "Đã tạo file mp3 thành công!");
      setFileName(`vocabulary-${text}.mp3`);
    } catch (err) {
      setMessage("Có lỗi xảy ra: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
      <h1>Admin Audio</h1>
      <textarea
        rows={4}
        style={{ width: "100%", padding: 10 }}
        placeholder="Nhập văn bản cần đọc..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button
        style={{
          marginTop: 12,
          padding: "10px 16px",
          background: "#111827",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
        onClick={handleGenerate}
      >
        Tạo file MP3
      </button>
      {message && <p style={{ marginTop: 20 }}>{message}</p>}
      {fileName && (
        <audio
          controls
          style={{ marginTop: 20 }}
          src={`/audio/${fileName}`}
        />
      )}
    </div>
  );
}
