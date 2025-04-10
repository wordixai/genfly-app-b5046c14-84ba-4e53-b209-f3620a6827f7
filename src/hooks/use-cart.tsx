import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItemType, CartContextType } from "../types/cart";

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Local storage key
const CART_STORAGE_KEY = "aroma-cafe-cart";

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItemType[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);
  
  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  // Calculate total item count
  const itemCount = items.reduce(
    (count, item) => count + item.quantity, 
    0
  );
  
  // Add item to cart
  const addItem = (newItem: CartItemType) => {
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, newItem];
      }
    });
  };
  
  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  // Remove item from cart
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // Clear entire cart
  const clearCart = () => {
    setItems([]);
  };
  
  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      totalPrice,
      addItem,
      updateQuantity,
      removeItem,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};