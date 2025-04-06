import React from 'react';

const ClassicJazzSection = ({ className }) => {
  return (
    <section className={`classic-jazz-section ${className}`}>
      <div className="genre-content">
        <h2>Classic/Jazz</h2>
        <p>Elegant, timeless, and effortlessly cool. Sophisticated pieces with vintage flair and smooth textures for those with an ear for style.</p>
      </div>
      <div className="genre-image">
        <img src="/images/jazzClassic.jpg" alt="Classic/Jazz Music" />
      </div>
    </section>
  );
};

export default ClassicJazzSection;