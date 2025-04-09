import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Coffee, Clock, MapPin, Phone, Instagram, Facebook, Twitter } from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#2d2a27]">
      {/* Navigation */}
      <nav className="fixed w-full bg-[#f8f5f2]/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-[#6f4e37]">Aroma Cafe</a>
          
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="hover:text-[#6f4e37] transition-colors">About</a>
            <a href="#menu" className="hover:text-[#6f4e37] transition-colors">Menu</a>
            <a href="#location" className="hover:text-[#6f4e37] transition-colors">Location</a>
            <a href="#contact" className="hover:text-[#6f4e37] transition-colors">Contact</a>
          </div>
          
          <button 
            className="md:hidden text-[#6f4e37]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a href="#about" className="hover:text-[#6f4e37] transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#menu" className="hover:text-[#6f4e37] transition-colors" onClick={() => setIsMenuOpen(false)}>Menu</a>
              <a href="#location" className="hover:text-[#6f4e37] transition-colors" onClick={() => setIsMenuOpen(false)}>Location</a>
              <a href="#contact" className="hover:text-[#6f4e37] transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Cafe interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Aroma Cafe
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the perfect blend of artisanal coffee and delicious food in a cozy atmosphere.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a 
              href="#menu" 
              className="bg-[#6f4e37] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#5d4130] transition-colors inline-block"
            >
              View Menu
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Coffee being prepared" 
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#6f4e37]">Our Story</h2>
              <p className="text-lg mb-6 text-gray-700">
                Founded in 2010, Aroma Cafe started with a simple mission: to serve exceptional coffee in a warm, welcoming environment. Our beans are ethically sourced from sustainable farms around the world and roasted in-house to ensure the freshest flavor.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                Beyond coffee, we take pride in our handcrafted pastries and wholesome meals made from locally sourced ingredients. Our cafe is designed to be a community hub—a place where people can connect, work, or simply enjoy a moment of tranquility.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Coffee className="text-[#6f4e37] mr-2" size={20} />
                  <span>Premium Beans</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-[#6f4e37] mr-2" size={20} />
                  <span>Open Daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Menu Section */}
      <section id="menu" className="py-20 bg-[#f8f5f2]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#6f4e37]">Our Menu</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-[#6f4e37]">{category.name}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="font-medium">${item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="#" 
              className="border-2 border-[#6f4e37] text-[#6f4e37] px-8 py-3 rounded-full text-lg font-medium hover:bg-[#6f4e37] hover:text-white transition-colors inline-block"
            >
              Full Menu
            </a>
          </div>
        </div>
      </section>
      
      {/* Location Section */}
      <section id="location" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#6f4e37]">Visit Us</h2>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-[#f8f5f2] p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Hours & Location</h3>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <Clock className="mr-2 text-[#6f4e37]" size={20} />
                    Opening Hours
                  </h4>
                  <ul className="space-y-1 ml-7">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>7:00 AM - 8:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday - Sunday</span>
                      <span>8:00 AM - 9:00 PM</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <MapPin className="mr-2 text-[#6f4e37]" size={20} />
                    Address
                  </h4>
                  <address className="not-italic ml-7">
                    123 Coffee Street<br />
                    San Francisco, CA 94110<br />
                    <a href="tel:+14155551234" className="flex items-center mt-2 text-[#6f4e37]">
                      <Phone size={16} className="mr-1" />
                      (415) 555-1234
                    </a>
                  </address>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80" 
                alt="Cafe exterior" 
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact/Newsletter Section */}
      <section id="contact" className="py-20 bg-[#6f4e37] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for updates on events, seasonal specials, and exclusive offers.
          </p>
          
          <form className="max-w-md mx-auto mb-12">
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-[#2d2a27] px-6 py-3 rounded-r-lg font-medium hover:bg-black transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
          
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-gray-300 transition-colors">
              <Instagram size={28} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <Facebook size={28} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <Twitter size={28} />
            </a>
          </div>
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
    </div>
  );
};

// Menu data
const menuCategories = [
  {
    name: "Coffee & Espresso",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    items: [
      { name: "Espresso", price: 3.50 },
      { name: "Americano", price: 4.00 },
      { name: "Cappuccino", price: 4.50 },
      { name: "Latte", price: 4.75 },
      { name: "Mocha", price: 5.25 }
    ]
  },
  {
    name: "Pastries & Desserts",
    image: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    items: [
      { name: "Croissant", price: 3.75 },
      { name: "Chocolate Muffin", price: 4.25 },
      { name: "Cinnamon Roll", price: 4.50 },
      { name: "Cheesecake", price: 5.50 },
      { name: "Apple Pie", price: 5.25 }
    ]
  },
  {
    name: "Breakfast & Lunch",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    items: [
      { name: "Avocado Toast", price: 8.50 },
      { name: "Breakfast Sandwich", price: 9.25 },
      { name: "Quiche of the Day", price: 7.75 },
      { name: "Chicken Panini", price: 10.50 },
      { name: "Vegetable Wrap", price: 9.75 }
    ]
  }
];

export default Index;