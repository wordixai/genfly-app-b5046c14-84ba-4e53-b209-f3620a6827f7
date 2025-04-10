import { motion } from "framer-motion";
import { AddToCartButton } from "./AddToCartButton";
import { MenuItem } from "../types/cart";

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard = ({ item }: MenuItemCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ duration: 0.3 }}
    >
      {item.image && (
        <div className="relative h-48 overflow-hidden">
          <motion.img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          {item.badge && (
            <div className="absolute top-2 right-2 bg-[#6f4e37] text-white text-xs px-2 py-1 rounded-full">
              {item.badge}
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
          <span className="font-bold text-[#6f4e37]">${item.price.toFixed(2)}</span>
        </div>
        
        {item.description && (
          <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        )}
        
        <AddToCartButton item={item} className="w-full mt-2" />
      </div>
    </motion.div>
  );
};