import React from 'react';
import Layout from '@theme/Layout';

import ButtonCard from '../components/ButtonComponents/ButtonCard';
import styles from './vocabulary.module.css';

export default function VocabularyPage() {

    const playAudio = (file) => {
    const audio = new Audio(`/audio/${file}`);
    audio.play().catch((err) => console.log('Playback blocked:', err));
  };

  return (
    <Layout>
      <div className={styles.headingWrapper}>
       <h1
        className={styles.clickableHeading}
        onClick={() => playAudio('vocabulary-h1.mp3')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') playAudio('vocabulary-h1.mp3');       
        }}
      >
        Choose your vocabulary
        <br />
        Lựa chọn từ vựng của bạn
      </h1>
      </div>
      <div className={styles.cardContainer}>
        <ButtonCard
          title="Animal 🐯 | Động Vật"
          description="Animals !!, Learn animal vocabulary. (Động vật !!, Học từ vựng động vật.)"
          audioFile="vocabulary-animals.mp3"
          nextPage="/hello"
          imageSrc="/img/docusaurus-1024x1024.png"
        />

        <ButtonCard
          title="Game 🎮 | Trò Chơi"
          description="Game vocabulary here !! (Từ vựng game ở đây !!)"
          audioFile="vocabulary-game.mp3"
          nextPage="/hello"
          imageSrc="/img/docusaurus1-1024x1024.png"
        />

        <ButtonCard
          title="Food 🥪 | Thức Ăn"
          description="Learn food vocabulary. (Học từ vựng về thức ăn.)"
          audioFile="vocabulary-food.mp3"
          nextPage="/food"
          imageSrc="/img/docusaurus0-1024x1024.png"
        />
      </div>
    </Layout>
  );
}