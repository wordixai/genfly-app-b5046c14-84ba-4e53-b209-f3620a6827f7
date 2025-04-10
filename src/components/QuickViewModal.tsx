import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { MenuItem } from "../types/cart";
import { AddToCartButton } from "./AddToCartButton";

interface QuickViewModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal = ({ item, isOpen, onClose }: QuickViewModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Close modal when pressing escape key
  useState(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  });
  
  if (!item) return null;
  
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
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1 text-gray-800 hover:bg-white"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
              
              {/* Image */}
              <div className="relative h-64 bg-gray-100">
                {item.image && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-gray-200 flex items-center justify-center"
                      animate={{ opacity: imageLoaded ? 0 : 1 }}
                    >
                      <motion.div
                        className="w-8 h-8 border-4 border-[#6f4e37] border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                    </motion.div>
                    <motion.img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: imageLoaded ? 1 : 0 }}
                      onLoad={() => setImageLoaded(true)}
                    />
                  </>
                )}
                
                {item.badge && (
                  <div className="absolute top-2 left-2 bg-[#6f4e37] text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  <span className="font-bold text-[#6f4e37] text-lg">${item.price.toFixed(2)}</span>
                </div>
                
                {item.description && (
                  <p className="text-gray-600 mb-6">{item.description}</p>
                )}
                
                <div className="mt-6">
                  <AddToCartButton item={item} showQuantity={true} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};