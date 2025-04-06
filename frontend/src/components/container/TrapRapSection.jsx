import React from 'react';

const TrapRapSection = ({ className }) => {
  return (
    <section className={`trap-rap-section ${className}`}>
      <div className="genre-content">
        <h2>Trap/Rap</h2>
        <p>Bold statements, oversized fits, and luxury streetwear energy. It's not just fashion — it's flexing with finesse.</p>
      </div>
      <div className="genre-image">
        <img src="/images/trap.jpg" alt="Trap/Rap Music" />
      </div>
    </section>
  );
};

export default TrapRapSection;