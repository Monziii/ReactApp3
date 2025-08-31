import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCreditCard, FaUser, FaCheck } from 'react-icons/fa';
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
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #2c3e50;
  font-weight: 500;
`;

const Input = styled.input`
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

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: #667eea;
  }

  &::placeholder {
    color: #95a5a6;
  }
`;

const Select = styled.select`
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

const OrderSummary = styled.div`
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

const SummaryItem = styled.div`
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

const OrderItems = styled.div`
  margin: 1rem 0;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f3f4;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 70px;
  object-fit: cover;
  border-radius: 5px;
`;

const ItemDetails = styled.div`
  text-align: left;
`;

const ItemTitle = styled.div`
  font-weight: 500;
  color: #2c3e50;
`;

const ItemQuantity = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const ItemPrice = styled.div`
  font-weight: 500;
  color: #e74c3c;
`;

const PlaceOrderButton = styled.button`
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

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const CheckoutPage: React.FC = () => {
  const { items, getTotal, getItemCount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'credit-card',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setOrderPlaced(true);
    clearCart();
    setIsSubmitting(false);

    // Navigate to home page after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <Container>
        <Content>
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <SuccessMessage>
              <FaCheck />
              Order completed successfully! Thank you
            </SuccessMessage>
            <p style={{ color: '#7f8c8d' }}>
              Order confirmation will be sent to your email
            </p>
          </div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Header>
          <Title>Complete Your Order</Title>
          <Subtitle>Fill in shipping information and payment details</Subtitle>
        </Header>

        <CheckoutGrid>
          <div>
            <FormSection>
              <SectionTitle>
                <FaUser />
                Shipping Information
              </SectionTitle>
              <Form>
                <FormRow>
                  <InputGroup>
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </FormRow>

                <FormRow>
                  <InputGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>Phone</Label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </FormRow>

                <InputGroup>
                  <Label>Address</Label>
                  <TextArea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your full address"
                    required
                  />
                </InputGroup>

                <FormRow>
                  <InputGroup>
                    <Label>City</Label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>Postal Code</Label>
                    <Input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </FormRow>

                <InputGroup>
                  <Label>Country</Label>
                  <Select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </Select>
                </InputGroup>
              </Form>
            </FormSection>

            <FormSection>
              <SectionTitle>
                <FaCreditCard />
                Payment Method
              </SectionTitle>
              <Form>
                <InputGroup>
                  <Label>Select Payment Method</Label>
                  <Select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="credit-card">Credit Card</option>
                    <option value="debit-card">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash-on-delivery">Cash on Delivery</option>
                  </Select>
                </InputGroup>

                <InputGroup>
                  <Label>Additional Notes (Optional)</Label>
                  <TextArea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Add any special instructions or notes"
                  />
                </InputGroup>
              </Form>
            </FormSection>
          </div>

          <OrderSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            
            <OrderItems>
              {items.map((item) => (
                <OrderItem key={item.book.id}>
                  <ItemInfo>
                    <ItemImage src={item.book.image} alt={item.book.title} />
                    <ItemDetails>
                      <ItemTitle>{item.book.title}</ItemTitle>
                      <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
                    </ItemDetails>
                  </ItemInfo>
                  <ItemPrice>${(item.book.price * item.quantity).toFixed(2)}</ItemPrice>
                </OrderItem>
              ))}
            </OrderItems>

            <SummaryItem>
              <span>Items:</span>
              <span>{getItemCount()}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Subtotal:</span>
              <span>${getTotal().toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Shipping:</span>
              <span>Free</span>
            </SummaryItem>
            <SummaryItem>
              <span>Total:</span>
              <span>${getTotal().toFixed(2)}</span>
            </SummaryItem>

            <PlaceOrderButton onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Processing Order...' : 'Place Order'}
            </PlaceOrderButton>
          </OrderSummary>
        </CheckoutGrid>
      </Content>
    </Container>
  );
};

export default CheckoutPage;
