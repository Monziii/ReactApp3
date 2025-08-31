import React from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaEye, FaStar, FaHeart } from 'react-icons/fa';
import { Book } from '../types';
import { useCart } from '../contexts/CartContext';

// Main card container with hover effects
const Card = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

// Book cover image
const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

// Book information container
const Content = styled.div`
  padding: 1.5rem;
`;

// Book title
const Title = styled.h3`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;
`;

// Book author
const Author = styled.p`
  color: #7f8c8d;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
`;

// Book description
const Description = styled.p`
  color: #555;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Rating container
const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

// Star rating display
const Stars = styled.div`
  display: flex;
  gap: 2px;
`;

// Rating text
const RatingText = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

// Book additional information
const BookInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: #7f8c8d;
`;

// Price display
const Price = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 1rem;
`;

// Stock status container
const Stock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

// Stock indicator dot
const StockDot = styled.div<{ inStock: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.inStock ? '#27ae60' : '#e74c3c'};
`;

// Action buttons container
const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

// Primary action button (Add to Cart)
const AddToCartButton = styled.button<{ disabled: boolean }>`
  flex: 1;
  background: ${props => props.disabled ? '#bdc3c7' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
`;

// Secondary action button (View Details)
const ViewButton = styled.button`
  background: #ecf0f1;
  color: #2c3e50;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: #d5dbdb;
    transform: translateY(-2px);
  }
`;

// Wishlist button
const WishlistButton = styled.button`
  background: #ecf0f1;
  color: #e74c3c;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #fadbd8;
    transform: translateY(-2px);
  }
`;

// Out of stock overlay
const OutOfStockOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`;

// Helper function to render star ratings
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} style={{ color: '#f39c12' }} />);
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(<FaStar key="half" style={{ color: '#f39c12' }} />);
  }

  // Add empty stars to complete 5 stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaStar key={`empty-${i}`} style={{ color: '#bdc3c7' }} />);
  }

  return stars;
};

// BookCard component interface
interface BookCardProps {
  book: Book;
  onView: (book: Book) => void;
}

// Main BookCard component
const BookCard: React.FC<BookCardProps> = ({ book, onView }) => {
  const { addToCart } = useCart();

  // Handle adding book to cart
  const handleAddToCart = () => {
    addToCart(book);
  };

  // Handle viewing book details
  const handleView = () => {
    onView(book);
  };

  return (
    <Card>
      {/* Book cover image */}
      <Image src={book.image} alt={book.title} />
      
      {/* Out of stock overlay */}
      {book.stock === 0 && (
        <OutOfStockOverlay>Out of Stock</OutOfStockOverlay>
      )}

      <Content>
        {/* Book title and author */}
        <Title>{book.title}</Title>
        <Author>by {book.author}</Author>
        
        {/* Book description */}
        <Description>{book.description}</Description>

        {/* Rating display */}
        <RatingContainer>
          <Stars>
            {renderStars(book.rating)}
          </Stars>
          <RatingText>
            {book.rating} ({book.reviews} reviews)
          </RatingText>
        </RatingContainer>

        {/* Additional book information */}
        <BookInfo>
          <span>{book.publishedYear}</span>
          <span>{book.pages} pages</span>
        </BookInfo>

        {/* Price and stock */}
        <Price>${book.price.toFixed(2)}</Price>
        <Stock>
          <StockDot inStock={book.stock > 0} />
          {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
        </Stock>

        {/* Action buttons */}
        <Actions>
          <AddToCartButton
            onClick={handleAddToCart}
            disabled={book.stock === 0}
          >
            <FaShoppingCart />
            {book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </AddToCartButton>
          
          <ViewButton onClick={handleView}>
            <FaEye />
            View Details
          </ViewButton>
          
          <WishlistButton>
            <FaHeart />
          </WishlistButton>
        </Actions>
      </Content>
    </Card>
  );
};

export default BookCard;
