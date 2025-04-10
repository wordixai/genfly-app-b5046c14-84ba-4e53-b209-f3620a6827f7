import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItemType } from "../types/cart";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    // Small delay to allow animation to play
    setTimeout(() => {
      onRemove(item.id);
    }, 300);
  };

  return (
    <motion.div 
      className="flex items-center py-4 border-b border-gray-200 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      <AnimatePresence>
        {isRemoving && (
          <motion.div 
            className="absolute inset-0 bg-red-500/10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span 
              className="text-red-500 font-medium"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              Removing...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
        {item.image ? (
          <motion.img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
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
          className={`p-1 rounded-full ${item.quantity <= 1 ? 'text-gray-300' : 'text-gray-500 hover:text-[#6f4e37] hover:bg-[#6f4e37]/10'}`}
          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
          whileHover={{ scale: item.quantity <= 1 ? 1 : 1.1 }}
          whileTap={{ scale: item.quantity <= 1 ? 1 : 0.9 }}
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </motion.button>
        
        <motion.span 
          className="mx-2 w-8 text-center font-medium"
          key={item.quantity}
          initial={{ scale: 1.2, color: "#6f4e37" }}
          animate={{ scale: 1, color: "#374151" }}
          transition={{ duration: 0.3 }}
        >
          {item.quantity}
        </motion.span>
        
        <motion.button
          className="p-1 rounded-full text-gray-500 hover:text-[#6f4e37] hover:bg-[#6f4e37]/10"
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
        className="ml-4 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
        onClick={handleRemove}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ opacity: isHovered ? 1 : 0.5 }}
      >
        <Trash2 size={18} />
      </motion.button>
    </motion.div>
  );
};