// src/components/Contact.js
import React from 'react';
import styled from 'styled-components';
import { Element } from 'react-scroll';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Contact = () => (
  <Element name="contact">
    <Container>
      <h2>Contact Us</h2>
      <p>Contact details and form.</p>
    </Container>
  </Element>
);

export default Contact;
