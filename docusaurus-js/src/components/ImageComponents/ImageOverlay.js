import React from 'react';
import styles from './ImageOverlay.module.css';

export default function ImageOverlay({ src, alt, caption }) {
  return (
<div className="container">
  <img src="/img/png/blog/coccoc.png" alt="CocCoc logo" className="image" />
  <div className="overlay">
    Đây là mô tả nằm đè trên hình, ở phía dưới cùng
  </div>
</div>


  );
}
