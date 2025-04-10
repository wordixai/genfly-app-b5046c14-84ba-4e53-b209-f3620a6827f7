import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Coffee } from "lucide-react";
import { CartItem } from "./CartItem";
import { useCart } from "../hooks/use-cart";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Close cart when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  
  // Prevent body scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      onClose();
      // In a real app, you would redirect to checkout page or show success message
      alert("Thank you for your order! It will be ready for pickup soon.");
    }, 1500);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Cart panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center">
                <ShoppingBag className="mr-2" size={20} />
                Your Cart
              </h2>
              <motion.button
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>
            
            {/* Cart items */}
            <div className="flex-grow overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Coffee size={48} className="mb-4 mx-auto text-[#6f4e37]/50" />
                  </motion.div>
                  <p className="text-center">Your cart is empty</p>
                  <motion.button
                    className="mt-4 text-[#6f4e37] font-medium"
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>
            
            {/* Footer with total and checkout */}
            {items.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                
                <motion.button
                  className="w-full py-3 bg-[#6f4e37] text-white rounded-lg font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                  ) : (
                    "Checkout"
                  )}
                </motion.button>
                
                <motion.button
                  className="w-full mt-2 py-2 text-[#6f4e37] text-sm"
                  onClick={clearCart}
                  whileHover={{ scale: 1.02 }}
                  disabled={isCheckingOut}
                >
                  Clear Cart
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};