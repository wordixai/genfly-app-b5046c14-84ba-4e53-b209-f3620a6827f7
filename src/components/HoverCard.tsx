import { ReactNode } from "react";
import { motion } from "framer-motion";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

export const HoverCard = ({ children, className = "" }: HoverCardProps) => {
  return (
    <motion.div
      className={`${className} relative overflow-hidden`}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-[#6f4e37]/20 to-transparent opacity-0 z-10"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
};