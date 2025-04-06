import React from "react";
import "./AboutUs.css"; // Make sure this path is correct

const AboutUs = () => {
  return (
    <div className="about-container">
      <video autoPlay muted loop playsInline>
        <source src="/video/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay" />

      <div className="about-content">
        <h1>About MusicStyle</h1>
        <p>
          We don't just sell clothes. We sell a statement—crafted for the sound
          you live by.
        </p>
        <p>
          At <strong> MusicStyle</strong>, fashion meets frequency. Whether
          you're vibing to lo-fi chill, headbanging to metal, or raving in EDM,
          we design collections that sync with your soundtrack.
        </p>
        <p>
          Born from the belief that music and style go hand in hand, our brand
          lets you wear your playlist—loud and proud.
        </p>
        <p>
          Every piece is inspired by a genre, designed for self-expression, and
          created for those who let rhythm rule their world.
        </p>
        <p>🖤 Wear what you feel. 🎵 Be who you are.</p>
      </div>
    </div>
  );
};

export default AboutUs;
