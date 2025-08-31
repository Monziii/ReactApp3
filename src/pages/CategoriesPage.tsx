import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { categories, books } from '../data/books';

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

// Page header
const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2.5rem;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
`;

// Categories grid
const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

// Individual category card
const CategoryCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Category header
const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

// Category icon
const CategoryIcon = styled.div`
  font-size: 2.5rem;
  color: #667eea;
`;

// Category info
const CategoryInfo = styled.div`
  flex: 1;
`;

// Category name
const CategoryName = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`;

// Category description
const CategoryDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.5;
`;

// Category stats
const CategoryStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e1e8ed;
`;

// Book count
const BookCount = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

// View books button
const ViewBooksButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #5a6fd8;
  }
`;

// Featured books section
const FeaturedSection = styled.div`
  margin-top: 4rem;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-align: center;
`;

// Books grid for featured books
const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

// Book card
const BookCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Book image
const BookImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

// Book content
const BookContent = styled.div`
  padding: 1.5rem;
`;

// Book title
const BookTitle = styled.h4`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

// Book author
const BookAuthor = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

// Book price
const BookPrice = styled.div`
  color: #e74c3c;
  font-weight: bold;
  font-size: 1.1rem;
`;

// Main CategoriesPage component
const CategoriesPage: React.FC = () => {
  // Get books for each category
  const getBooksForCategory = (categoryName: string) => {
    return books.filter(book => book.category === categoryName);
  };

  // Get featured books (first 6 books)
  const featuredBooks = books.slice(0, 6);

  return (
    <Container>
      <Content>
        {/* Page Header */}
        <Header>
          <Title>Book Categories</Title>
          <Subtitle>Explore our collection by genre and find your perfect read</Subtitle>
        </Header>

        {/* Categories Grid */}
        <CategoriesGrid>
          {categories.map((category) => {
            const categoryBooks = getBooksForCategory(category.name);
            return (
              <CategoryCard key={category.id}>
                <CategoryHeader>
                  <CategoryIcon>{category.icon}</CategoryIcon>
                  <CategoryInfo>
                    <CategoryName>{category.name}</CategoryName>
                    <CategoryDescription>{category.description}</CategoryDescription>
                  </CategoryInfo>
                </CategoryHeader>
                
                <CategoryStats>
                  <BookCount>{categoryBooks.length} books available</BookCount>
                  <ViewBooksButton to={`/books?category=${encodeURIComponent(category.name)}`}>
                    View Books
                    <FaArrowRight />
                  </ViewBooksButton>
                </CategoryStats>
              </CategoryCard>
            );
          })}
        </CategoriesGrid>

        {/* Featured Books Section */}
        <FeaturedSection>
          <SectionTitle>Featured Books</SectionTitle>
          <BooksGrid>
            {featuredBooks.map((book) => (
              <BookCard key={book.id}>
                <BookImage src={book.image} alt={book.title} />
                <BookContent>
                  <BookTitle>{book.title}</BookTitle>
                  <BookAuthor>by {book.author}</BookAuthor>
                  <BookPrice>${book.price.toFixed(2)}</BookPrice>
                </BookContent>
              </BookCard>
            ))}
          </BooksGrid>
        </FeaturedSection>
      </Content>
    </Container>
  );
};

export default CategoriesPage;
