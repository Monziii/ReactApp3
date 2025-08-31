import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaHeart,
  FaBookOpen,
  FaShieldAlt,
  FaTruck,
  FaCreditCard,
  FaStar,
  FaUser
} from 'react-icons/fa';

// Main footer container
const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
`;

// Content wrapper
const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

// Main footer sections grid
const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

// Footer section
const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

// Section title
const SectionTitle = styled.h3`
  color: #ecf0f1;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 30px;
    height: 2px;
    background: #3498db;
    border-radius: 1px;
  }
`;

// Footer links list
const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Footer link item
const FooterLink = styled.li`
  margin-bottom: 0.5rem;
`;

// Footer link
const FooterLinkItem = styled(Link)`
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #3498db;
  }
`;

// Contact info
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

// Contact item
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #bdc3c7;
`;

// Contact icon
const ContactIcon = styled.div`
  color: #3498db;
  font-size: 1.1rem;
  width: 20px;
`;

// Social media section
const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Social media links
const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

// Social media button
const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #3498db;
    transform: translateY(-2px);
  }
`;

// Newsletter description
const NewsletterText = styled.p`
  color: #bdc3c7;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

// Newsletter form
const NewsletterForm = styled.form`
  display: flex;
  gap: 0.5rem;
`;

// Newsletter input
const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  
  &::placeholder {
    color: #bdc3c7;
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
  }
`;

// Newsletter button
const NewsletterButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
  
  &:hover {
    background: #2980b9;
  }
`;

// Features section
const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

// Feature item
const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #bdc3c7;
`;

// Feature icon
const FeatureIcon = styled.div`
  color: #3498db;
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
  color: #ecf0f1;
  margin-bottom: 0.2rem;
`;

// Feature description
const FeatureDescription = styled.span`
  font-size: 0.9rem;
  color: #95a5a6;
`;

// Bottom footer
const BottomFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

// Copyright text
const Copyright = styled.p`
  color: #95a5a6;
  margin: 0;
`;

// Made with love
const MadeWithLove = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #95a5a6;
`;

// Heart icon
const HeartIcon = styled(FaHeart)`
  color: #e74c3c;
  animation: heartbeat 1.5s ease-in-out infinite;
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;

// Main Footer component
const Footer: React.FC = () => {
  // Handle newsletter subscription
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <FooterContainer>
      <FooterContent>
        {/* Main footer sections */}
        <FooterGrid>
          {/* Company information */}
          <FooterSection>
            <SectionTitle>BookStore</SectionTitle>
            <p style={{ color: '#bdc3c7', lineHeight: '1.6', marginBottom: '1rem' }}>
              Your trusted source for quality books. Discover new worlds, expand your knowledge, 
              and find your next favorite read in our extensive collection.
            </p>
            <SocialSection>
              <span style={{ color: '#ecf0f1', marginBottom: '0.5rem' }}>Follow us:</span>
              <SocialLinks>
                <SocialButton href="#" aria-label="Facebook">
                  <FaStar />
                </SocialButton>
                <SocialButton href="#" aria-label="Twitter">
                  <FaUser />
                </SocialButton>
                <SocialButton href="#" aria-label="Instagram">
                  <FaBookOpen />
                </SocialButton>
                <SocialButton href="#" aria-label="LinkedIn">
                  <FaShieldAlt />
                </SocialButton>
              </SocialLinks>
            </SocialSection>
          </FooterSection>

          {/* Quick links */}
          <FooterSection>
            <SectionTitle>Quick Links</SectionTitle>
            <FooterLinks>
              <FooterLink>
                <FooterLinkItem to="/">
                  <FaBookOpen /> Home
                </FooterLinkItem>
              </FooterLink>
              <FooterLink>
                <FooterLinkItem to="/books">
                  <FaBookOpen /> Browse Books
                </FooterLinkItem>
              </FooterLink>
              <FooterLink>
                <FooterLinkItem to="/categories">
                  <FaBookOpen /> Categories
                </FooterLinkItem>
              </FooterLink>
              <FooterLink>
                <FooterLinkItem to="/cart">
                  <FaBookOpen /> Shopping Cart
                </FooterLinkItem>
              </FooterLink>
            </FooterLinks>
          </FooterSection>

          {/* Customer service */}
          <FooterSection>
            <SectionTitle>Customer Service</SectionTitle>
            <FooterLinks>
              <FooterLink>
                <FooterLinkItem to="/help">
                  <FaShieldAlt /> Help Center
                </FooterLinkItem>
              </FooterLink>
              <FooterLink>
                <FooterLinkItem to="/contact">
                  <FaEnvelope /> Contact Us
                </FooterLinkItem>
              </FooterLink>
              <FooterLink>
                <FooterLinkItem to="/shipping">
                  <FaTruck /> Shipping Info
                </FooterLinkItem>
              </FooterLink>
              <FooterLink>
                <FooterLinkItem to="/returns">
                  <FaShieldAlt /> Returns Policy
                </FooterLinkItem>
              </FooterLink>
            </FooterLinks>
          </FooterSection>

          {/* Contact information */}
          <FooterSection>
            <SectionTitle>Contact Info</SectionTitle>
            <ContactInfo>
              <ContactItem>
                <ContactIcon>
                  <FaMapMarkerAlt />
                </ContactIcon>
                <span>123 Book Street, Reading City, RC 12345</span>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <FaPhone />
                </ContactIcon>
                <span>+1 (555) 123-4567</span>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <FaEnvelope />
                </ContactIcon>
                <span>info@bookstore.com</span>
              </ContactItem>
            </ContactInfo>
          </FooterSection>

          {/* Newsletter subscription */}
          <FooterSection>
            <SectionTitle>Newsletter</SectionTitle>
            <NewsletterText>
              Subscribe to our newsletter for the latest books, exclusive offers, 
              and reading recommendations.
            </NewsletterText>
            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <NewsletterInput 
                type="email" 
                placeholder="Enter your email" 
                required 
              />
              <NewsletterButton type="submit">Subscribe</NewsletterButton>
            </NewsletterForm>
          </FooterSection>
        </FooterGrid>

        {/* Features section */}
        <FeaturesSection>
          <FeatureItem>
            <FeatureIcon>
              <FaShieldAlt />
            </FeatureIcon>
            <FeatureText>
              <FeatureTitle>Secure Shopping</FeatureTitle>
              <FeatureDescription>100% secure payment</FeatureDescription>
            </FeatureText>
          </FeatureItem>
          
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
              <FaCreditCard />
            </FeatureIcon>
            <FeatureText>
              <FeatureTitle>Easy Returns</FeatureTitle>
              <FeatureDescription>30-day return policy</FeatureDescription>
            </FeatureText>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>
              <FaBookOpen />
            </FeatureIcon>
            <FeatureText>
              <FeatureTitle>Quality Books</FeatureTitle>
              <FeatureDescription>Carefully curated selection</FeatureDescription>
            </FeatureText>
          </FeatureItem>
        </FeaturesSection>

        {/* Bottom footer */}
        <BottomFooter>
          <Copyright>
            © 2024 BookStore. All rights reserved.
          </Copyright>
          <MadeWithLove>
            Made with <HeartIcon /> by BookStore Team
          </MadeWithLove>
        </BottomFooter>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
