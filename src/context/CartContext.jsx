import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { auth } = useAuth();

  const addToCart = (product) => {
    if (!auth.isAuthenticated) {
      setShowLoginPrompt(true);
      return false;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    return true;
  };

  const removeFromCart = (productId) => {
    if (!auth.isAuthenticated) {
      setShowLoginPrompt(true);
      return false;
    }
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    return true;
  };

  const updateQuantity = (productId, newQuantity) => {
    if (!auth.isAuthenticated) {
      setShowLoginPrompt(true);
      return false;
    }
    if (newQuantity < 1) return false;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    return true;
  };

  const clearCart = () => {
    if (!auth.isAuthenticated) {
      setShowLoginPrompt(true);
      return false;
    }
    setCart([]);
    return true;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => 
      total + (parseFloat(item.min_max_price.special_price) * item.quantity), 0
    );
  };

  const closeLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        getCartTotal,
        showLoginPrompt,
        closeLoginPrompt
      }}
    >
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