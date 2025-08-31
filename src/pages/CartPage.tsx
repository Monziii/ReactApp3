import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

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
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #7f8c8d;
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyCartText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ContinueShoppingButton = styled.button`
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

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e1e8ed;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  text-align: left;
`;

const ItemTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
`;

const ItemAuthor = styled.p`
  margin: 0 0 0.5rem 0;
  color: #7f8c8d;
`;

const ItemPrice = styled.div`
  font-weight: bold;
  color: #e74c3c;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #e1e8ed;
  color: #495057;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Quantity = styled.span`
  min-width: 30px;
  text-align: center;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  background: #e74c3c;
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #c0392b;
  }
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
`;

const SummaryTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e1e8ed;

  &:last-child {
    border-bottom: none;
    font-weight: bold;
    font-size: 1.2rem;
    color: #2c3e50;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotal, getItemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (bookId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(bookId, newQuantity);
    }
  };

  const handleRemoveItem = (bookId: number) => {
    removeFromCart(bookId);
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <Container>
        <Content>
          <Header>
            <BackButton onClick={() => navigate('/')}>
              <FaArrowLeft />
              Back to Home
            </BackButton>
            <Title>Shopping Cart</Title>
          </Header>
          
          <EmptyCart>
            <EmptyCartIcon>
              <FaShoppingCart />
            </EmptyCartIcon>
            <EmptyCartText>Your cart is empty</EmptyCartText>
            <ContinueShoppingButton onClick={() => navigate('/books')}>
              Browse Books
            </ContinueShoppingButton>
          </EmptyCart>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Header>
          <BackButton onClick={() => navigate('/')}>
            <FaArrowLeft />
            Back to Home
          </BackButton>
          <Title>Shopping Cart ({getItemCount()} items)</Title>
        </Header>

        <CartGrid>
          <CartItems>
            {items.map((item) => (
              <CartItem key={item.book.id}>
                <ItemImage src={item.book.image} alt={item.book.title} />
                <ItemDetails>
                  <ItemTitle>{item.book.title}</ItemTitle>
                  <ItemAuthor>by {item.book.author}</ItemAuthor>
                  <ItemPrice>${item.book.price.toFixed(2)}</ItemPrice>
                </ItemDetails>
                <QuantityControls>
                  <QuantityButton
                    onClick={() => handleQuantityChange(item.book.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus />
                  </QuantityButton>
                  <Quantity>{item.quantity}</Quantity>
                  <QuantityButton
                    onClick={() => handleQuantityChange(item.book.id, item.quantity + 1)}
                  >
                    <FaPlus />
                  </QuantityButton>
                </QuantityControls>
                <RemoveButton onClick={() => handleRemoveItem(item.book.id)}>
                  <FaTrash />
                </RemoveButton>
              </CartItem>
            ))}
          </CartItems>

          <CartSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryRow>
              <span>Items:</span>
              <span>{getItemCount()}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Subtotal:</span>
              <span>${getTotal().toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Shipping:</span>
              <span>Free</span>
            </SummaryRow>
            <SummaryRow>
              <span>Total:</span>
              <span>${getTotal().toFixed(2)}</span>
            </SummaryRow>

            <CheckoutButton onClick={handleCheckout}>
              Proceed to Checkout
            </CheckoutButton>
          </CartSummary>
        </CartGrid>
      </Content>
    </Container>
  );
};

export default CartPage;
