import { motion } from "framer-motion";

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

export const StaggeredText = ({
  text,
  className = "",
  delay = 0,
  staggerChildren = 0.03
}: StaggeredTextProps) => {
  // Split text into individual characters
  const characters = text.split("");

  // Animation variants
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay
      }
    }
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};