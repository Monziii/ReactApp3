import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar, FaHeart, FaShoppingCart, FaArrowLeft, FaTruck, FaShieldAlt, FaCreditCard } from 'react-icons/fa';
import { books } from '../data/books';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

// Main container
const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem 0;
`;

// Content wrapper
const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

// Back button
const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #5a6fd8;
  }
`;

// Book detail grid
const BookDetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

// Book image section
const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Main book image
const BookImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

// Image gallery
const ImageGallery = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
`;

// Thumbnail image
const ThumbnailImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
  
  &.active {
    border-color: #667eea;
  }
  
  &:hover {
    border-color: #667eea;
  }
`;

// Book info section
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// Book title
const BookTitle = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  line-height: 1.2;
  margin: 0;
`;

// Book author
const BookAuthor = styled.p`
  color: #7f8c8d;
  font-size: 1.2rem;
  margin: 0;
`;

// Rating section
const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// Stars
const Stars = styled.div`
  display: flex;
  gap: 0.2rem;
`;

// Star icon
const StarIcon = styled(FaStar)<{ filled: boolean }>`
  color: ${props => props.filled ? '#f39c12' : '#ddd'};
  font-size: 1.2rem;
`;

// Review count
const ReviewCount = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

// Price section
const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// Price
const Price = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #e74c3c;
`;

// Original price
const OriginalPrice = styled.div`
  font-size: 1.2rem;
  color: #95a5a6;
  text-decoration: line-through;
`;

// Discount badge
const DiscountBadge = styled.div`
  background: #e74c3c;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
`;

// Book description
const Description = styled.p`
  color: #34495e;
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
`;

// Book details grid
const BookDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`;

// Detail item
const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

// Detail label
const DetailLabel = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
  font-weight: 500;
`;

// Detail value
const DetailValue = styled.span`
  color: #2c3e50;
  font-size: 1rem;
`;

// Stock status
const StockStatus = styled.div<{ inStock: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.inStock ? '#27ae60' : '#e74c3c'};
  font-weight: 500;
`;

// Stock dot
const StockDot = styled.div<{ inStock: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.inStock ? '#27ae60' : '#e74c3c'};
`;

// Action buttons
const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Add to cart button
const AddToCartButton = styled.button<{ disabled: boolean }>`
  flex: 1;
  padding: 1rem 2rem;
  background: ${props => props.disabled ? '#bdc3c7' : '#667eea'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    background: #5a6fd8;
    transform: translateY(-2px);
  }
`;

// Wishlist button
const WishlistButton = styled.button<{ isWishlisted: boolean }>`
  padding: 1rem;
  background: ${props => props.isWishlisted ? '#e74c3c' : 'white'};
  color: ${props => props.isWishlisted ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.isWishlisted ? '#c0392b' : '#f8f9fa'};
  }
`;

// Features section
const FeaturesSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

// Section title
const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

// Features grid
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

// Feature item
const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// Feature icon
const FeatureIcon = styled.div`
  color: #667eea;
  font-size: 1.5rem;
`;

// Feature text
const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
`;

// Feature title
const FeatureTitle = styled.span`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.2rem;
`;

// Feature description
const FeatureDescription = styled.span`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

// Related books section
const RelatedBooksSection = styled.div`
  margin-top: 3rem;
`;

// Related books grid
const RelatedBooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

// Related book card
const RelatedBookCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

// Related book image
const RelatedBookImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

// Related book content
const RelatedBookContent = styled.div`
  padding: 1rem;
`;

// Related book title
const RelatedBookTitle = styled.h4`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
`;

// Related book author
const RelatedBookAuthor = styled.p`
  color: #7f8c8d;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
`;

// Related book price
const RelatedBookPrice = styled.div`
  color: #e74c3c;
  font-weight: bold;
  font-size: 1rem;
`;

