export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAuthenticated: boolean;
  phone?: string;
  address?: string;
  bio?: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  publishedYear: number;
  pages: number;
  language: string;
  isbn: string;
  categories: string[];
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled' | 'delivered' | 'shipped';
  createdAt: Date;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}
