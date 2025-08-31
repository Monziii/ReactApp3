import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaSearch, FaShoppingCart, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

// Animation for cart badge pulse effect
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Main header container with sticky positioning
const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 0;
`;

// Header content wrapper
const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Logo container with hover effects
const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #667eea;
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// Logo icon styling
const LogoIcon = styled.div`
  font-size: 2rem;
`;

// Search container
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Search input field
const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #667eea;
  }

  &::placeholder {
    color: #95a5a6;
  }
`;

// Search button
const SearchButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

// Navigation links container
const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Individual navigation link
const NavLink = styled(Link)`
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #667eea;
  }
`;

// Cart button with badge
const CartButton = styled(Link)`
  position: relative;
  text-decoration: none;
  color: #2c3e50;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }
`;

// Cart badge showing item count
const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  animation: ${pulse} 2s infinite;
`;

// User button for authentication
const UserButton = styled(Link)`
  text-decoration: none;
  color: #2c3e50;
  padding: 0.5rem 1rem;
  border: 2px solid #667eea;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

// Logout button
const LogoutButton = styled.button`
  background: none;
  border: 2px solid #e74c3c;
  color: #e74c3c;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e74c3c;
    color: white;
  }
`;

// Mobile navigation toggle button
const MobileNavToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #2c3e50;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Mobile menu container
const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  padding: 2rem;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

// Mobile menu close button
const MobileMenuClose = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

// Mobile menu links
const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
`;

// Mobile navigation link
const MobileNavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #667eea;
  }
`;

// User menu
const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// User info
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
`;

// User name
const UserName = styled.span`
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.9rem;
`;

// User email
const UserEmail = styled.span`
  color: #7f8c8d;
  font-size: 0.8rem;
`;

// User dropdown
const UserDropdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// User dropdown item
const UserDropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c3e50;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: #f8f9fa;
  }
`;

// User dropdown button
const UserDropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e74c3c;
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: #fdf2f2;
  }
`;

// Auth buttons
const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

// Auth button
const AuthButton = styled(Link)<{ primary?: boolean }>`
  padding: 0.8rem 1.5rem;
  background: ${props => props.primary ? '#667eea' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.primary ? '#5a6fd8' : '#667eea'};
    color: white;
    transform: translateY(-2px);
  }
`;

// Header component interface
interface HeaderProps {
  onSearch: (query: string) => void;
}

// Main Header component
const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
      navigate('/books');
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          {/* Logo */}
          <Logo to="/">
            <LogoIcon>📚</LogoIcon>
            BookStore
          </Logo>

          {/* Search Bar */}
          <SearchContainer>
            <form onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Search for books, authors, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchButton type="submit">
                <FaSearch />
              </SearchButton>
            </form>
          </SearchContainer>

          {/* Desktop Navigation */}
          <NavLinks>
            <NavLink to="/books">Books</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            
            {/* Shopping Cart */}
            <CartButton to="/cart">
              <FaShoppingCart size={20} />
              <CartBadge>{getItemCount()}</CartBadge>
            </CartButton>

            {/* User menu */}
            {user ? (
              <UserMenu>
                <UserInfo>
                  <UserName>{user.firstName}</UserName>
                  <UserEmail>{user.email}</UserEmail>
                </UserInfo>
                <UserDropdown>
                  <UserDropdownItem to="/profile">
                    <FaUser /> Profile
                  </UserDropdownItem>
                  <UserDropdownItem to="/cart">
                    <FaShoppingCart /> Cart ({getItemCount()})
                  </UserDropdownItem>
                  <UserDropdownButton onClick={handleLogout}>
                    <FaSignOutAlt /> Sign Out
                  </UserDropdownButton>
                </UserDropdown>
              </UserMenu>
            ) : (
              <AuthButtons>
                <AuthButton to="/login">Sign In</AuthButton>
                <AuthButton to="/register" primary>Sign Up</AuthButton>
              </AuthButtons>
            )}
          </NavLinks>

          {/* Mobile Menu Toggle */}
          <MobileNavToggle onClick={toggleMobileMenu}>
            <FaBars />
          </MobileNavToggle>
        </HeaderContent>
      </HeaderContainer>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileMenuClose onClick={toggleMobileMenu}>
          <FaTimes />
        </MobileMenuClose>
        
        <MobileNavLinks>
          <MobileNavLink to="/" onClick={toggleMobileMenu}>
            Home
          </MobileNavLink>
          <MobileNavLink to="/books" onClick={toggleMobileMenu}>
            Books
          </MobileNavLink>
          <MobileNavLink to="/categories" onClick={toggleMobileMenu}>
            Categories
          </MobileNavLink>
          <MobileNavLink to="/cart" onClick={toggleMobileMenu}>
            Cart ({getItemCount()})
          </MobileNavLink>
          
          {user ? (
            <>
              <MobileNavLink to="/profile" onClick={toggleMobileMenu}>
                Profile
              </MobileNavLink>
              <MobileNavLink to="/" onClick={handleLogout}>
                Logout
              </MobileNavLink>
            </>
          ) : (
            <MobileNavLink to="/login" onClick={toggleMobileMenu}>
              Login
            </MobileNavLink>
          )}
        </MobileNavLinks>
      </MobileMenu>
    </>
  );
};

export default Header;
