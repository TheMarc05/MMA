import React from 'react';

const PopSection = ({ className }) => {
  return (
    <section className={`pop-section ${className}`}>
      <div className="genre-content">
        <h2>Pop</h2>
        <p>Fresh, fun, and always trending. Bright colors, clean silhouettes, and a little sparkle — perfect for your next main character moment.</p>
      </div>
      <div className="genre-image">
        <img src="/images/pop.jpg" alt="Pop Music" />
      </div>
    </section>
  );
};

export default PopSection;