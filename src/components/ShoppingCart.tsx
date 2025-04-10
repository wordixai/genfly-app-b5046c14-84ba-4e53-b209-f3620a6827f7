import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Coffee, ArrowRight, CreditCard } from "lucide-react";
import { CartItem } from "./CartItem";
import { useCart } from "../hooks/use-cart";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  
  // Close cart when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  
  // Prevent body scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  // Reset checkout state when cart is closed
  useEffect(() => {
    if (!isOpen) {
      setCheckoutStep(0);
      setIsCheckingOut(false);
    }
  }, [isOpen]);
  
  const handleCheckout = () => {
    if (checkoutStep < 2) {
      setCheckoutStep(prev => prev + 1);
    } else {
      setIsCheckingOut(true);
      
      // Simulate checkout process
      setTimeout(() => {
        clearCart();
        setIsCheckingOut(false);
        setCheckoutStep(0);
        onClose();
        // In a real app, you would redirect to checkout page or show success message
        alert("Thank you for your order! It will be ready for pickup soon.");
      }, 1500);
    }
  };
  
  const getCheckoutButtonText = () => {
    if (isCheckingOut) return "Processing...";
    
    switch (checkoutStep) {
      case 0: return "Proceed to Checkout";
      case 1: return "Confirm Order";
      case 2: return "Pay Now";
      default: return "Checkout";
    }
  };
  
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
          
          {/* Cart panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center">
                <ShoppingBag className="mr-2" size={20} />
                {checkoutStep === 0 ? "Your Cart" : checkoutStep === 1 ? "Order Summary" : "Payment"}
              </h2>
              <motion.button
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>
            
            {/* Progress steps */}
            {items.length > 0 && (
              <div className="px-4 pt-2 pb-1 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  {["Cart", "Summary", "Payment"].map((step, index) => (
                    <div key={step} className="flex flex-col items-center">
                      <motion.div 
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          index <= checkoutStep ? "bg-[#6f4e37] text-white" : "bg-gray-200 text-gray-600"
                        }`}
                        animate={{ 
                          scale: index === checkoutStep ? [1, 1.1, 1] : 1,
                          transition: { duration: 0.5 }
                        }}
                      >
                        {index + 1}
                      </motion.div>
                      <span className="text-xs mt-1">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1 px-3">
                  <div className={`h-1 w-full ${checkoutStep >= 1 ? "bg-[#6f4e37]" : "bg-gray-200"}`} />
                  <div className={`h-1 w-full ${checkoutStep >= 2 ? "bg-[#6f4e37]" : "bg-gray-200"}`} />
                </div>
              </div>
            )}
            
            {/* Cart items */}
            <div className="flex-grow overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    className="h-full flex flex-col items-center justify-center text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Coffee size={48} className="mb-4 mx-auto text-[#6f4e37]/50" />
                    </motion.div>
                    <p className="text-center">Your cart is empty</p>
                    <motion.button
                      className="mt-4 text-[#6f4e37] font-medium"
                      onClick={onClose}
                      whileHover={{ scale: 1.05 }}
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                ) : checkoutStep === 0 ? (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <AnimatePresence>
                      {items.map(item => (
                        <CartItem
                          key={item.id}
                          item={item}
                          onUpdateQuantity={updateQuantity}
                          onRemove={removeItem}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : checkoutStep === 1 ? (
                  <motion.div
                    key="summary"
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="font-medium text-lg">Order Summary</h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.quantity} × {item.name}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Tax</span>
                          <span>${(totalPrice * 0.08).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold mt-2">
                          <span>Total</span>
                          <span>${(totalPrice * 1.08).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Pickup Information</h4>
                      <p className="text-sm text-gray-600">
                        Your order will be ready for pickup at our store in approximately 15-20 minutes.
                      </p>
                      <p className="text-sm font-medium mt-2">
                        Aroma Cafe - 123 Coffee Street, San Francisco
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="payment"
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="font-medium text-lg">Payment Method</h3>
                    
                    <div className="space-y-3">
                      <motion.div 
                        className="border border-[#6f4e37] rounded-lg p-4 flex items-center cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-5 h-5 rounded-full border-2 border-[#6f4e37] flex items-center justify-center mr-3">
                          <div className="w-3 h-3 rounded-full bg-[#6f4e37]"></div>
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium">Pay at Pickup</div>
                          <div className="text-sm text-gray-500">Pay when you collect your order</div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="border border-gray-200 rounded-lg p-4 flex items-center cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                        <div className="flex-grow">
                          <div className="font-medium flex items-center">
                            Credit Card <CreditCard size={16} className="ml-1" />
                          </div>
                          <div className="text-sm text-gray-500">Pay now with credit card</div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between font-bold">
                        <span>Total to Pay</span>
                        <span>${(totalPrice * 1.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Footer with total and checkout */}
            {items.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                {checkoutStep === 0 && (
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  {checkoutStep > 0 && (
                    <motion.button
                      className="flex-1 py-3 border border-[#6f4e37] text-[#6f4e37] rounded-lg font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCheckoutStep(prev => prev - 1)}
                      disabled={isCheckingOut}
                    >
                      Back
                    </motion.button>
                  )}
                  
                  <motion.button
                    className="flex-1 py-3 bg-[#6f4e37] text-white rounded-lg font-medium flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <span>{getCheckoutButtonText()}</span>
                        {checkoutStep < 2 && <ArrowRight size={16} className="ml-1" />}
                      </>
                    )}
                  </motion.button>
                </div>
                
                {checkoutStep === 0 && (
                  <motion.button
                    className="w-full mt-2 py-2 text-[#6f4e37] text-sm"
                    onClick={clearCart}
                    whileHover={{ scale: 1.02 }}
                    disabled={isCheckingOut}
                  >
                    Clear Cart
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};