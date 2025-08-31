import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

// Global styles for the entire application
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  html {
    scroll-behavior: smooth;
  }

  button {
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }
`;

// Main app container
const AppContainer = styled.div`
  min-height: 100vh;
`;

// Main App component that sets up routing and context providers
const App: React.FC = () => {
  // Handle search functionality (can be expanded later)
  const handleSearch = (query: string) => {
    // Search functionality can be implemented here
    console.log('Searching for:', query);
  };

  return (
    // Wrap the entire app with authentication and cart context providers
    <AuthProvider>
      <CartProvider>
        <Router>
          <GlobalStyle />
          <AppContainer>
            {/* Header component with search functionality */}
            <Header onSearch={handleSearch} />
            
            {/* Main routing configuration */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/book/:id" element={<BookDetailPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
            
            {/* Footer component */}
            <Footer />
          </AppContainer>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
