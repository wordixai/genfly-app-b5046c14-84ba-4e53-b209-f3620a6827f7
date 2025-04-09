import { ReactNode, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up"
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  // Set initial and animate values based on direction
  const getDirectionValues = () => {
    switch (direction) {
      case "up":
        return { initial: { y: 50 }, animate: { y: 0 } };
      case "down":
        return { initial: { y: -50 }, animate: { y: 0 } };
      case "left":
        return { initial: { x: 50 }, animate: { x: 0 } };
      case "right":
        return { initial: { x: -50 }, animate: { x: 0 } };
      default:
        return { initial: { y: 50 }, animate: { y: 0 } };
    }
  };

  const { initial, animate } = getDirectionValues();

  useEffect(() => {
    if (isInView) {
      controls.start({
        ...animate,
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1.0] // Smooth easing function
        }
      });
    }
  }, [isInView, controls, delay, animate]);

  return (
    <motion.div
      ref={ref}
      initial={{ ...initial, opacity: 0 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};