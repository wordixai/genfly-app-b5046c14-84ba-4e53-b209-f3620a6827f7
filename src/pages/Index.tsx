import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Coffee, Clock, MapPin, Phone, Instagram, Facebook, Twitter, ArrowUp, Quote } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { AnimatedSection } from "../components/AnimatedSection";
import { ParallaxImage } from "../components/ParallaxImage";
import { StaggeredText } from "../components/StaggeredText";
import { ScrollProgress } from "../components/ScrollProgress";
import { HoverCard } from "../components/HoverCard";
import { ReviewCarousel } from "../components/ReviewCarousel";
import { AddToCartButton } from "../components/AddToCartButton";
import { menuItems } from "../data/menu-items";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();

  // Check scroll position to show/hide scroll-to-top button
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setShowScrollTop(latest > 500);
    });
  }, [scrollY]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get featured items (one from each category)
  const featuredItems = [
    menuItems.find(item => item.category === "coffee" && item.badge === "Popular"),
    menuItems.find(item => item.category === "pastries" && item.badge === "Fresh"),
    menuItems.find(item => item.category === "food" && item.badge === "Popular")
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#2d2a27]">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxImage 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Cafe interior"
            className="w-full h-full"
            speed={0.3}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <StaggeredText 
            text="Aroma Cafe"
            className="text-5xl md:text-7xl font-bold mb-6"
            delay={0.3}
          />
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Experience the perfect blend of artisanal coffee and delicious food in a cozy atmosphere.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/menu">
              <motion.button 
                className="bg-[#6f4e37] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#5d4130] transition-colors inline-block"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                View Menu
              </motion.button>
            </Link>
            
            <a href="#featured">
              <motion.button 
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white/10 transition-colors inline-block"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Featured Items
              </motion.button>
            </a>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <a href="#about" className="text-white">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Items Section */}
      <section id="featured" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold mb-12 text-center text-[#6f4e37]">Featured Items</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              item && (
                <AnimatedSection key={item.id} delay={0.2 * index}>
                  <HoverCard className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {item.badge && (
                        <div className="absolute top-2 right-2 bg-[#6f4e37] text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-[#6f4e37]">{item.name}</h3>
                        <span className="font-bold">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-gray-700 mb-4 flex-grow">{item.description}</p>
                      <AddToCartButton item={item} />
                    </div>
                  </HoverCard>
                </AnimatedSection>
              )
            ))}
          </div>
          
          <AnimatedSection delay={0.6}>
            <div className="mt-12 text-center">
              <Link to="/menu">
                <motion.button 
                  className="border-2 border-[#6f4e37] text-[#6f4e37] px-8 py-3 rounded-full text-lg font-medium hover:bg-[#6f4e37] hover:text-white transition-colors inline-block"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Full Menu
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-[#f8f5f2]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <AnimatedSection className="md:w-1/2" direction="left">
              <ParallaxImage 
                src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Coffee being prepared" 
                className="rounded-lg shadow-lg w-full h-[400px]"
              />
            </AnimatedSection>
            
            <div className="md:w-1/2">
              <AnimatedSection delay={0.2} direction="right">
                <h2 className="text-3xl font-bold mb-6 text-[#6f4e37]">Our Story</h2>
              </AnimatedSection>
              
              <AnimatedSection delay={0.3} direction="right">
                <p className="text-lg mb-6 text-gray-700">
                  Founded in 2010, Aroma Cafe started with a simple mission: to serve exceptional coffee in a warm, welcoming environment. Our beans are ethically sourced from sustainable farms around the world and roasted in-house to ensure the freshest flavor.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.4} direction="right">
                <p className="text-lg mb-6 text-gray-700">
                  Beyond coffee, we take pride in our handcrafted pastries and wholesome meals made from locally sourced ingredients. Our cafe is designed to be a community hub—a place where people can connect, work, or simply enjoy a moment of tranquility.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.5} direction="right">
                <div className="flex items-center space-x-6">
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Coffee className="text-[#6f4e37] mr-2" size={20} />
                    <span>Premium Beans</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock className="text-[#6f4e37] mr-2" size={20} />
                    <span>Open Daily</span>
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-[#6f4e37]">Customer Reviews</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our customers have to say about their Aroma Cafe experience.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.3}>
            <div className="relative">
              <motion.div 
                className="absolute -top-16 -left-8 opacity-10 text-[#6f4e37]"
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 0.1, rotate: 0 }}
                transition={{ duration: 1 }}
              >
                <Quote size={120} />
              </motion.div>
              
              <ReviewCarousel reviews={customerReviews} />
              
              <motion.div 
                className="absolute -bottom-16 -right-8 opacity-10 text-[#6f4e37] rotate-180"
                initial={{ opacity: 0, rotate: 200 }}
                animate={{ opacity: 0.1, rotate: 180 }}
                transition={{ duration: 1 }}
              >
                <Quote size={120} />
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Location Section */}
      <section id="location" className="py-20 bg-[#f8f5f2]">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold mb-12 text-center text-[#6f4e37]">Visit Us</h2>
          </AnimatedSection>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <AnimatedSection className="md:w-1/2" direction="left">
              <motion.div 
                className="bg-white p-8 rounded-lg"
                whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <h3 className="text-2xl font-bold mb-6">Hours & Location</h3>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <Clock className="mr-2 text-[#6f4e37]" size={20} />
                    Opening Hours
                  </h4>
                  <ul className="space-y-1 ml-7">
                    <motion.li 
                      className="flex justify-between"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span>Monday - Friday</span>
                      <span>7:00 AM - 8:00 PM</span>
                    </motion.li>
                    <motion.li 
                      className="flex justify-between"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <span>Saturday - Sunday</span>
                      <span>8:00 AM - 9:00 PM</span>
                    </motion.li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <MapPin className="mr-2 text-[#6f4e37]" size={20} />
                    Address
                  </h4>
                  <motion.address 
                    className="not-italic ml-7"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    123 Coffee Street<br />
                    San Francisco, CA 94110<br />
                    <motion.a 
                      href="tel:+14155551234" 
                      className="flex items-center mt-2 text-[#6f4e37]"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Phone size={16} className="mr-1" />
                      (415) 555-1234
                    </motion.a>
                  </motion.address>
                </div>
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection className="md:w-1/2" direction="right">
              <ParallaxImage 
                src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80" 
                alt="Cafe exterior" 
                className="rounded-lg shadow-lg w-full h-[400px]"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Contact/Newsletter Section */}
      <section id="contact" className="py-20 bg-[#6f4e37] text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for updates on events, seasonal specials, and exclusive offers.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.3}>
            <form className="max-w-md mx-auto mb-12">
              <div className="flex">
                <motion.input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none"
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(111, 78, 55, 0.3)" }}
                />
                <motion.button 
                  type="submit" 
                  className="bg-[#2d2a27] px-6 py-3 rounded-r-lg font-medium hover:bg-black transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
          </AnimatedSection>
          
          <AnimatedSection delay={0.4}>
            <div className="flex justify-center space-x-6">
              {[
                { icon: <Instagram size={28} />, href: "#" },
                { icon: <Facebook size={28} />, href: "#" },
                { icon: <Twitter size={28} />, href: "#" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className="hover:text-gray-300 transition-colors"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#2d2a27] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2023 Aroma Cafe. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Careers</a>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-6 right-6 bg-[#6f4e37] text-white p-3 rounded-full shadow-lg z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

// Customer reviews data
const customerReviews = [
  {
    id: 1,
    name: "Emily Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    date: "June 12, 2023",
    text: "The atmosphere here is so inviting! I love spending my mornings working remotely from Aroma Cafe. Their cappuccino is absolutely perfect - creamy with just the right amount of foam. The staff remembers my order and always greets me with a smile."
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating: 4,
    date: "May 28, 2023",
    text: "Aroma Cafe has become my go-to spot for business meetings. The quiet ambiance and reliable Wi-Fi make it perfect for productivity. Their breakfast sandwich is a must-try - the homemade bread makes all the difference. Only wish they had more savory options."
  },
  {
    id: 3,
    name: "Sophia Martinez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    date: "July 3, 2023",
    text: "I can't say enough good things about the pastries here! The chocolate croissants are flaky perfection, and their seasonal fruit tarts are always a delight. I've tried to recreate them at home but nothing compares. This place is a gem in the neighborhood."
  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    date: "April 15, 2023",
    text: "As a coffee enthusiast, I'm quite picky about my espresso. Aroma Cafe consistently delivers exceptional quality. Their single-origin offerings rotate regularly, and the baristas are knowledgeable about the flavor profiles. It's clear they take their craft seriously."
  },
  {
    id: 5,
    name: "Olivia Kim",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating: 4,
    date: "June 30, 2023",
    text: "The lunch menu here is surprisingly good for a cafe! I had the vegetable wrap with their homemade hummus, and it was fresh and flavorful. The outdoor seating area is lovely on sunny days. Service can be a bit slow during peak hours, but the quality makes up for it."
  }
];

export default Index;