// src/components/Navbar.js
import React from 'react';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import Logo from "../../assets/logo.png";

const Navbar = () => (
  <NavbarContainer>
    <div className='logo'>
      <img src={Logo} alt="Logo" />
      HostelCare
    </div>
    <ul>
      <li>Home</li>
      <li>About Team</li>
      <li><button className='btn'> Contact</button></li>
    </ul>
   
  </NavbarContainer>
);

const NavbarContainer = styled.nav`

  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  
  position: relative;
  top: 0;
  z-index: 10;
  color: #fff;
  position: fixed;
  top:0;
  left: 0;
  display:flex;
  align-items: center;
  justify-content: space-between;


  .logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    font-size: 40px;
    img {
      height: 4rem;
    }
    
}

ul,li{
      font-family:'outfit', sans-serif;
       display: inline-block;
       list-style:none;
       margin: 5px 20px;
       font-size: 16px;

      }

.btn{
  background: #FFF;
  color: #212121;
  padding: 14px 25px;
  font-size: 16px;
  border-radius: 30px;
  cursor: pointer;
  border: 0;
  outline: 0;
}      
  
      

  a {
    color: #fff;
    text-decoration: none;
    margin: 0 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;



export default Navbar;
