import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleQuantityChange = (itemId, newQuantity, size, color) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity, size, color);
    }
  };

  const handleRemoveItem = (itemId, size, color) => {
    removeFromCart(itemId, size, color);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>You have not added any products to your cart yet.</p>
        <Link to="/MainShop" className="continue-shopping">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
            <div className="cart-item-image">
              <img src={item.imageUrl} alt={item.name} />
            </div>
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">€{item.price}</p>
              {item.size && <p>Size: {item.size}</p>}
              {item.color && <p>Color: {item.color}</p>}
              <div className="cart-item-quantity">
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.size, item.color)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.size, item.color)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
            <button 
              className="remove-item-btn"
              onClick={() => handleRemoveItem(item.id, item.size, item.color)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total: €{getCartTotal().toFixed(2)}</h3>
        </div>
        <div className="cart-actions">
          <Link to="/MainShop" className="continue-shopping">
            Continue shopping
          </Link>
          <Link to="/checkout" className="checkout-button">
            Finalize order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart; 