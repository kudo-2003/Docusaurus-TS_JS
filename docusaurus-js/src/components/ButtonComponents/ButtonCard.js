import React, { useState } from "react";
import styles from "./ButtonCard.module.css";

export default function ButtonCard({ title, description, audioFile, nextPage, imageSrc }) {
  const [cardTitle, setCardTitle] = useState(title);
  const [cardText, setCardText] = useState(description);

  const handleClick = (e) => {
    e.preventDefault();

    const audio = new Audio(`/audio/${audioFile}`);
    audio.play().catch(err => console.log("Playback blocked:", err));

    setCardTitle(title);
    setCardText(description);

    audio.onended = () => {
      setCardTitle("Good");
      setCardText("Đang chuyển trang...");
      window.location.href = nextPage;
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
