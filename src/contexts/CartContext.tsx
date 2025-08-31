import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book, CartItem, CartContextType } from '../types';

// Create the shopping cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Export the context for direct usage if needed
export { CartContext };

// Props interface for the cart provider
interface CartProviderProps {
  children: ReactNode;
}

// Main shopping cart provider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // State to store cart items
  const [items, setItems] = useState<CartItem[]>([]);

  // Add a book to the cart
  const addToCart = (book: Book, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.book.id === book.id);
      if (existingItem) {
        // If item already exists, increase quantity
        return prevItems.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { book, quantity }];
      }
    });
  };

  // Remove a book from the cart
  const removeFromCart = (bookId: number) => {
    setItems(prevItems => prevItems.filter(item => item.book.id !== bookId))
  };

  // Update the quantity of a specific book
  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.book.id === bookId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear all items from the cart
  const clearCart = () => {
    setItems([]);
  };

  // Calculate the total price of all items in cart
  const getTotal = () => {
    return items.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  };

  // Get the total number of items in cart
  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  // Context value object containing all cart functions and state
  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
