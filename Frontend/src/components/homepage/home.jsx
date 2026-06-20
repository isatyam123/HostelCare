import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import backgroundImage from '../../assets/hero.png';
import About from './about';
import Contact from './contactUs';
import GlobalStyle from './globalstyle ';
import Navbar from './nav';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-y: auto; /* Allow for vertical scrolling */
`;

const Container = styled.div`
  width: 100%; /* Corrected typo here */
  min-height: 100vh;
  background: linear-gradient(rgba(8,0,58,0.7),rgba(8,0,58,0.7)), url('${backgroundImage}') no-repeat center center/cover;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
`;

const PurpleText = styled.span`
  color: #5a67d8;
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background: #5a67d8;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  margin: 0.9rem;
  font-size: 1.38rem;
  cursor: pointer;
  border-radius: 30px;

  &:hover {
    background: #434190;
  }
`;

const Description = styled.div`
  text-align: center;
  margin: 2rem 0;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.456);
  border-radius: 10px;
  max-width: 800px;

  h2 {
    font-size: 2rem;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 1rem;
    color: #fff;
  }

  p {
    font-size: 1.25rem;
    font-family: 'Outfit', sans-serif;
    color: #ddd;
    line-height: 1.5;

    span {
      color: #5a67d8;
    }
  }
`;

const PointsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Point = styled.div`
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-family: 'Outfit', sans-serif;
  font-size: 1.15rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;

  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.9);
  }

  &:hover {
    background: #5a67d8;
    color: #fff;
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 80%;
    margin-bottom: 1rem;
  }
`;

const JoinUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  .line1, .line2 {
    font-size: 1.25rem;
    font-family: 'Outfit', sans-serif;
    color: #ddd;
    margin: 0.5rem 0;
  }
`;

const Home = () => {
  const scrollToAbout = () => {
    scroller.scrollTo('about', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  const scrollToContact = () => {
    scroller.scrollTo('contact', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <div>
      <GlobalStyle />
     <Navbar />
    <PageContainer>
      <Container>
        <Title>
          Hostel<PurpleText>Care</PurpleText>
        </Title>
        <Description>
          <h2>Smart Hostel Complaint Management System</h2>
          <p>
            Report maintenance issues, track resolution status, and communicate directly with hostel administration through a centralized platform.
          </p>
          <PointsContainer>
            <Point>Maintenance Requests</Point>
            <Point>General Queries</Point>
            <Point>Direct Personnel Connection</Point>
            <Point>Comfortable & Stress-Free</Point>
          </PointsContainer>
          <JoinUsContainer>
            <strong className='line1'>Report, track and resolve hostel maintenance issues efficiently.—</strong>
            <strong className='line2'><PurpleText>because your comfort is our priority!</PurpleText></strong>
          </JoinUsContainer>
        </Description>
        <div>
          <Link to="/user-login">
            <Button>Login User</Button>
          </Link>
          <Link to="/admin-login">
            <Button>Login Admin</Button>
          </Link>
          {/* <Button onClick={scrollToAbout}>About Us</Button>
          <Button onClick={scrollToContact}>Contact Us</Button> */}
        </div>
      </Container>
      <Element name="about">
        <About />
      </Element>
      <Element name="contact">
        <Contact />
      </Element>
    </PageContainer>
    </div>
    
  );
};

export default Home;
