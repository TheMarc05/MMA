import React from 'react';

const TechnoSection = ({ className }) => {
  return (
    <section className={`techno-section ${className}`}>
      <div className="genre-content">
        <h2>Techno</h2>
        <p>Minimalist, futuristic, and rave-ready. Think clean lines, metallic tones, and that underground cool only techno kids know.</p>
      </div>
      <div className="genre-image">
        <img src="/images/techno.jpg" alt="Techno Music" />
      </div>
    </section>
  );
};

export default TechnoSection;