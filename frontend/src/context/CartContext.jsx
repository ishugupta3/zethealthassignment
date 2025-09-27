import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (medicine) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.medicine._id === medicine._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.medicine._id === medicine._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      alert(`${medicine.name} added to cart`);
      return [...prevCart, { medicine, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.medicine._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.medicine._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
