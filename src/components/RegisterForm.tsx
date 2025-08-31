import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaBookOpen } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';

// Animation for slide-in effect
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Main container with gradient background
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
`;

// Form card container
const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 1;
`;

// Logo container
const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: #667eea;
  font-size: 3rem;
`;

// Form title
const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

// Form subtitle
const Subtitle = styled.p`
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

// Input group container
const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

// Input field styling
const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
  background: white;

  &:focus {
    border-color: #667eea;
  }

  &::placeholder {
    color: #95a5a6;
  }
`;

// Input icon
const Icon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  z-index: 2;
`;

// Password toggle button
const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #7f8c8d;
  cursor: pointer;
  z-index: 2;
  padding: 0.5rem;

  &:hover {
    color: #667eea;
  }
`;

// Submit button
const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  margin-bottom: 1.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

// Error message styling
const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  animation: ${slideIn} 0.3s ease;
`;

// Success message styling
const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  animation: ${slideIn} 0.3s ease;
`;

// Link text for navigation
const LinkText = styled.p`
  text-align: center;
  color: #7f8c8d;
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

// Password requirements section
const PasswordRequirements = styled.div`
  background: #f8f9fa;
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const RequirementsTitle = styled.h4`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const RequirementsList = styled.ul`
  color: #7f8c8d;
  font-size: 0.8rem;
  margin: 0;
  padding-left: 1.2rem;
`;

const RequirementItem = styled.li`
  margin-bottom: 0.25rem;
`;

// Main RegisterForm component
const RegisterForm: React.FC = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      await register(formData.email, formData.password, formData.firstName, formData.lastName);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormCard>
        {/* Logo and title */}
        <Logo>
          <FaBookOpen />
        </Logo>
        <Title>Create New Account</Title>
        <Subtitle>Join our community of book lovers</Subtitle>

        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          {/* First Name input */}
          <InputGroup>
            <Icon>
              <FaUser />
            </Icon>
            <Input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          {/* Last Name input */}
          <InputGroup>
            <Icon>
              <FaUser />
            </Icon>
            <Input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          {/* Email input */}
          <InputGroup>
            <Icon>
              <FaEnvelope />
            </Icon>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          {/* Password input */}
          <InputGroup>
            <Icon>
              <FaLock />
            </Icon>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </InputGroup>

          {/* Confirm password input */}
          <InputGroup>
            <Icon>
              <FaLock />
            </Icon>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </InputGroup>

          {/* Password requirements */}
          <PasswordRequirements>
            <RequirementsTitle>Password Requirements:</RequirementsTitle>
            <RequirementsList>
              <RequirementItem>At least 8 characters long</RequirementItem>
              <RequirementItem>Contains letters and numbers</RequirementItem>
              <RequirementItem>Strong and unique</RequirementItem>
            </RequirementsList>
          </PasswordRequirements>

          {/* Submit button */}
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </SubmitButton>
        </form>

        {/* Error and success messages */}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        {/* Navigation links */}
        <LinkText>
          Already have an account?{' '}
          <StyledLink to="/login">Sign in here</StyledLink>
        </LinkText>
      </FormCard>
    </Container>
  );
};

export default RegisterForm;
