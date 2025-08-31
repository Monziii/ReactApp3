import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaFilter, FaTimes } from 'react-icons/fa';
import BookCard from '../components/BookCard';
import { books } from '../data/books';
import { Book } from '../types';

const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem 0;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

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

const FiltersSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 500;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.9rem;
`;

const FilterInput = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
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

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
  background: white;

  &:focus {
    border-color: #667eea;
  }
`;

const ClearFiltersButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover {
    background: #c0392b;
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: #7f8c8d;
`;

const SortSelect = styled.select`
  padding: 0.5rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.3s ease;
  background: white;

  &:focus {
    border-color: #667eea;
  }
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #7f8c8d;
`;

const NoResultsIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const NoResultsText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ResetButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const BooksPage: React.FC = () => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    author: ''
  });
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    let results = books;

    // Apply filters
    if (filters.search) {
      results = results.filter(book =>
        book.title.includes(filters.search) ||
        book.author.includes(filters.search) ||
        book.description.includes(filters.search)
      );
    }

    if (filters.category) {
      results = results.filter(book => book.category === filters.category);
    }

    if (filters.author) {
      results = results.filter(book => book.author.includes(filters.author));
    }

    if (filters.minPrice) {
      results = results.filter(book => book.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      results = results.filter(book => book.price <= parseFloat(filters.maxPrice));
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredBooks(results);
  }, [filters, sortBy]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      author: ''
    });
    setSortBy('title');
  };

  const categories = Array.from(new Set(books.map(book => book.category)));

  const handleViewBook = (book: Book) => {
    console.log('Viewing book:', book);
  };

  return (
    <Container>
      <Content>
        <Header>
          <Title>Book Library</Title>
          <Subtitle>Discover a wide collection of classic and contemporary books</Subtitle>
        </Header>

        <FiltersSection>
          <FiltersHeader>
            <FaFilter />
            Search Filters
          </FiltersHeader>
          
          <FiltersGrid>
            <FilterGroup>
              <FilterLabel>Search</FilterLabel>
              <FilterInput
                type="text"
                placeholder="Search in books..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Category</FilterLabel>
              <FilterSelect
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Author</FilterLabel>
              <FilterInput
                type="text"
                placeholder="Author name..."
                value={filters.author}
                onChange={(e) => handleFilterChange('author', e.target.value)}
              />
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Min Price</FilterLabel>
              <FilterInput
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Max Price</FilterLabel>
              <FilterInput
                type="number"
                placeholder="1000"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </FilterGroup>
          </FiltersGrid>

          <ClearFiltersButton onClick={clearFilters}>
            <FaTimes />
            Clear Filters
          </ClearFiltersButton>
        </FiltersSection>

        <ResultsInfo>
          <div>
            Found {filteredBooks.length} books
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Sort by:</span>
            <SortSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </SortSelect>
          </div>
        </ResultsInfo>

        {filteredBooks.length === 0 ? (
          <NoResults>
            <NoResultsIcon>📚</NoResultsIcon>
            <NoResultsText>No books found matching your search criteria</NoResultsText>
            <ResetButton onClick={clearFilters}>
              Reset Filters
            </ResetButton>
          </NoResults>
        ) : (
          <BooksGrid>
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onView={handleViewBook}
              />
            ))}
          </BooksGrid>
        )}
      </Content>
    </Container>
  );
};

export default BooksPage;
