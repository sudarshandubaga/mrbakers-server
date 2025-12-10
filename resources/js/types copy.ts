export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface LocationState {
  id: string;
  name: string;
  cities: string[];
}

export interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., "500g", "1kg", "Small", "Large"
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Represents base price or lowest variant price
  category: string; // Changed from Enum to string for dynamic categories
  stock: number; // Represents total stock across variants
  gstRate: number; // GST Tax Rate in percentage
  imageUrl: string;
  ingredients?: string[];
  variants?: ProductVariant[];
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  timestamp: string;
}

export interface SalesData {
  name: string;
  sales: number;
}

export type ViewState = 
  | 'DASHBOARD' 
  | 'PRODUCTS' 
  | 'ORDERS' 
  | 'CUSTOMERS' 
  | 'LOCATIONS' 
  | 'CATEGORIES' 
  | 'APP_SETTINGS' 
  | 'EDIT_PROFILE'
  | 'CHANGE_PASSWORD';