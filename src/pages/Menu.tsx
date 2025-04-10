import { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Cake, Utensils } from "lucide-react";
import { MenuItemCard } from "../components/MenuItemCard";
import { getMenuItemsByCategory } from "../data/menu-items";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("coffee");
  
  const categories = [
    { id: "coffee", name: "Coffee & Espresso", icon: <Coffee size={20} /> },
    { id: "pastries", name: "Pastries & Desserts", icon: <Cake size={20} /> },
    { id: "food", name: "Breakfast & Lunch", icon: <Utensils size={20} /> }
  ];
  
  const menuItems = getMenuItemsByCategory(activeCategory);
  
  return (
    <div className="min-h-screen bg-[#f8f5f2] pt-20 pb-20">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 text-[#6f4e37]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Menu
        </motion.h1>
        
        {/* Category tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full shadow-md p-1">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`flex items-center px-4 py-2 rounded-full text-sm md:text-base ${
                  activeCategory === category.id 
                    ? "bg-[#6f4e37] text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: activeCategory !== category.id ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Menu items grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <MenuItemCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;