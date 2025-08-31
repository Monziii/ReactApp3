import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { books, categories } from '../data/books';
import { useCart } from '../contexts/CartContext';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';

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

// Search header
const SearchHeader = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

// Search title
const SearchTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

// Search subtitle
const SearchSubtitle = styled.p`
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

// Search form
const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Search input
const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

// Search button
const SearchButton = styled.button`
  padding: 1rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #5a6fd8;
  }
`;

// Filters section
const FiltersSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

// Filters header
const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 600;
`;

// Filters grid
const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

// Filter group
const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// Filter label
const FilterLabel = styled.label`
  color: #7f8c8d;
  font-weight: 500;
  font-size: 0.9rem;
`;

// Filter select
const FilterSelect = styled.select`
  padding: 0.8rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

// Filter input
const FilterInput = styled.input`
  padding: 0.8rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

// Results section
const ResultsSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

// Results header
const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

// Results count
const ResultsCount = styled.div`
  color: #7f8c8d;
  font-size: 1rem;
`;

// Sort options
const SortOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// Sort label
const SortLabel = styled.label`
  color: #7f8c8d;
  font-weight: 500;
  font-size: 0.9rem;
`;

// Sort select
const SortSelect = styled.select`
  padding: 0.5rem;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

// Books grid
const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

// No results
const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
`;

// No results icon
const NoResultsIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #bdc3c7;
`;

// Clear filters button
const ClearFiltersButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #95a5a6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #7f8c8d;
  }
`;

// Main SearchPage component
const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || '');
  const [rating, setRating] = useState(searchParams.get('rating') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance');
  
  // Filtered and sorted books
  const [filteredBooks, setFilteredBooks] = useState(books);
  
  // Apply filters and search
  useEffect(() => {
    let results = books;
    
    // Search by title, author, or description
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(book => 
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      results = results.filter(book => book.category === selectedCategory);
    }
    
    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        results = results.filter(book => book.price >= min && book.price <= max);
      } else {
        results = results.filter(book => book.price >= min);
      }
    }
    
    // Filter by rating
    if (rating) {
      const minRating = Number(rating);
      results = results.filter(book => book.rating >= minRating);
    }
    
    // Sort results
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        results.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        results.sort((a, b) => b.publishedYear - a.publishedYear);
        break;
      case 'oldest':
        results.sort((a, b) => a.publishedYear - b.publishedYear);
        break;
      default:
        // Relevance - keep original order for search results
        break;
    }
    
    setFilteredBooks(results);
  }, [searchTerm, selectedCategory, priceRange, rating, sortBy]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (priceRange) params.set('price', priceRange);
    if (rating) params.set('rating', rating);
    if (sortBy) params.set('sort', sortBy);
    setSearchParams(params);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange('');
    setRating('');
    setSortBy('relevance');
    setSearchParams({});
  };
  
  // Price range options
  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-10', label: 'Under $10' },
    { value: '10-20', label: '$10 - $20' },
    { value: '20-30', label: '$20 - $30' },
    { value: '30-', label: 'Over $30' }
  ];
  
  // Rating options
  const ratingOptions = [
    { value: '', label: 'Any Rating' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' }
  ];
  
  // Sort options
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviewed' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' }
  ];
  
  return (
    <Container>
      <Content>
        {/* Search Header */}
        <SearchHeader>
          <SearchTitle>Search Books</SearchTitle>
          <SearchSubtitle>
            Find your next great read with our advanced search and filters
          </SearchSubtitle>
          
          <SearchForm onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search by title, author, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit">
              <FaSearch /> Search
            </SearchButton>
          </SearchForm>
        </SearchHeader>
        
        {/* Filters Section */}
        <FiltersSection>
          <FiltersHeader>
            <FaFilter /> Filters
          </FiltersHeader>
          
          <FiltersGrid>
            <FilterGroup>
              <FilterLabel>Category</FilterLabel>
              <FilterSelect
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>Price Range</FilterLabel>
              <FilterSelect
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>Minimum Rating</FilterLabel>
              <FilterSelect
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                {ratingOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>Sort By</FilterLabel>
              <FilterSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>
          </FiltersGrid>
          
          <div style={{ marginTop: '1rem' }}>
            <ClearFiltersButton onClick={clearFilters}>
              Clear All Filters
            </ClearFiltersButton>
          </div>
        </FiltersSection>
        
        {/* Results Section */}
        <ResultsSection>
          <ResultsHeader>
            <ResultsCount>
              {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
            </ResultsCount>
            
            <SortOptions>
              <SortLabel>Sort by:</SortLabel>
              <SortSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SortSelect>
            </SortOptions>
          </ResultsHeader>
          
          {filteredBooks.length > 0 ? (
            <BooksGrid>
              {filteredBooks.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book}
                  onView={(book) => navigate(`/book/${book.id}`)}
                />
              ))}
            </BooksGrid>
          ) : (
            <NoResults>
              <NoResultsIcon>🔍</NoResultsIcon>
              <h3>No books found</h3>
              <p>Try adjusting your search terms or filters</p>
            </NoResults>
          )}
        </ResultsSection>
      </Content>
    </Container>
  );
};

export default SearchPage;
