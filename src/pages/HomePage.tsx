import React from 'react';
import styled from 'styled-components';
import { FaBookOpen, FaTruck, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { books, categories } from '../data/books';

// Main container for the home page
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

// Content wrapper with max width and padding
const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

// Hero section with background pattern
const Hero = styled.div`
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  padding: 6rem 0;
  text-align: center;
  color: white;
`;

// Hero content container
const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

// Main hero title
const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

// Hero subtitle
const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
`;

// Call-to-action button
const CTAButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

// Section container
const Section = styled.section`
  padding: 4rem 0;
  background: white;
`;

// Section title
const SectionTitle = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2.5rem;
`;

// Section subtitle
const SectionSubtitle = styled.p`
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 3rem;
  font-size: 1.1rem;
`;

// Grid for featured books
const FeaturedBooks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

// Individual featured book card
const FeaturedBook = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Featured book image
const FeaturedImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

// Featured book content
const FeaturedContent = styled.div`
  padding: 1.5rem;
`;

// Featured book title
const FeaturedTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

// Featured book author
const FeaturedAuthor = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

// Featured book price
const FeaturedPrice = styled.div`
  color: #e74c3c;
  font-weight: bold;
  font-size: 1.1rem;
`;

// View more button
const ViewMoreButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease;
  font-size: 1rem;

  &:hover {
    transform: translateY(-2px);
  }
`;

// Features section
const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

// Individual feature card
const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Feature icon
const FeatureIcon = styled.div`
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1rem;
`;

// Feature title
const FeatureTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

// Feature description
const FeatureDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
`;

// Categories section
const CategoriesSection = styled.div`
  padding: 4rem 0;
  background: #f8f9fa;
`;

// Categories grid
const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

// Individual category card
const CategoryCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Category icon
const CategoryIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

// Category name
const CategoryName = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

// Category count
const CategoryCount = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

// Stats section
const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

// Individual stat card
const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
`;

// Stat icon
const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

// Stat number
const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

// Stat label
const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

// Main HomePage component
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Get first 3 books for featured section
  const featuredBooks = books.slice(0, 3);

  // Handle view more button click
  const handleViewMore = () => {
    navigate('/books');
  };

  return (
    <Container>
      {/* Hero Section */}
      <Hero>
        <Content>
          <HeroContent>
            <HeroTitle>Discover Your Next Great Read</HeroTitle>
            <HeroSubtitle>
              Explore our curated collection of classic and contemporary books. 
              From timeless literature to modern masterpieces, find your perfect story.
            </HeroSubtitle>
            <CTAButton onClick={handleViewMore}>
              Browse Collection
              <FaArrowRight />
            </CTAButton>
          </HeroContent>
        </Content>
      </Hero>

      {/* Featured Books Section */}
      <Section>
        <Content>
          <SectionTitle>Featured Books</SectionTitle>
          <SectionSubtitle>Handpicked selections from our collection</SectionSubtitle>
          
          <FeaturedBooks>
            {featuredBooks.map((book) => (
              <FeaturedBook key={book.id}>
                <FeaturedImage src={book.image} alt={book.title} />
                <FeaturedContent>
                  <FeaturedTitle>{book.title}</FeaturedTitle>
                  <FeaturedAuthor>by {book.author}</FeaturedAuthor>
                  <FeaturedPrice>${book.price.toFixed(2)}</FeaturedPrice>
                </FeaturedContent>
              </FeaturedBook>
            ))}
          </FeaturedBooks>
          
          <div style={{ textAlign: 'center' }}>
            <ViewMoreButton onClick={handleViewMore}>
              View All Books
              <FaArrowRight />
            </ViewMoreButton>
          </div>
        </Content>
      </Section>

      {/* Features Section */}
      <Section style={{ background: '#f8f9fa' }}>
        <Content>
          <SectionTitle>Why Choose Our Bookstore?</SectionTitle>
          <SectionSubtitle>We provide the best reading experience</SectionSubtitle>
          
          <Features>
            <FeatureCard>
              <FeatureIcon>
                <FaBookOpen />
              </FeatureIcon>
              <FeatureTitle>Curated Collection</FeatureTitle>
              <FeatureDescription>
                Carefully selected books from various genres and authors, 
                ensuring quality and diversity in our collection.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <FaTruck />
              </FeatureIcon>
              <FeatureTitle>Fast Delivery</FeatureTitle>
              <FeatureDescription>
                Quick and reliable shipping to get your books to you 
                as soon as possible, with tracking included.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <FaShieldAlt />
              </FeatureIcon>
              <FeatureTitle>Secure Shopping</FeatureTitle>
              <FeatureDescription>
                Safe and secure payment processing with multiple 
                payment options and buyer protection.
              </FeatureDescription>
            </FeatureCard>
          </Features>
        </Content>
      </Section>

      {/* Categories Section */}
      <CategoriesSection>
        <Content>
          <SectionTitle>Browse by Category</SectionTitle>
          <SectionSubtitle>Find books in your favorite genres</SectionSubtitle>
          
          <CategoriesGrid>
            {categories.map((category) => (
              <CategoryCard key={category.id}>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryName>{category.name}</CategoryName>
                <CategoryCount>{books.filter(book => book.category === category.name).length} books</CategoryCount>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </Content>
      </CategoriesSection>

      {/* Stats Section */}
      <Section>
        <Content>
          <SectionTitle>Our Numbers</SectionTitle>
          <SectionSubtitle>Trusted by thousands of readers</SectionSubtitle>
          
          <Stats>
            <StatCard>
              <StatIcon>📚</StatIcon>
              <StatNumber>1000+</StatNumber>
              <StatLabel>Books Available</StatLabel>
            </StatCard>
            
            <StatCard>
              <StatIcon>👥</StatIcon>
              <StatNumber>5000+</StatNumber>
              <StatLabel>Happy Customers</StatLabel>
            </StatCard>
            
            <StatCard>
              <StatIcon>⭐</StatIcon>
              <StatNumber>4.8</StatNumber>
              <StatLabel>Average Rating</StatLabel>
            </StatCard>
            
            <StatCard>
              <StatIcon>🚚</StatIcon>
              <StatNumber>24h</StatNumber>
              <StatLabel>Fast Delivery</StatLabel>
            </StatCard>
          </Stats>
        </Content>
      </Section>
    </Container>
  );
};

export default HomePage;
