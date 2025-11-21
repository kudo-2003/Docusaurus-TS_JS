import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './cat.module.css';

const phrases = require('@site/src/data/phrases');

function playAudio(id) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
        // rewind and play
        el.currentTime = 0;
        el.play();
    } catch (e) {
        // fallback: create new Audio
        const src = el.getAttribute('src');
        if (src) new Audio(src).play();
    }
}

export default function PhrasesPage() {
    return (
        <Layout title="Phrases - Animals" description="Bilingual animal phrases with audio">
            <main className={styles.container}>
                <Heading as="h1">Câu giao tiếp song ngữ — Động vật</Heading>

                <p className={styles.intro}>Danh sách câu tiếng Anh và tiếng Việt liên quan đến động vật. Nhấn nút phát để nghe Âm thanh (nếu có).</p>

                <div className={styles.list}>
                    {phrases.map((p, idx) => (
                        <div className={styles.item} key={idx}>
                            <div className={styles.row}>
                                <div className={styles.lang}>
                                    <span className={styles.label}>EN:</span>
                                    <span className={styles.text}>{p.en}</span>
                                </div>

                                <div className={styles.controls}>
                                    {p.audio ? (
                                        <>
                                            <button className={styles.play} onClick={() => playAudio(`audio-${idx}`)} aria-label={`Play audio for phrase ${idx}`}>
                                                ▶️ Phát
                                            </button>
                                            <audio id={`audio-${idx}`} src={p.audio} preload="none" />
                                        </>
                                    ) : (
                                        <span className={styles.noAudio}>Không có âm thanh</span>
                                    )}
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.lang}>
                                    <span className={styles.label}>VI:</span>
                                    <span className={styles.text}>{p.vi}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </Layout>
    );
}
