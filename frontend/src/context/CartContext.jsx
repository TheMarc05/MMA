import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Încărcăm coșul din localStorage la inițializare
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Salvăm coșul în localStorage când se schimbă
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, size = null, color = null) => {
    setCartItems(prevItems => {
      // Verificăm dacă produsul există deja în coș
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.id === product.id && 
          item.size === size && 
          item.color === color
      );

      if (existingItemIndex !== -1) {
        // Dacă produsul există, adăugăm cantitatea la cea existentă
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity // Adăugăm cantitatea la cea existentă
        };
        return updatedItems;
      } else {
        // Dacă produsul nu există, îl adăugăm în coș
        return [...prevItems, { 
          id: product.id, 
          name: product.name, 
          price: product.price, 
          imageUrl: product.imageUrl,
          quantity,
          size,
          color
        }];
      }
    });
  };

  const removeFromCart = (itemId, size = null, color = null) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === itemId && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (itemId, quantity, size = null, color = null) => {
    if (quantity <= 0) {
      removeFromCart(itemId, size, color);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 