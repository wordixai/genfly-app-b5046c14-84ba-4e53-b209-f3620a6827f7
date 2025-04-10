import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../hooks/use-cart";
import { ShoppingCart } from "./ShoppingCart";

export const CartButton = () => {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Animate badge when item count changes
  useEffect(() => {
    if (itemCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);
  
  return (
    <>
      <motion.button
        className="relative p-2 text-[#6f4e37] hover:bg-[#6f4e37]/10 rounded-full"
        onClick={() => setIsCartOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ShoppingBag size={24} />
        
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 bg-[#6f4e37] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isAnimating ? 1.2 : 1, 
                opacity: 1 
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              {itemCount}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      
      <ShoppingCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
};