import React, { useState, useRef } from "react";
import styles from "./ButtonCard.module.css";

export default function ButtonCard({ title, description, audioFile, nextPage, imageSrc }) {
  const [cardTitle, setCardTitle] = useState(title);
  const [cardText, setCardText] = useState(description);
  const audioRef = useRef(null); // giữ tham chiếu audio

  const handleClick = (e) => {
    e.preventDefault();
    // Nếu đã có audio đang phát → dừng lại trước
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(`/audio/${audioFile}`);
    audioRef.current = audio;
    audio.play().catch(err => console.log("Playback blocked:", err));

    setCardTitle(title);
    setCardText(description);

audio.onended = () => {
  setCardTitle("Good & Tốt");

  const goodAudio = new Audio("/audio/good/good.mp3");
  goodAudio.play().catch(err => console.log("Playback blocked:", err));

  setCardText("Start learning vocabulary... (Bắt đầu học từ vựng...)");

  // Chờ 2 giây sau khi phát good.mp3 rồi mới phát start-vocabulary.mp3
  goodAudio.onended = () => {
    setTimeout(() => {
      const startAudio = new Audio("/audio/order/start-vocabulary.mp3");
      startAudio.play().catch(err => console.log("Playback blocked:", err));

      startAudio.onended = () => {
        window.location.href = nextPage;
      };
    }, 1500); // 2000ms = 2 giây
  };
};

  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img
        src={imageSrc}
        alt="Card"
        className={styles.cardImage}
      />
      <div className={styles.cardOverlay}>
        <h2 className={styles.cardTitle}>{cardTitle}</h2>
        <p className={styles.cardText}>{cardText}</p>
      </div>
    </div>
  );
}
