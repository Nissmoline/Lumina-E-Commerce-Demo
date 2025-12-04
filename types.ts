export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

export type PageView = 'store' | 'admin' | 'product' | 'cart' | 'checkout';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}