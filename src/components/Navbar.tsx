import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { CartButton } from "./CartButton";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Check scroll position to add background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/#about" },
    { name: "Reviews", path: "/#reviews" },
    { name: "Location", path: "/#location" },
    { name: "Contact", path: "/#contact" }
  ];
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-[#f8f5f2]/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-2xl font-bold text-[#6f4e37]">
            Aroma Cafe
          </Link>
        </motion.div>
        
        <motion.div 
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Link 
                to={item.path} 
                className={`hover:text-[#6f4e37] transition-colors relative group ${
                  location.pathname === item.path ? "text-[#6f4e37]" : "text-gray-800"
                }`}
              >
                {item.name}
                <motion.span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#6f4e37] ${
                    location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                  } transition-all duration-300`}
                  layoutId={`underline-${item.name}`}
                />
              </Link>
            </motion.div>
          ))}
          
          <CartButton />
        </motion.div>
        
        <div className="flex items-center md:hidden">
          <CartButton />
          
          <motion.button 
            className="ml-4 text-[#6f4e37]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                >
                  <Link 
                    to={item.path} 
                    className={`block hover:text-[#6f4e37] transition-colors ${
                      location.pathname === item.path ? "text-[#6f4e37]" : "text-gray-800"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};