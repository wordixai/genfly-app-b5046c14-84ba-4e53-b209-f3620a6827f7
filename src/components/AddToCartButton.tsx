import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check, Plus, Minus } from "lucide-react";
import { useCart } from "../hooks/use-cart";
import { MenuItem } from "../types/cart";

interface AddToCartButtonProps {
  item: MenuItem;
  className?: string;
  showQuantity?: boolean;
}

export const AddToCartButton = ({ 
  item, 
  className = "",
  showQuantity = false
}: AddToCartButtonProps) => {
  const { addItem, items } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  
  // Check if item is already in cart
  const existingItem = items.find(cartItem => cartItem.id === item.id);
  const isInCart = Boolean(existingItem);
  
  const handleAddToCart = () => {
    if (showQuantity) {
      setShowOptions(true);
    } else {
      addItemToCart();
    }
  };
  
  const addItemToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      image: item.image
    });
    
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setShowOptions(false);
      setQuantity(1);
    }, 1500);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };
  
  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {showOptions ? (
          <motion.div 
            className="flex items-center justify-between bg-white rounded-full shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <motion.button
              className="p-2 text-[#6f4e37] hover:bg-[#6f4e37]/10"
              onClick={decrementQuantity}
              whileTap={{ scale: 0.9 }}
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </motion.button>
            
            <span className="font-medium text-gray-800 w-8 text-center">{quantity}</span>
            
            <motion.button
              className="p-2 text-[#6f4e37] hover:bg-[#6f4e37]/10"
              onClick={incrementQuantity}
              whileTap={{ scale: 0.9 }}
              disabled={quantity >= 10}
            >
              <Plus size={16} />
            </motion.button>
            
            <motion.button
              className="bg-[#6f4e37] text-white px-4 py-2 ml-2"
              onClick={addItemToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            className={`flex items-center justify-center ${isAdded ? 'bg-green-600' : isInCart ? 'bg-[#8a6d5f]' : 'bg-[#6f4e37]'} text-white px-4 py-2 rounded-full w-full`}
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isAdded}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div
                  key="added"
                  className="flex items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Check size={16} className="mr-2" />
                  <span>Added</span>
                </motion.div>
              ) : isInCart ? (
                <motion.div
                  key="in-cart"
                  className="flex items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <ShoppingBag size={16} className="mr-2" />
                  <span>Add More</span>
                  {existingItem && (
                    <span className="ml-1 bg-white text-[#6f4e37] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {existingItem.quantity}
                    </span>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="add"
                  className="flex items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <ShoppingBag size={16} className="mr-2" />
                  <span>Add to Cart</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Floating notification */}
      <AnimatePresence>
        {isAdded && (
          <motion.div
            className="absolute -top-10 left-0 right-0 bg-green-600 text-white text-sm py-1 px-3 rounded-full text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};