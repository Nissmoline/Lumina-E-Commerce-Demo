import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  total: number;
  itemCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Minimalist Leather Watch',
    description: 'A sleek, genuine leather watch with a minimalist dial. Perfect for everyday elegance.',
    price: 129.99,
    category: 'Accessories',
    image: 'https://picsum.photos/400/400?random=1',
    stock: 45,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Wireless Noise-Canceling Headphones',
    description: 'Immerse yourself in music with industry-leading noise cancellation and 30-hour battery life.',
    price: 249.50,
    category: 'Electronics',
    image: 'https://picsum.photos/400/400?random=2',
    stock: 20,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Organic Cotton Crewneck',
    description: 'Sustainably sourced, ultra-soft organic cotton sweater. Breathable and durable.',
    price: 55.00,
    category: 'Apparel',
    image: 'https://picsum.photos/400/400?random=3',
    stock: 100,
    rating: 4.5
  },
  {
    id: '4',
    name: 'Ceramic Pour-Over Set',
    description: 'Handcrafted ceramic coffee dripper and carafe for the perfect morning brew.',
    price: 45.00,
    category: 'Home',
    image: 'https://picsum.photos/400/400?random=4',
    stock: 15,
    rating: 4.7
  },
  {
    id: '5',
    name: 'Smart Fitness Tracker',
    description: 'Track your steps, heart rate, and sleep quality with this waterproof smart band.',
    price: 89.99,
    category: 'Electronics',
    image: 'https://picsum.photos/400/400?random=5',
    stock: 60,
    rating: 4.2
  },
  {
    id: '6',
    name: 'Canvas Weekender Bag',
    description: 'Durable canvas travel bag with leather accents. Spacious enough for a 3-day trip.',
    price: 110.00,
    category: 'Travel',
    image: 'https://picsum.photos/400/400?random=6',
    stock: 30,
    rating: 4.6
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider value={{
      products, cart, addToCart, removeFromCart, updateQuantity, clearCart, addProduct, deleteProduct, total, itemCount
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};