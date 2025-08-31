import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheck, FaTimes, FaShoppingCart, FaHeart, FaStar, FaEye } from 'react-icons/fa';
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

// Profile header
const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  padding: 3rem 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

// Profile avatar
const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto 1rem;
  border: 4px solid rgba(255, 255, 255, 0.3);
`;

// Profile name
const ProfileName = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
`;

// Profile email
const ProfileEmail = styled.p`
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
`;

// Profile stats
const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

// Stat item
const StatItem = styled.div`
  text-align: center;
`;

// Stat number
const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

// Stat label
const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

// Profile sections grid
const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Profile section
const ProfileSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

// Section title
const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Form group
const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

// Form label
const FormLabel = styled.label`
  display: block;
  color: #7f8c8d;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

// Form input
const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  &:disabled {
    background: #f8f9fa;
    color: #7f8c8d;
  }
`;

// Form textarea
const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  &:disabled {
    background: #f8f9fa;
    color: #7f8c8d;
  }
`;

// Action buttons
const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

// Edit button
const EditButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #5a6fd8;
  }
`;

// Save button
const SaveButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #229954;
  }
`;

// Cancel button
const CancelButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #95a5a6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #7f8c8d;
  }
`;

// Orders section
const OrdersSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

// Order item
const OrderItem = styled.div`
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  }
`;

// Order header
const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

// Order ID
const OrderID = styled.div`
  font-weight: 600;
  color: #2c3e50;
`;

// Order date
const OrderDate = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

// Order status
const OrderStatus = styled.div<{ status: string }>`
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'delivered': return '#27ae60';
      case 'shipped': return '#3498db';
      case 'processing': return '#f39c12';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  }};
  color: white;
`;

// Order items
const OrderItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

// Order book item
const OrderBookItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

// Order book image
const OrderBookImage = styled.img`
  width: 50px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
`;

// Order book info
const OrderBookInfo = styled.div`
  flex: 1;
`;

// Order book title
const OrderBookTitle = styled.div`
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.2rem;
`;

// Order book author
const OrderBookAuthor = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

// Order total
const OrderTotal = styled.div`
  text-align: right;
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
`;

// No orders
const NoOrders = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
`;

// No orders icon
const NoOrdersIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #bdc3c7;
`;

// Main ProfilePage component
const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    address: user?.address || '123 Main Street, City, State 12345',
    bio: user?.bio || 'Book lover and avid reader. Always looking for the next great story.'
  });
  
  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      items: [
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=140&fit=crop&crop=center&q=80' },
        { title: 'Dune', author: 'Frank Herbert', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=140&fit=crop&crop=center&q=80' }
      ],
      total: 28.98
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      items: [
        { title: 'The Hobbit', author: 'J.R.R. Tolkien', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=140&fit=crop&crop=center&q=80' }
      ],
      total: 14.99
    }
  ];
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle save
  const handleSave = () => {
    // TODO: Implement save functionality
    alert('Profile updated successfully!');
    setIsEditing(false);
  };
  
  // Handle cancel
  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      firstName: user?.firstName || 'John',
      lastName: user?.lastName || 'Doe',
      email: user?.email || 'john.doe@example.com',
      phone: user?.phone || '+1 (555) 123-4567',
      address: user?.address || '123 Main Street, City, State 12345',
      bio: user?.bio || 'Book lover and avid reader. Always looking for the next great story.'
    });
    setIsEditing(false);
  };
  
  if (!user) {
    return (
      <Container>
        <Content>
          <h1>Please log in to view your profile</h1>
        </Content>
      </Container>
    );
  }
  
  return (
    <Container>
      <Content>
        {/* Profile Header */}
        <ProfileHeader>
          <ProfileAvatar>
            <FaUser />
          </ProfileAvatar>
          <ProfileName>{formData.firstName} {formData.lastName}</ProfileName>
          <ProfileEmail>{formData.email}</ProfileEmail>
          
          <ProfileStats>
            <StatItem>
              <StatNumber>{orders.length}</StatNumber>
              <StatLabel>Orders</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{items.length}</StatNumber>
              <StatLabel>Cart Items</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>12</StatNumber>
              <StatLabel>Books Read</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>4.8</StatNumber>
              <StatLabel>Avg Rating</StatLabel>
            </StatItem>
          </ProfileStats>
        </ProfileHeader>
        
        {/* Profile Grid */}
        <ProfileGrid>
          {/* Personal Information */}
          <ProfileSection>
            <SectionTitle>
              <FaUser /> Personal Information
            </SectionTitle>
            
            <FormGroup>
              <FormLabel>First Name</FormLabel>
              <FormInput
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Last Name</FormLabel>
              <FormInput
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Phone</FormLabel>
              <FormInput
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Address</FormLabel>
              <FormTextarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Bio</FormLabel>
              <FormTextarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormGroup>
            
            {!isEditing ? (
              <EditButton onClick={() => setIsEditing(true)}>
                <FaUser /> Edit Profile
              </EditButton>
            ) : (
              <ActionButtons>
                <SaveButton onClick={handleSave}>
                  <FaCheck /> Save Changes
                </SaveButton>
                <CancelButton onClick={handleCancel}>
                  <FaTimes /> Cancel
                </CancelButton>
              </ActionButtons>
            )}
          </ProfileSection>
          
          {/* Account Settings */}
          <ProfileSection>
            <SectionTitle>
              <FaUser /> Account Settings
            </SectionTitle>
            
            <FormGroup>
              <FormLabel>Change Password</FormLabel>
              <FormInput
                type="password"
                placeholder="Enter new password"
                disabled
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Confirm Password</FormLabel>
              <FormInput
                type="password"
                placeholder="Confirm new password"
                disabled
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Email Notifications</FormLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" defaultChecked /> Order updates
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" defaultChecked /> New releases
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" defaultChecked /> Promotional offers
                </label>
              </div>
            </FormGroup>
            
            <button
              onClick={logout}
              style={{
                padding: '0.8rem 1.5rem',
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              Logout
            </button>
          </ProfileSection>
        </ProfileGrid>
        
        {/* Orders Section */}
        <OrdersSection>
          <SectionTitle>
            <FaShoppingCart /> Order History
          </SectionTitle>
          
          {orders.length > 0 ? (
            orders.map(order => (
              <OrderItem key={order.id}>
                <OrderHeader>
                  <OrderID>Order #{order.id}</OrderID>
                  <OrderDate>{new Date(order.date).toLocaleDateString()}</OrderDate>
                  <OrderStatus status={order.status}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </OrderStatus>
                </OrderHeader>
                
                <OrderItems>
                  {order.items.map((item, index) => (
                    <OrderBookItem key={index}>
                      <OrderBookImage src={item.image} alt={item.title} />
                      <OrderBookInfo>
                        <OrderBookTitle>{item.title}</OrderBookTitle>
                        <OrderBookAuthor>by {item.author}</OrderBookAuthor>
                      </OrderBookInfo>
                    </OrderBookItem>
                  ))}
                </OrderItems>
                
                <OrderTotal>Total: ${order.total.toFixed(2)}</OrderTotal>
              </OrderItem>
            ))
          ) : (
            <NoOrders>
              <NoOrdersIcon>📦</NoOrdersIcon>
              <h3>No orders yet</h3>
              <p>Start shopping to see your order history here</p>
            </NoOrders>
          )}
        </OrdersSection>
      </Content>
    </Container>
  );
};

export default ProfilePage;
