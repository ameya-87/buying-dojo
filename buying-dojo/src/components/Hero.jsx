import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const heroImages = [
  {
    src: "https://cdn.mos.cms.futurecdn.net/CjhaHPrrBpAkc57jJLmoPD.jpg",
    alt: "Premium headphones on display",
  },
  {
    src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    alt: "Modern smartphone lineup",
  },
  {
    src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    alt: "Laptop workspace setup",
  },
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    alt: "Wearable tech accessories",
  },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero page-shell">
      <div className="hero-content animate-fade-up">
        <p className="hero-eyebrow">Independent tech buying guidance</p>
        <h1>
          Buy the right tech with less <span className="text-accent">guesswork</span>.
        </h1>
        <p>
          Curated recommendations across key categories, with clear pros, cons, and purchase links.
        </p>

        <div className="hero-actions">
          <button
            className="hero-btn hero-btn-primary"
            type="button"
            onClick={() => navigate("/personalizedpick/mobiles")}
          >
            Request a personalized pick
          </button>
          <button
            className="hero-btn hero-btn-secondary"
            type="button"
            onClick={() => navigate("/category/mobiles")}
          >
            Browse recommendations
          </button>
        </div>
      </div>

      <div className="hero-images">
        {heroImages.map((image) => (
          <div key={image.src} className="hero-image-card surface-card">
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </section>
  );
}
