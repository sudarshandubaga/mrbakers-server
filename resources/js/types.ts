export enum OrderStatus {
    PENDING = "PENDING",
    PREPARING = "PREPARING",
    READY = "READY",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
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
    id: string | number;
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
    regular_price: number;
    trade_price: number;
    stock: number;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    category_id: number | null;
    regular_price: number | null; // Represents base price or lowest variant price
    trade_price: number; // Represents base price or lowest variant price
    stock: number; // Represents total stock across variants
    gst_rate: number; // GST Tax Rate in percentage
    main_image: string;
    is_bestseller?: boolean;
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
    id: string | number;
    order_number?: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    items: OrderItem[];
    subtotal: number;
    delivery_fee: number;
    total: number;
    status: OrderStatus;
    timestamp: string;
    notes?: string;
    payment_method?: string;
    payment_id?: string;
    address?: string;
}

export interface SalesData {
    name: string;
    sales: number;
}

export type ViewState =
    | "DASHBOARD"
    | "PRODUCTS"
    | "ORDERS"
    | "CUSTOMERS"
    | "LOCATIONS"
    | "CATEGORIES"
    | "APP_SETTINGS"
    | "EDIT_PROFILE"
    | "CHANGE_PASSWORD";
