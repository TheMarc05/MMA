import React from 'react';

const VideoSection = ({ className }) => {
  return (
    <section className={`video-section ${className}`}>
      <div className="genre-content">
        <h2>Choose your style</h2>
        </div>
          <video autoplay muted loop playsinline>
            <source src="/public/video/video.mp4" type="video/mp4" />
        </video>
    </section>
  );
};