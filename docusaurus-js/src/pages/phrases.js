import React, {useState, useRef, useEffect} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Head from '@docusaurus/Head';
import styles from './phrases.module.css';

const phrases = require('@site/src/data/phrases') || [];

const DEFAULT_VIDEO = 'https://www.w3schools.com/html/mov_bbb.mp4';
const LOCAL_VIDEO = encodeURI('/videos/animal/624×624-food.mp4');

function playAudioSrc(src) {
  if (!src) return;
  try {
    const a = new Audio(src);
    a.play();
  } catch (e) {
    // ignore
  }
}

export default function PhrasesPage() {
  const [selected, setSelected] = useState(0);
  const [videoSrc, setVideoSrc] = useState(DEFAULT_VIDEO);
  const videoRef = useRef(null);

    const videos = require('@site/src/data/videos') || [];
    
    const items = phrases.map((p, i) => ({
      title: p.en || `Item ${i + 1}`,
      caption: p.vi || '',
      video: p.video || (videos.length ? videos[i % videos.length] : DEFAULT_VIDEO),
      audio: p.audio || null,
    }));

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.src = videoSrc;
    const playTry = async () => {
      try {
        v.currentTime = 0;
        await v.play();
      } catch (e) {
        // ignore autoplay failures
      }
    };
    playTry();
  }, [videoSrc]);

  const onCardClick = (i) => {
    const it = items[i];
    setSelected(i);
    if (it.audio) playAudioSrc(it.audio);
    if (it.video) setVideoSrc(it.video);
  };

  return (
    <Layout title="Phrases" description="Video with overlay clickable cards">
      <main className={styles.page}>
        <Heading as="h1">Video with Clickable Cards</Heading>
        <p className={styles.lead}>Nhấn vào một thẻ để bật video tương ứng; video lặp lại tự động. Các chữ hiển thị đè lên video với nền trong suốt.</p>

        <div className={styles.grid}>
          {items.map((it, i) => (
            <div
              key={i}
              className={`${styles.card} ${selected === i ? styles.selected : ''}`}
              onClick={() => onCardClick(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onCardClick(i); }}
            >
              <video
                className={styles.cardVideo}
                src={it.video}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />

              <div className={styles.cardOverlay}>
                <div className={styles.title}>{it.title}</div>
                <div className={styles.caption}>{it.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