// Main BookDetailPage component
const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Find the book by ID
  const book = books.find(b => b.id === Number(id));
  
  if (!book) {
    return (
      <Container>
        <Content>
          <h1>Book not found</h1>
          <BackButton to="/books">← Back to Books</BackButton>
        </Content>
      </Container>
    );
  }
  
  // Generate additional images for gallery (using the same image with different crops)
  const bookImages = [
    book.image,
    book.image.replace('w=400&h=500', 'w=400&h=400'),
    book.image.replace('w=400&h=500', 'w=400&h=600'),
    book.image.replace('w=400&h=500', 'w=500&h=400')
  ];
  
  // Find related books (same category, different book)
  const relatedBooks = books
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);
  
  // Calculate discount (random for demo)
  const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 10 : 0;
  const discountedPrice = discount > 0 ? book.price * (1 - discount / 100) : book.price;
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (book.stock > 0) {
      addToCart(book);
      // Show success message
      alert(`${book.title} added to cart!`);
    }
  };
  
  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    alert(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };
  
  return (
    <Container>
      <Content>
        {/* Back button */}
        <BackButton to="/books">
          <FaArrowLeft /> Back to Books
        </BackButton>
        
        {/* Book detail grid */}
        <BookDetailGrid>
          {/* Image section */}
          <ImageSection>
            <BookImage src={bookImages[selectedImage]} alt={book.title} />
            <ImageGallery>
              {bookImages.map((image, index) => (
                <ThumbnailImage
                  key={index}
                  src={image}
                  alt={`${book.title} view ${index + 1}`}
                  className={selectedImage === index ? 'active' : ''}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </ImageGallery>
          </ImageSection>
          
          {/* Info section */}
          <InfoSection>
            <BookTitle>{book.title}</BookTitle>
            <BookAuthor>by {book.author}</BookAuthor>
            
            {/* Rating */}
            <RatingSection>
              <Stars>
                {[1, 2, 3, 4, 5].map(star => (
                  <StarIcon key={star} filled={star <= book.rating} />
                ))}
              </Stars>
              <ReviewCount>({book.reviews.toLocaleString()} reviews)</ReviewCount>
            </RatingSection>
            
            {/* Price */}
            <PriceSection>
              <Price>${discountedPrice.toFixed(2)}</Price>
              {discount > 0 && (
                <>
                  <OriginalPrice>${book.price.toFixed(2)}</OriginalPrice>
                  <DiscountBadge>-{discount}%</DiscountBadge>
                </>
              )}
            </PriceSection>
            
            {/* Description */}
            <Description>{book.description}</Description>
            
            {/* Book details */}
            <BookDetailsGrid>
              <DetailItem>
                <DetailLabel>Category</DetailLabel>
                <DetailValue>{book.category}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Published</DetailLabel>
                <DetailValue>{book.publishedYear}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Pages</DetailLabel>
                <DetailValue>{book.pages}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Language</DetailLabel>
                <DetailValue>{book.language}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>ISBN</DetailLabel>
                <DetailValue>{book.isbn}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Stock</DetailLabel>
                <StockStatus inStock={book.stock > 0}>
                  <StockDot inStock={book.stock > 0} />
                  {book.stock > 0 ? `${book.stock} available` : 'Out of stock'}
                </StockStatus>
              </DetailItem>
            </BookDetailsGrid>
            
            {/* Action buttons */}
            <ActionButtons>
              <AddToCartButton 
                disabled={book.stock === 0}
                onClick={handleAddToCart}
              >
                <FaShoppingCart />
                {book.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </AddToCartButton>
              <WishlistButton 
                isWishlisted={isWishlisted}
                onClick={handleWishlistToggle}
              >
                <FaHeart />
              </WishlistButton>
            </ActionButtons>
          </InfoSection>
        </BookDetailGrid>
        
        {/* Features section */}
        <FeaturesSection>
          <SectionTitle>Why Choose This Book?</SectionTitle>
          <FeaturesGrid>
            <FeatureItem>
              <FeatureIcon>
                <FaTruck />
              </FeatureIcon>
              <FeatureText>
                <FeatureTitle>Fast Delivery</FeatureTitle>
                <FeatureDescription>Free shipping on orders over $50</FeatureDescription>
              </FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <FaShieldAlt />
              </FeatureIcon>
              <FeatureText>
                <FeatureTitle>Secure Payment</FeatureTitle>
                <FeatureDescription>100% secure payment processing</FeatureDescription>
              </FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <FaCreditCard />
              </FeatureIcon>
              <FeatureText>
                <FeatureTitle>Easy Returns</FeatureTitle>
                <FeatureDescription>30-day return policy</FeatureDescription>
              </FeatureText>
            </FeatureItem>
          </FeaturesGrid>
        </FeaturesSection>
        
        {/* Related books */}
        {relatedBooks.length > 0 && (
          <RelatedBooksSection>
            <SectionTitle>More {book.category} Books</SectionTitle>
            <RelatedBooksGrid>
              {relatedBooks.map(relatedBook => (
                <RelatedBookCard 
                  key={relatedBook.id}
                  onClick={() => navigate(`/book/${relatedBook.id}`)}
                >
                  <RelatedBookImage src={relatedBook.image} alt={relatedBook.title} />
                  <RelatedBookContent>
                    <RelatedBookTitle>{relatedBook.title}</RelatedBookTitle>
                    <RelatedBookAuthor>by {relatedBook.author}</RelatedBookAuthor>
                    <RelatedBookPrice>${relatedBook.price.toFixed(2)}</RelatedBookPrice>
                  </RelatedBookContent>
                </RelatedBookCard>
              ))}
            </RelatedBooksGrid>
          </RelatedBooksSection>
        )}
      </Content>
    </Container>
  );
};

export default BookDetailPage;
