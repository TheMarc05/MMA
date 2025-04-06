import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = ({ theme }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Despre Noi</h3>
          <p>Magazinul nostru de haine oferă cele mai noi tendințe în modă, cu un focus pe calitate și stil.</p>
        </div>
        <div className="footer-section">
          <h3>Link-uri Rapide</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/AboutUs">Despre Noi</Link></li>
            <li><Link to="/MainShop">Magazin</Link></li>
            <li><Link to="/cart">Coș</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li><i className="fas fa-phone"></i> +40 123 456 789</li>
            <li><i className="fas fa-envelope"></i> contact@magazin.ro</li>
            <li><i className="fas fa-map-marker-alt"></i> București, România</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Abonează-te pentru a primi cele mai noi oferte și actualizări.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Adresa ta de email" />
            <button type="submit">Abonează-te</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Magazinul Nostru. Toate drepturile rezervate.</p>
        <div className="social-links">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-pinterest"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
