// src/components/SpeakButton.js
import React from 'react';

// export default function SpeakButton({ text }) {
//   const speak = () => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-US";
//     speechSynthesis.speak(utterance);
//   };
//   return <button onClick={speak}>🔊Nghe</button>;
// }

export default function SpeakButton({ text }) {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);

    // Ngôn ngữ: có thể đổi sang "vi-VN" nếu muốn đọc tiếng Việt
    utterance.lang = "en-US";

    // Tốc độ đọc (0.1 - 10, mặc định 1)
    utterance.rate = 0.75; // chậm lại một chút cho dễ nghe

    // Cao độ giọng (0 - 2, mặc định 1)
    utterance.pitch = 1.1; // tăng nhẹ cho giọng tự nhiên hơn

    // Âm lượng (0 - 1, mặc định 1)
    utterance.volume = 1;

    // Chọn giọng (nếu hệ thống có nhiều voice)
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang === "en-US" && v.name.includes("Google"));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    speechSynthesis.speak(utterance);
  };

  return <button onClick={speak}>🔊 Nghe</button>;
}

