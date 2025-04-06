import React from "react";
import { NavLink } from "react-router-dom";
import "./ProductBox.css";

const ProductBox = (props) => {
  // Funcție pentru a genera steluțele de rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Adăugăm steluțe pline
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="star filled">★</span>);
    }
    
    // Adăugăm o jumătate de stea dacă este cazul
    if (hasHalfStar) {
      stars.push(<span key="half-star" className="star half-filled">★</span>);
    }
    
    // Adăugăm steluțe goale pentru a completa până la 5
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-star-${i}`} className="star">★</span>);
    }
    
    return stars;
  };

  return (
    <NavLink to={`/product/${props.id}`} className="product-link">
      <div className="product-box" title={props.title}>
        <img
          className="product-image"
          src={props.image}
          alt={props.title}
        />
        <div className="product-overlay">
          <div className="product-overlay-content">
            <div className="product-overlay-icon">🛍️</div>
            <div className="product-overlay-price">€{props.price}</div>
          </div>
        </div>
        <p className="product-title">{props.title}</p>
        <div className="product-details">
          <span className="product-price">€{props.price}</span>
          <div className="product-rating">
            {renderStars(props.rating.rate)}
            <span className="rating-value">({props.rating.rate})</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductBox;
