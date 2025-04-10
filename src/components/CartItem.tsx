import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItemType } from "../types/cart";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="flex items-center py-4 border-b border-gray-200 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#6f4e37]/10 text-[#6f4e37]">
            {item.name.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="ml-4 flex-grow">
        <h4 className="font-medium text-gray-800">{item.name}</h4>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center">
        <motion.button
          className="p-1 text-gray-500 hover:text-[#6f4e37]"
          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </motion.button>
        
        <span className="mx-2 w-8 text-center">{item.quantity}</span>
        
        <motion.button
          className="p-1 text-gray-500 hover:text-[#6f4e37]"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus size={16} />
        </motion.button>
      </div>
      
      <div className="ml-4 w-20 text-right font-medium">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      
      <motion.button
        className="ml-4 p-1 text-gray-400 hover:text-red-500"
        onClick={() => onRemove(item.id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ opacity: isHovered ? 1 : 0.5 }}
      >
        <Trash2 size={18} />
      </motion.button>
    </motion.div>
  );
};