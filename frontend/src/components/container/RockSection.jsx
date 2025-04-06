import React from "react";/*
import { gsap } from "gsap";
import { OpenAIRealtimeWebSocket } from "openai/beta/realtime/websocket.mjs";*/

const RockSection = ({ className }) => {
  return (
    <section className={`rock-section ${className}`}>
      <div className="genre-content">
        <h2>Rock</h2>
        <p>Channel your inner rebel with edgy threads, leather vibes, and dark tones.</p>
         <p>For those who walk loud and proud — no apologies, just attitude.</p>
      </div>
      <div className="genre-image">
        <img src="/images/rock.jpg" alt="Rock Music" />
      </div>
    </section>
  );
};

export default RockSection;
