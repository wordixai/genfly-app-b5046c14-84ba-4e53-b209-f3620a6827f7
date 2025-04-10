export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: string;
  badge?: string;
}

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartContextType {
  items: CartItemType[];
  itemCount: number;
  totalPrice: number;
  addItem: (item: CartItemType) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}