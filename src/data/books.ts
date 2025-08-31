export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  publishedYear: number;
  pages: number;
  language: string;
  isbn: string;
  stock: number;
  categories: string[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Classic Literature",
    description: "Timeless masterpieces that have shaped literature",
    icon: "📚"
  },
  {
    id: 2,
    name: "Science Fiction",
    description: "Imaginative stories exploring futuristic concepts",
    icon: "🚀"
  },
  {
    id: 3,
    name: "Fantasy",
    description: "Magical worlds and epic adventures",
    icon: "🐉"
  },
  {
    id: 4,
    name: "Romance",
    description: "Love stories that touch the heart",
    icon: "💕"
  },
  {
    id: 5,
    name: "Coming of Age",
    description: "Stories about growing up and self-discovery",
    icon: "🌱"
  },
  {
    id: 6,
    name: "Philosophy",
    description: "Deep thoughts and intellectual exploration",
    icon: "🤔"
  },
  {
    id: 7,
    name: "Children's Literature",
    description: "Books for young readers and families",
    icon: "👶"
  },
  {
    id: 8,
    name: "Contemporary Fiction",
    description: "Modern stories reflecting today's world",
    icon: "🌍"
  },
  {
    id: 9,
    name: "Historical Fiction",
    description: "Stories set in the past with rich details",
    icon: "⏰"
  }
];

export const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=500&fit=crop&crop=center&q=80",
    description: "A story of decadence and excess, Gatsby explores the darker aspects of the Jazz Age.",
    category: "Classic Literature",
    rating: 4.5,
    reviews: 1250,
    publishedYear: 1925,
    pages: 180,
    language: "English",
    isbn: "978-0743273565",
    stock: 45,
    categories: ["Classic Literature", "Fiction"]
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&crop=center&q=80",
    description: "A masterpiece of science fiction, Dune is set on the desert planet Arrakis.",
    category: "Science Fiction",
    rating: 4.8,
    reviews: 890,
    publishedYear: 1965,
    pages: 688,
    language: "English",
    isbn: "978-0441172719",
    stock: 32,
    categories: ["Science Fiction", "Adventure"]
  },
  {
    id: 3,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop&crop=center&q=80",
    description: "A charming adventure story about Bilbo Baggins and his journey with thirteen dwarves.",
    category: "Fantasy",
    rating: 4.6,
    reviews: 2100,
    publishedYear: 1937,
    pages: 310,
    language: "English",
    isbn: "978-0547928241",
    stock: 67,
    categories: ["Fantasy", "Adventure"]
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=500&fit=crop&crop=center&q=80",
    description: "A classic romance novel about the relationship between Elizabeth Bennet and Mr. Darcy.",
    category: "Romance",
    rating: 4.4,
    reviews: 1800,
    publishedYear: 1813,
    pages: 432,
    language: "English",
    isbn: "978-0141439518",
    stock: 89,
    categories: ["Romance", "Classic Literature"]
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=center&q=80",
    description: "A coming-of-age story about teenage alienation and loss of innocence in post-World War II America.",
    category: "Coming of Age",
    rating: 4.3,
    reviews: 950,
    publishedYear: 1951,
    pages: 277,
    language: "English",
    isbn: "978-0316769488",
    stock: 54,
    categories: ["Coming of Age", "Fiction"]
  },
  {
    id: 6,
    title: "The Republic",
    author: "Plato",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=500&fit=crop&crop=center&q=80",
    description: "Plato's masterwork of philosophy, exploring justice, the ideal state, and the nature of reality.",
    category: "Philosophy",
    rating: 4.7,
    reviews: 650,
    publishedYear: 380,
    pages: 416,
    language: "English",
    isbn: "978-0872201361",
    stock: 28,
    categories: ["Philosophy", "Non-Fiction"]
  },
  {
    id: 7,
    title: "Charlotte's Web",
    author: "E.B. White",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=center&q=80",
    description: "A heartwarming story about friendship between a pig named Wilbur and a spider named Charlotte.",
    category: "Children's Literature",
    rating: 4.6,
    reviews: 3200,
    publishedYear: 1952,
    pages: 184,
    language: "English",
    isbn: "978-0061124952",
    stock: 76,
    categories: ["Children's Literature", "Fiction"]
  },
  {
    id: 8,
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&crop=center&q=80",
    description: "A powerful story of friendship, betrayal, and redemption set against the backdrop of Afghanistan.",
    category: "Contemporary Fiction",
    rating: 4.5,
    reviews: 1100,
    publishedYear: 2003,
    pages: 371,
    language: "English",
    isbn: "978-1594631931",
    stock: 43,
    categories: ["Contemporary Fiction", "Drama"]
  },
  {
    id: 9,
    title: "The Book Thief",
    author: "Markus Zusak",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop&crop=center&q=80",
    description: "A unique perspective on World War II, narrated by Death, about a girl who steals books.",
    category: "Historical Fiction",
    rating: 4.4,
    reviews: 850,
    publishedYear: 2005,
    pages: 552,
    language: "English",
    isbn: "978-0375842207",
    stock: 38,
    categories: ["Historical Fiction", "Drama"]
  },
  {
    id: 10,
    title: "1984",
    author: "George Orwell",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=500&fit=crop&crop=center&q=80",
    description: "A dystopian novel about totalitarianism, surveillance, and the manipulation of truth.",
    category: "Science Fiction",
    rating: 4.6,
    reviews: 1400,
    publishedYear: 1949,
    pages: 328,
    language: "English",
    isbn: "978-0451524935",
    stock: 62,
    categories: ["Science Fiction", "Dystopian"]
  },
  {
    id: 11,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=500&fit=crop&crop=center&q=80",
    description: "A powerful story about racial injustice and the loss of innocence in the American South.",
    category: "Classic Literature",
    rating: 4.5,
    reviews: 2200,
    publishedYear: 1960,
    pages: 376,
    language: "English",
    isbn: "978-0446310789",
    stock: 71,
    categories: ["Classic Literature", "Fiction"]
  },
  {
    id: 12,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=500&fit=crop&crop=center&q=80",
    description: "A philosophical novel about a young Andalusian shepherd who dreams of finding a worldly treasure.",
    category: "Philosophy",
    rating: 4.3,
    reviews: 1200,
    publishedYear: 1988,
    pages: 208,
    language: "English",
    isbn: "978-0062315007",
    stock: 55,
    categories: ["Philosophy", "Fiction"]
  }
];
