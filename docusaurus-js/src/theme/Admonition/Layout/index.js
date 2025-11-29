import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import styles from './styles.module.css';

function AdmonitionContainer({type, className, children}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type),
        styles.admonition,
        className,
      )}>
      {children}
    </div>
  );
}

function AdmonitionHeading({icon, title}) {
  return (
    <div className={styles.admonitionHeading}>
      <span className={styles.admonitionIcon}>{icon}</span>
      {title}
    </div>
  );
}

function AdmonitionContent({children}) {
  return children ? (
    <div className={styles.admonitionContent}>{children}</div>
  ) : null;
}

export default function AdmonitionLayout(props) {
  const {type, icon, title, children, className} = props;

  // Hàm phát âm tiếng Anh
const speakEnglish = () => {
  const text = "Learning English opens the door to the world";
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";   // giọng đọc tiếng Anh Mỹ
  utterance.rate = 0.8;       // tốc độ đọc (1.0 = bình thường, <1 = chậm hơn, >1 = nhanh hơn)
  speechSynthesis.speak(utterance);
};

  return (
    <AdmonitionContainer type={type} className={className}>
      {title || icon ? <AdmonitionHeading title={title} icon={icon} /> : null}
      <AdmonitionContent>{children}</AdmonitionContent>
      {/* Nút phát âm */}
      <button onClick={speakEnglish} className={styles.speakButton}>
        🔊 Phát âm tiếng Anh
      </button>
    </AdmonitionContainer>
  );
}