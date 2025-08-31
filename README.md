# 📚 BookStore - Professional React Book Selling Website

A professional React application for selling books with a complete authentication system, shopping cart, and checkout process.

## ✨ Features

- **Professional English UI** with responsive design
- **Complete authentication system** (login, logout, registration)
- **Advanced shopping cart** with quantity management
- **Checkout page** with shipping information form
- **Advanced search and filters** for books
- **Modern design** using Styled Components
- **Smooth user experience** with transitions and animations

## 🚀 Technologies Used

- **React 18** with TypeScript
- **React Router** for navigation
- **Styled Components** for styling
- **React Icons** for icons
- **Context API** for state management
- **Local Storage** for user data persistence

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx      # Main header
│   ├── BookCard.tsx    # Book card component
│   ├── LoginForm.tsx   # Login form
│   └── RegisterForm.tsx # Registration form
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication context
│   └── CartContext.tsx # Shopping cart context
├── data/              # Data files
│   └── books.ts       # Books data
├── pages/             # Application pages
│   ├── HomePage.tsx   # Home page
│   ├── BooksPage.tsx  # Books page
│   ├── CartPage.tsx   # Shopping cart page
│   └── CheckoutPage.tsx # Checkout page
├── types/             # TypeScript types
│   ├── index.ts       # Type definitions
│   └── icons.d.ts     # Icon type definitions
└── App.tsx            # Main application file
```

## 🛠️ Installation & Setup

### Requirements

- Node.js (version 14 or higher)
- npm or yarn

### Installation Steps

1. **Clone the project**

```bash
git clone <repository-url>
cd bookstore
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm start
```

4. **Open your browser**

```
http://localhost:3000
```

### Build for production

```bash
npm run build
```

## 🔐 Demo Credentials

### Login

- **Email:** admin@example.com
- **Password:** password

## 📱 Main Features

### 🏠 Home Page

- Featured books showcase
- Book statistics
- Attractive design with Hero Section

### 📚 Books Page

- Display all books
- Advanced filters (category, price, author)
- Sorting by different criteria
- Text search functionality

### 🛒 Shopping Cart

- Add and remove books
- Modify quantities
- Calculate total price
- Proceed to checkout

### 💳 Checkout Process

- Shipping information form
- Payment method selection
- Order summary
- Order confirmation

## 🎨 Design

- **Gradient colors** with purple and blue gradients
- **Responsive design** works on all devices
- **Smooth animations** and transitions
- **Clear icons** from React Icons
- **Modern typography** and spacing

## 🔧 Customization

### Changing Colors

You can modify colors in Styled Components files:

```typescript
// Example of changing primary colors
const PrimaryColor = "#667eea";
const SecondaryColor = "#764ba2";
```

### Adding New Books

Add new books in `src/data/books.ts`:

```typescript
{
  id: 'unique-id',
  title: 'Book Title',
  author: 'Author Name',
  price: 29.99,
  image: 'image-url',
  description: 'Book description',
  category: 'Category',
  inStock: 10,
  rating: 4.5,
  reviews: 100,
  publishedYear: 2023,
  pages: 300,
  language: 'English',
  isbn: '978-1234567890'
}
```

## 📱 Compatibility

- ✅ Chrome (latest version)
- ✅ Firefox (latest version)
- ✅ Safari (latest version)
- ✅ Edge (latest version)
- ✅ Mobile devices (iOS/Android)

## 🚀 Future Development

- [ ] Add rating and review system
- [ ] Notification system
- [ ] Book details page
- [ ] Wishlist system
- [ ] Multi-language support
- [ ] Discount and coupon system
- [ ] Admin dashboard

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

We welcome your contributions! Please create an Issue or Pull Request.

## 📞 Support

For any questions or issues, please create an Issue in the repository.

---

**Developed with ❤️ using React and TypeScript**
