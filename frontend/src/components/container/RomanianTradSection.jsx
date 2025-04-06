import React from 'react';

const RomanianTradSection = ({ className }) => {
  return (
    <section className={`romanian-trad-section ${className}`}>
      <div className="genre-content">
        <h2>Traditional Music</h2>
        <p>Rooted in heritage, wrapped in folklore. Authentic patterns, vibrant embroidery, and modern nods to timeless tradition.</p>
      </div>
      <div className="genre-image">
        <img src="/images/rom.jpg" alt="Traditional Music" />
      </div>
    </section>
  );
};

export default RomanianTradSection;