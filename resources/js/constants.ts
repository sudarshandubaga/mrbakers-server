import { Order, OrderStatus, Product, Category, Customer, LocationState } from "./types";

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat_1', name: 'Bread', description: 'Freshly baked daily loaves' },
  { id: 'cat_2', name: 'Pastry', description: 'Sweet and savory pastries' },
  { id: 'cat_3', name: 'Cake', description: 'Celebration and slice cakes' },
  { id: 'cat_4', name: 'Fast Food', description: 'Pizzas, burgers, and sandwiches' },
  { id: 'cat_5', name: 'Beverage', description: 'Hot and cold drinks' }
];

export const INITIAL_LOCATIONS: LocationState[] = [
  {
    id: 'loc_1',
    name: 'Maharashtra',
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik']
  },
  {
    id: 'loc_2',
    name: 'Karnataka',
    cities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli']
  },
  {
    id: 'loc_3',
    name: 'Delhi NCR',
    cities: ['New Delhi', 'Gurgaon', 'Noida', 'Faridabad']
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust_1',
    name: 'Aditi Sharma',
    email: 'aditi@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, MH',
    totalOrders: 15,
    totalSpent: 4520.50,
    lastOrderDate: '2024-03-10T10:30:00Z'
  },
  {
    id: 'cust_2',
    name: 'Rahul Verma',
    email: 'rahul@example.com',
    phone: '+91 98765 12345',
    location: 'Bengaluru, KA',
    totalOrders: 3,
    totalSpent: 850.00,
    lastOrderDate: '2024-03-12T14:15:00Z'
  },
  {
    id: 'cust_3',
    name: 'Priya Singh',
    email: 'priya@example.com',
    phone: '+91 98765 67890',
    location: 'New Delhi, DL',
    totalOrders: 8,
    totalSpent: 2100.75,
    lastOrderDate: '2024-03-08T09:45:00Z'
  },
  {
    id: 'cust_4',
    name: 'Vikram Malhotra',
    email: 'vikram@example.com',
    phone: '+91 98765 98765',
    location: 'Pune, MH',
    totalOrders: 22,
    totalSpent: 12050.00,
    lastOrderDate: '2024-03-14T18:20:00Z'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Sourdough Loaf',
    description: 'Classic rustic sourdough with a crispy crust and chewy interior.',
    price: 150.00,
    category: 'Bread',
    stock: 24,
    gstRate: 5,
    imageUrl: 'https://picsum.photos/200/200?random=1',
    ingredients: ['Flour', 'Water', 'Salt', 'Wild Yeast'],
    variants: []
  },
  {
    id: '2',
    name: 'Chocolate Croissant',
    description: 'Buttery flaky pastry filled with rich dark chocolate.',
    price: 120.00,
    category: 'Pastry',
    stock: 12,
    gstRate: 18,
    imageUrl: 'https://picsum.photos/200/200?random=2',
    ingredients: ['Butter', 'Flour', 'Sugar', 'Dark Chocolate', 'Eggs'],
    variants: []
  },
  {
    id: '3',
    name: 'Celebration Cake',
    description: 'Rich vanilla sponge cake with strawberry filling, available in various sizes.',
    price: 500.00,
    category: 'Cake',
    stock: 10,
    gstRate: 18,
    imageUrl: 'https://picsum.photos/200/200?random=3',
    ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Vanilla', 'Strawberry'],
    variants: [
      { id: 'v1', name: '500g', price: 500.00, stock: 5 },
      { id: 'v2', name: '1kg', price: 950.00, stock: 3 },
      { id: 'v3', name: '2kg', price: 1800.00, stock: 2 }
    ]
  },
  {
    id: '4',
    name: 'Classic Margherita Pizza',
    description: 'Fresh mozzarella, basil, and tomato sauce on a thin crust.',
    price: 299.00,
    category: 'Fast Food',
    stock: 40,
    gstRate: 5,
    imageUrl: 'https://picsum.photos/200/200?random=4',
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'],
    variants: [
      { id: 'p1', name: 'Small (8")', price: 299.00, stock: 20 },
      { id: 'p2', name: 'Medium (12")', price: 499.00, stock: 15 },
      { id: 'p3', name: 'Large (16")', price: 699.00, stock: 5 }
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_12345',
    customerName: 'Aditi Sharma',
    items: [
      { productId: '1', name: 'Sourdough Loaf', quantity: 2, price: 150.00 },
      { productId: '2', name: 'Chocolate Croissant', quantity: 1, price: 120.00 }
    ],
    total: 420.00,
    status: OrderStatus.PENDING,
    timestamp: new Date().toISOString()
  },
  {
    id: 'ord_12346',
    customerName: 'Rahul Verma',
    items: [
      { productId: '4', name: 'Classic Margherita Pizza (Medium)', quantity: 1, price: 499.00 }
    ],
    total: 499.00,
    status: OrderStatus.PREPARING,
    timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  },
  {
    id: 'ord_12347',
    customerName: 'Priya Singh',
    items: [
      { productId: '3', name: 'Celebration Cake (500g)', quantity: 1, price: 500.00 }
    ],
    total: 500.00,
    status: OrderStatus.READY,
    timestamp: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
  }
];