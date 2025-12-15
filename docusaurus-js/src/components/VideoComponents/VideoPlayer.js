// src/components/VideoComponents/VideoPlayer.jsx
import React from 'react';

const VideoPlayer = ({ src, width = 640 }) => {
  return (
    <video controls width={width} style={{ maxWidth: '100%' }}>
      <source src={src} type="video/mp4" />
      Trình duyệt của bạn không hỗ trợ video.
    </video>
  );
};

export default VideoPlayer;
