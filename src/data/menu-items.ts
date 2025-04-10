import { MenuItem } from "../types/cart";
import { v4 as uuidv4 } from "uuid";

export const menuItems: MenuItem[] = [
  // Coffee & Espresso
  {
    id: uuidv4(),
    name: "Espresso",
    price: 3.50,
    description: "Rich and intense shot of pure coffee essence",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "coffee",
  },
  {
    id: uuidv4(),
    name: "Americano",
    price: 4.00,
    description: "Espresso diluted with hot water for a milder flavor",
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "coffee",
  },
  {
    id: uuidv4(),
    name: "Cappuccino",
    price: 4.50,
    description: "Equal parts espresso, steamed milk, and milk foam",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "coffee",
    badge: "Popular",
  },
  {
    id: uuidv4(),
    name: "Latte",
    price: 4.75,
    description: "Espresso with steamed milk and a light layer of foam",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "coffee",
  },
  {
    id: uuidv4(),
    name: "Mocha",
    price: 5.25,
    description: "Espresso with chocolate, steamed milk, and whipped cream",
    image: "https://images.unsplash.com/photo-1579888071069-c107a6f79d82?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "coffee",
  },
  
  // Pastries & Desserts
  {
    id: uuidv4(),
    name: "Croissant",
    price: 3.75,
    description: "Buttery, flaky pastry with a golden-brown crust",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "pastries",
  },
  {
    id: uuidv4(),
    name: "Chocolate Muffin",
    price: 4.25,
    description: "Rich chocolate muffin with chocolate chips",
    image: "https://images.unsplash.com/photo-1604882406385-6eb76dde5972?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "pastries",
  },
  {
    id: uuidv4(),
    name: "Cinnamon Roll",
    price: 4.50,
    description: "Soft roll with cinnamon-sugar filling and cream cheese frosting",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "pastries",
    badge: "Fresh",
  },
  {
    id: uuidv4(),
    name: "Cheesecake",
    price: 5.50,
    description: "Creamy New York style cheesecake with graham cracker crust",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "pastries",
  },
  {
    id: uuidv4(),
    name: "Apple Pie",
    price: 5.25,
    description: "Classic apple pie with cinnamon and flaky crust",
    image: "https://images.unsplash.com/photo-1535920527002-b35e96722969?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "pastries",
  },
  
  // Breakfast & Lunch
  {
    id: uuidv4(),
    name: "Avocado Toast",
    price: 8.50,
    description: "Sourdough toast with smashed avocado, cherry tomatoes, and microgreens",
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "food",
    badge: "Vegan",
  },
  {
    id: uuidv4(),
    name: "Breakfast Sandwich",
    price: 9.25,
    description: "Egg, cheddar, and bacon on a toasted brioche bun",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "food",
  },
  {
    id: uuidv4(),
    name: "Quiche of the Day",
    price: 7.75,
    description: "Savory egg custard with seasonal ingredients in a flaky crust",
    image: "https://images.unsplash.com/photo-1559717201-2879521b49f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "food",
  },
  {
    id: uuidv4(),
    name: "Chicken Panini",
    price: 10.50,
    description: "Grilled chicken, pesto, mozzarella, and roasted red peppers",
    image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "food",
    badge: "Popular",
  },
  {
    id: uuidv4(),
    name: "Vegetable Wrap",
    price: 9.75,
    description: "Hummus, mixed greens, cucumber, carrot, and avocado in a spinach wrap",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "food",
  }
];

export const getMenuItemsByCategory = (category: string) => {
  return menuItems.filter(item => item.category === category);
};