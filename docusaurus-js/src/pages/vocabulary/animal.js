import React, { useState } from "react";
import Layout from '@theme/Layout';
import animalVocabulary from "../../data/vocabulary";

export default function AnimalPage() {
  const [playing, setPlaying] = useState(null);

  const handleClick = (audioFile, word) => {
    const audio = new Audio(`/audio/${audioFile}`);
    audio.play().catch(err => console.log("Playback blocked:", err));
    setPlaying(word);
    audio.onended = () => {
      setPlaying(null);
    };
  };

  return (
        <Layout>
    <div style={{ padding: "2rem" }}>
      <h1>🐯 Animal Vocabulary</h1>
      <p>Click on a card to hear the word!</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {animalVocabulary.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              cursor: "pointer",
              width: "200px",
              textAlign: "center",
              background: playing === item.title ? "#f0f8ff" : "#fff",
              transition: "background 0.3s",
            }}
            onClick={() => handleClick(item.audioFile, item.title)}
          >
            <img
              src={item.imageSrc}
              alt={item.title}
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            {playing === item.title && <p>🔊 Đang phát...</p>}
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
}
