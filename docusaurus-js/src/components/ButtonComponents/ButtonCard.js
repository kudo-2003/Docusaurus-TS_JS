import React, { useState, useRef } from "react";
import styles from "./ButtonCard.module.css";

export default function ButtonCard({ title, description, audioFile, nextPage, imageSrc }) {
  const [cardTitle, setCardTitle] = useState(title);
  const [cardText, setCardText] = useState(description);
  const audioRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();

    // Nếu đã có audio đang phát → dừng lại trước
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(`/audio/${audioFile}`);
    audioRef.current = audio;

    // Phát audio chính
    audio.play()
      .then(() => {
        audio.onended = () => {
          setCardTitle("Good & Tốt");
          setCardText("Start learning vocabulary... (Bắt đầu học từ vựng...)");

          const goodAudio = new Audio("/audio/good/good.mp3");

          goodAudio.play()
            .then(() => {
              goodAudio.onended = () => {
                // Phát startAudio ngay sau khi goodAudio kết thúc
                const startAudio = new Audio("/audio/order/start-vocabulary.mp3");

                startAudio.play()
                  .then(() => {
                    startAudio.onended = () => {
                      window.location.assign(nextPage); 
                      // Nếu dùng React Router: navigate(nextPage)
                    };
                  })
                  .catch(err => console.log("Playback blocked:", err));
              };
            })
            .catch(err => console.log("Playback blocked:", err));
        };
      })
      .catch(err => console.log("Playback blocked:", err));

    setCardTitle(title);
    setCardText(description);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={imageSrc} alt="Card" className={styles.cardImage} />
      <div className={styles.cardOverlay}>
        <h2 className={styles.cardTitle}>{cardTitle}</h2>
        <p className={styles.cardText}>{cardText}</p>
      </div>
    </div>
  );
}
