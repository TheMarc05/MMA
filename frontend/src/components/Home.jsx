import React, { useEffect } from "react";
import "./Home.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RockSection from "./container/rockSection";
import PopSection from "./container/PopSection";
import ClassicJazzSection from "./container/ClassicJazzSection";
import TechnoSection from "./container/TechnoSection";
import TrapRapSection from "./container/TrapRapSection";
import RomanianTradSection from "./container/RomanianTradSection";

// Înregistrăm plugin-ul ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Stiluri simple pentru efectele de hover
const additionalStyles = `
  <style>
    .genre-image {
      overflow: hidden;
      border-radius: 10px;
      transition: transform 0.4s ease-out;
    }

    .genre-image img {
      transition: transform 0.4s ease-out;
      user-select: none;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      pointer-events: none;
    }

    .genre-section .genre-image {
      transform: scale(1);
      transition: transform 0.4s ease-out;
    }

    .genre-section .genre-image:hover {
      transform: scale(1.05);
    }
    
    .genre-content h2 {
      transition: transform 0.3s ease;
    }
    
    .genre-content h2:hover {
      transform: scale(1.05);
    }
  </style>
`;

const Home = () => {
  useEffect(() => {
    // Adaug stilurile suplimentare în head
    document.head.insertAdjacentHTML("beforeend", additionalStyles);

    // Curățăm stilurile la unmount
    return () => {
      const styleElement = document.head.querySelector("style:last-child");
      if (styleElement && styleElement.textContent.includes(".genre-image")) {
        styleElement.remove();
      }
    };
  }, []);

  useEffect(() => {
    // Asigurăm-ne că DOM-ul este complet încărcat
    const animateElements = () => {
      try {
        // Animație pentru secțiuni
        const sections = gsap.utils.toArray(".genre-section > div");
        if (sections.length > 0) {
          sections.forEach((section) => {
            gsap.fromTo(
              section,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.5,
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );

            // Animație pentru titlurile din această secțiune
            const title = section.querySelector(".genre-content h2");
            if (title) {
              gsap.fromTo(
                title,
                { opacity: 0, scale: 0.9 },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.8,
                  delay: 0.3,
                  ease: "back.out(1.7)",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                  },
                }
              );
            }

            // Verificăm dacă secțiunea este reversed sau normal layout
            const isReversed =
              section.querySelector(".reversed-layout") !== null;

            // Animație pentru paragrafele din această secțiune
            const paragraph = section.querySelector(".genre-content p");
            if (paragraph) {
              gsap.fromTo(
                paragraph,
                { opacity: 0, x: isReversed ? 20 : -20 }, // Din dreapta pentru reversed, din stânga pentru normal
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.8,
                  delay: 0.5,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                  },
                }
              );
            }

            // Animație pentru imaginile din această secțiune
            const image = section.querySelector(".genre-image img");
            if (image) {
              gsap.fromTo(
                image,
                {
                  opacity: 0,
                  x: isReversed ? -250 : 250,
                },
                {
                  opacity: 1,
                  x: 0,
                  duration: 1.2,
                  delay: 0.2,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                  },
                }
              );
            }
          });
        }
      } catch (error) {
        console.error("Animation error:", error);
        // Afișăm conținutul chiar dacă animațiile eșuează
        gsap.set(".genre-section > div", { opacity: 1 });
        gsap.set(".genre-content h2, .genre-content p, .genre-image img", {
          opacity: 1,
          scale: 1,
        });
      }
    };

    // Pornim animațiile după ce header-ul a terminat de animat și pagina este încărcată
    const startAnimationsWhenReady = () => {
      if (window.headerAnimationComplete) {
        if (document.readyState === "complete") {
          animateElements();
        } else {
          window.addEventListener("load", animateElements);
          return () => window.removeEventListener("load", animateElements);
        }
      } else {
        setTimeout(startAnimationsWhenReady, 100);
      }
    };

    startAnimationsWhenReady();
  }, []);

  return (
    <div className="home">
      <div className="genre-section">
        <div className="rock-section-container">
          <RockSection className="normal-layout" />
        </div>
        <div className="pop-section-container">
          <PopSection className="reversed-layout" />
        </div>
        <div className="classic-jazz-section-container">
          <ClassicJazzSection className="normal-layout" />
        </div>
        <div className="techno-section-container">
          <TechnoSection className="reversed-layout" />
        </div>
        <div className="trap-rap-section-container">
          <TrapRapSection className="normal-layout" />
        </div>
        <div className="romanian-trad-section-container">
          <RomanianTradSection className="reversed-layout" />
        </div>
      </div>
    </div>
  );
};

export default Home;
