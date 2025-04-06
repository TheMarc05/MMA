import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";
import './theme.css'; // Adjust the path as needed
import './Auth.jsx'; 

const Header = ({ 
  isLoggedIn, 
  setIsLoggedIn, 
  showUserMenu, 
  setShowUserMenu, 
  showCart, 
  setShowCart, 
  theme, 
  toggleTheme, 
  cartItems, 
  removeFromCart, 
  updateQuantity, 
  getCartTotal, 
  getCartItemsCount 
}) => {
  // Închide meniurile când se face click în afara lor
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest(".user-icon-container")) {
        setShowUserMenu(false);
      }
      if (showCart && !event.target.closest(".cart-icon-container")) {
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu, showCart]);

  // Închide meniurile când se apasă tasta Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowUserMenu(false);
        setShowCart(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <img
            src="/icons/logo1.png"
            alt="Logo"
            className="logo-image"
          />
        </Link>
      </div>

      <nav className="nav-menu">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/AboutUs" className="nav-link">
          About Us
        </Link>
        <Link to="/MainShop" className="nav-link">
          Styles
        </Link>
      </nav>

      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <div className="user-icon-container">
          <button
            className="icon-button"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowCart(false);
            }}
          >
            <i className="fas fa-user"></i>
          </button>
          {showUserMenu && (
            <div className="user-menu">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="user-menu-item">
                    Profile
                  </Link>
                  <Link to="/orders" className="user-menu-item">
                    Orders
                  </Link>
                  <button
                    className="user-menu-item"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="user-menu-item">
                  Login
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="cart-icon-container">
          <button
            className="icon-button"
            onClick={() => {
              console.log("Cart icon clicked");
              console.log("Current showCart state:", showCart);
              setShowCart(!showCart);
              setShowUserMenu(false);
            }}
          >
            <i className="fas fa-shopping-cart"></i>
            {getCartItemsCount() > 0 && (
              <span className="cart-count">{getCartItemsCount()}</span>
            )}
          </button>
          {showCart && (
            <div className="cart-menu" style={{ display: 'block' }}>
              <div className="cart-header">
                <h3>Coșul tău</h3>
                <Link to="/cart" className="view-cart-link">
                  Vezi coșul complet
                </Link>
              </div>
              <div className="cart-items">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item) => (
                      <div
                        key={`${item.id}-${item.size}-${item.color}`}
                        className="cart-item"
                      >
                        <div className="cart-item-image">
                          <img src={item.imageUrl} alt={item.name} />
                        </div>
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <p className="cart-item-price">€{item.price}</p>
                          {item.size && <p>Mărime: {item.size}</p>}
                          {item.color && <p>Culoare: {item.color}</p>}
                          <div className="cart-item-quantity">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1,
                                  item.size,
                                  item.color
                                )
                              }
                              className="quantity-btn"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1,
                                  item.size,
                                  item.color
                                )
                              }
                              className="quantity-btn"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          className="remove-item-btn"
                          onClick={() =>
                            removeFromCart(item.id, item.size, item.color)
                          }
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                    <div className="cart-total">
                      <p>Total: €{getCartTotal().toFixed(2)}</p>
                    </div>
                  </>
                ) : (
                  <p className="empty-cart-message">Coșul tău este gol</p>
                )}
              </div>
              <div className="cart-footer">
                {cartItems.length > 0 && (
                  <Link to="/cart" className="checkout-button">
                    Vezi coșul complet
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;