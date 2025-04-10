import { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Cake, Utensils, Search, Eye } from "lucide-react";
import { MenuItemCard } from "../components/MenuItemCard";
import { QuickViewModal } from "../components/QuickViewModal";
import { getMenuItemsByCategory, menuItems } from "../data/menu-items";
import { MenuItem } from "../types/cart";
import { Navbar } from "../components/Navbar";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("coffee");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  
  const categories = [
    { id: "coffee", name: "Coffee & Espresso", icon: <Coffee size={20} /> },
    { id: "pastries", name: "Pastries & Desserts", icon: <Cake size={20} /> },
    { id: "food", name: "Breakfast & Lunch", icon: <Utensils size={20} /> }
  ];
  
  // Filter menu items by category and search query
  const filteredItems = searchQuery 
    ? menuItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : getMenuItemsByCategory(activeCategory);
  
  const handleQuickView = (item: MenuItem) => {
    setQuickViewItem(item);
  };
  
  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <Navbar />
      
      <div className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl font-bold text-center mb-8 text-[#6f4e37]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Menu
          </motion.h1>
          
          {/* Search bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search our menu..."
                className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6f4e37] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              
              {searchQuery && (
                <motion.button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              )}
            </div>
          </div>
          
          {/* Category tabs - only show when not searching */}
          {!searchQuery && (
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
          )}
          
          {/* Search results heading */}
          {searchQuery && (
            <motion.div 
              className="mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-xl text-gray-700">
                {filteredItems.length === 0 
                  ? `No results found for "${searchQuery}"` 
                  : `Search results for "${searchQuery}" (${filteredItems.length} items)`}
              </h2>
            </motion.div>
          )}
          
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
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="relative group"
              >
                <MenuItemCard item={item} />
                
                {/* Quick view button */}
                <motion.button
                  className="absolute top-2 left-2 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleQuickView(item)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Eye size={16} className="text-[#6f4e37]" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Empty state */}
          {filteredItems.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Coffee size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No items found. Try a different search term.</p>
              <motion.button
                className="mt-4 text-[#6f4e37] font-medium"
                onClick={() => setSearchQuery("")}
                whileHover={{ scale: 1.05 }}
              >
                Clear Search
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Quick view modal */}
      <QuickViewModal 
        item={quickViewItem} 
        isOpen={Boolean(quickViewItem)} 
        onClose={() => setQuickViewItem(null)} 
      />
    </div>
  );
};

export default Menu;