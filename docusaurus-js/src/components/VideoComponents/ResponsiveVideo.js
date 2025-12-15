import React from 'react';

export const ResponsiveVideo = ({ src, title }) => (
  <div style={{
    position: 'relative',
    paddingBottom: '56.25%', /* tỷ lệ 16:9 */
    height: 0,
    overflow: 'hidden',
    maxWidth: '100%',
  }}>
    <iframe
      src={src}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  </div>
);

export default ResponsiveVideo;



