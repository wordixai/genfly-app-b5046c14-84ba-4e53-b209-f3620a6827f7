import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "../hooks/use-cart";
import { MenuItem } from "../types/cart";

interface AddToCartButtonProps {
  item: MenuItem;
  quantity?: number;
  className?: string;
}

export const AddToCartButton = ({ 
  item, 
  quantity = 1,
  className = ""
}: AddToCartButtonProps) => {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  
  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      image: item.image
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };
  
  return (
    <motion.button
      className={`flex items-center justify-center ${isAdded ? 'bg-green-600' : 'bg-[#6f4e37]'} text-white px-4 py-2 rounded-full ${className}`}
      onClick={handleAddToCart}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isAdded}
    >
      <motion.span
        initial={false}
        animate={{ opacity: isAdded ? 0 : 1, scale: isAdded ? 0.8 : 1 }}
      >
        <ShoppingBag size={16} className="mr-2" />
      </motion.span>
      
      <motion.span
        initial={false}
        animate={{ opacity: isAdded ? 1 : 0, scale: isAdded ? 1 : 0.8 }}
        className="absolute"
      >
        <Check size={16} className="mr-2" />
      </motion.span>
      
      <span>{isAdded ? "Added" : "Add to Cart"}</span>
    </motion.button>
  );
};